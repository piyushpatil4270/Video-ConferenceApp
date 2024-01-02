import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSocket } from "../Context/SocketProvider";
import ReactPlayer from "react-player";
const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room ${id}`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("userjoined", handleUserJoined);
    return () => {
      socket.off("userjoined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);
  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "You are connected" : "No one is in the room"}</h4>
      {remoteSocketId && (!myStream && <button onClick={() => handleCallUser()}>Call</button>)}
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
    </div>
  );
};

export default Room;
