import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Game } from "./Game";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { HomePage } from "./HomePage";

//might be useful to have a <NavBar />
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
