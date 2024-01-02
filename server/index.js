import { Server} from "socket.io";

const io = new Server(7000,{
    cors:true
})

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map(); 

io.on("connection",(socket)=>{
    console.log("Socket Connected ",socket.id )
    socket.on("joinroom",(data) => {
    console.log("Room Joined",data)
    const {email,room} = data
    emailToSocketIdMap.set(email,socket.id)
    socketIdToEmailMap.set(socket.id,email)
    io.to(room).emit("userjoined",{email,id:socket.id})
    socket.join(room)
    io.to(socket.id).emit("joinroom",data)
    })


    socket.on("user:call",({to,offer})=>{
        io.to(to).emit("incoming:call",{from: socket.id, offer})
    })

    socket.on("call:accepted",({to, ans})=>{
        io.to(to).emit("call:accepted",{from: socket.id, ans})
    })
})

