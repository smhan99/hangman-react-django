import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Game } from "./Game";


//might be useful to have a <NavBar />
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <Game /> } />
          {/* <Route path="/hangman-react-django/login" element={ <LoginPage /> } /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
