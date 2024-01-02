import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../src/Context/SocketProvider";
import { useNavigate } from "react-router-dom";
const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  //console.log("Socket ", socket);
  const navigate= useNavigate()
  const handleJoinRoom= useCallback((data)=>{
    const {email,room}=data
    console.log("data",data)
    navigate(`/room/${room}`)
  },[navigate])   

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const data={email,room}
      socket.emit("joinroom",data);
    },
    [email,room,socket]
  );

  useEffect(()=>{
    socket.on("joinroom",handleJoinRoom)
    return ()=>{
      socket.off("joinroom",handleJoinRoom)
    }
  },[socket])
  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email-Id</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room No. </label>
        <input
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
      
    </div>
  );
};

export default Lobby;
