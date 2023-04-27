import { useState } from "react";
import { Leaderboard } from "./Leaderboard";
import { Login } from "./Login";
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export const HomePage = () => {
  const [user, setUser] = useState({username: "username1", score:45});
  const [word, setWord] = useState("");
  const [link, setLink] = useState("");

  const navigate = useNavigate();

  const newGame = () => {
    navigate("/game");
  }

  const createGame = () => {
    if (word)
      setLink("localhost:3000/game/" + word);
  }

  return (
    <div>
      {user ? (
        <div>
          <div>
            <Stack spacing={15} direction="row" justifyContent={"center"}>
              <Button variant="outlined" size="large" onClick={() => newGame()}>
                New Game
              </Button>
              <Stack spacing={1} direction="row" justifyContent={"center"}>
                <TextField id="outlined-basic" label="Word" variant="outlined" onChange={(e) => setWord(e.target.value)}/>
                <Button variant="outlined" size="large" onClick={() => createGame()}>
                  Create Game
                </Button>
              </Stack>
            </Stack>
            {link && (
              <div>
                <p>Success! Copy the link below to share your game with others!</p>
                <p>{link}</p>
              </div>
            )}
          </div>
          <div className="leaderboard">
            <h1>Leaderboard</h1>
            <Leaderboard />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};
