import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import { Login } from "./Login";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const HomePage = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleNewGame = (e) => {
    e.preventDefault();
    console.log("clicked new game button");
    navigate("/game");
  };

  const handleShareGame = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    console.log("create link for ", { word: data.get("word") });
  };

  return (
    <div>
      {user ? (
        <Container component="main" maxWidth="xs">
          <h2>Ready to Play Against the Computer?</h2>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 4 }}
                onClick={handleNewGame}
              >
                New Game
              </Button>
            </Box>
            <Leaderboard />
            <Box
              component="form"
              onSubmit={handleShareGame}
              noValidate
              sx={{ mt: 1, mb: 2, border: "1px solid black", p: 2 }}
            >
              <h3>Play Against a Friend?</h3>
              <TextField
                margin="normal"
                required
                fullWidth
                name="word"
                label="Enter Your Word"
                type="word"
                id="word"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Get Link to Share Game
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <Login />
      )}
    </div>
  );
};
