import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./HomePage";
import { Game } from "./Game";
import { Signup } from "./Signup";

import "./App.css";

// basename='/hangman-react-django'
//might be useful to have a <NavBar />
function App() {
  return (
    <div className="App">
      <BrowserRouter >
          <Routes>
            <Route path="/hangman-react-django/" element={<HomePage />} />
            <Route path="/hangman-react-django/game" element={<Game />} />
            <Route path="/hangman-react-django/signup" element={<Signup />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
