import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Game } from "./Game";
import { Signup } from "./Signup";

import "./App.css";

//might be useful to have a <NavBar />
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/hangman-react-django/" element={<HomePage />} />
          <Route path="/hangman-react-django/game/:id" element={<Game />} />
          <Route path="/hangman-react-django/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
