import {Routes, Route} from "react-router-dom";
import LonerHomeScreen from "../screens/LonerHomeScreen.jsx"


function App() {
  return (
    <Routes>
      <Route path="/" element={<LonerHomeScreen />}/>
    </Routes>
  )
}

export default App;