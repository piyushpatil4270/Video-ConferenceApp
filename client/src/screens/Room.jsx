import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSocket } from "../Context/SocketProvider";
import ReactPlayer from "react-player";
import PeerService from "../services/peer";
import peer from "../services/peer";
const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room ${id}`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await PeerService.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      console.log("Incoming Call from", from, offer);
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );
  const handleAcceptCall = useCallback(
    async ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("call accepted");
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
        
      }
    },
    [myStream]
  );
  const handleNegoNeeded=useCallback(async()=>{
    const offer=await peer.getOffer()
    socket.emit("peer:nego:needed",{offer,to:remoteSocketId})

  },[remoteSocketId,socket])
  useEffect(()=>{
    peer.peer.addEventListener("negotiationneeded",handleNegoNeeded)
    return ()=>{
      peer.peer.removeEventListener("negotiationneeded",handleNegoNeeded)
    }
  },[handleNegoNeeded])
  useEffect(()=>{
    peer.peer.addEventListener("track",async ev =>{
     const remoteStream = ev.streams
     setRemoteStream(remoteStream)
    })
  },[])

  useEffect(() => {
    socket.on("userjoined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);

    socket.on("call:accepted", handleAcceptCall);

    return () => {
      socket.off("userjoined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleAcceptCall);
    };
  }, [socket, handleUserJoined, handleAcceptCall, handleIncomingCall]);
  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "You are connected" : "No one is in the room"}</h4>
      {remoteSocketId && !myStream && (
        <button onClick={() => handleCallUser()}>Call</button>
      )}
      {myStream && (
        <>
          <h4>My Stream</h4>
          <ReactPlayer
            playing
            muted
            width="200px"
            height="100px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h4>Remote Stream</h4>
          <ReactPlayer
            playing
            muted
            width="200px"
            height="100px"
            url={remoteStream}
          />
        </>
      )}
    </div>
  );
};

export default Room;
