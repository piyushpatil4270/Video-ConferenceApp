import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../src/Context/SocketProvider";
const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  console.log("Socket ", socket);
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("joinroom", { email, room });
    },
    [email, room]
  );

  useEffect(()=>{
    socket.on("joinroom",data=>{
      console.log("data from backend",data)
    })
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
