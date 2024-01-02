import {Routes,Route} from "react-router-dom"
import Lobby from "./screens/Lobby";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Lobby} />
      </Routes>
    </div>
  );
}

export default App;
