import { Server} from "socket.io";

const io = new Server(7000,{
    cors:true
})

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map(); 

io.on("connection",(socket)=>{
    console.log("Socket Connected ",socket.id )
    socket.on("joinroom",(data) => {
    console.log("Room Joined")
    const {email,room} = data
    emailToSocketIdMap.set(email,socket.id)
    socketIdToEmailMap.set(socket.id,email)
    io.to(socket.id).emit("joinroom",data)
    })
})

