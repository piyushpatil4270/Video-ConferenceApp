import {Routes,Route} from "react-router-dom"
import Lobby from "./screens/Lobby";
import RoomPage from "./screens/Room";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Lobby} />
        <Route path="/room/:roomId" Component={RoomPage} />
      </Routes>
    </div>
  );
}

export default App;
