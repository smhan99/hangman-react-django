import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Game } from "./Game";
import { Login } from "./Login";
//might be useful to have a <NavBar />
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
