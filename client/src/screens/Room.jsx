import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../Context/SocketProvider'

const Room = () => {
    const socket = useSocket()
    const [remoteSocketId,setRemoteSocketId]=useState(null )
    const handleUserJoined=useCallback(({email,id})=>{
        console.log(`Email ${email} joined room ${id}`)
        setRemoteSocketId(id)
    },[])

    const handleCallUser=()=>{

    }
    
    useEffect(()=>{
        socket.on("userjoined",handleUserJoined)
        return ()=>{
            socket.off("userjoined",handleUserJoined)
        }
    },[socket,handleUserJoined])
  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId?"You are connected":"No one is in the room"}</h4>
      {remoteSocketId && <button onClick={()=>handleCallUser()}>Call</button>}
    </div>
  )
}

export default Room
