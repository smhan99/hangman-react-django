import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import hangman from "./static/240px-Hangman.png";

export const Login = ({ gameId }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = async () => {
    const url = "https://abhijithibukun.pythonanywhere.com/api/validateCreds";

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => response.json());

    // console.log(gameId);
    if (response.response.validated) {
      navigate(
        "/hangman-react-django/" + (gameId ? "game/?id=" + gameId : ""),
        {
          state: {
            username: username,
            password: password,
          },
        }
      );
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({
        username,
        password,
      })
    );

    verifyUser();
  };

  return (
    <Container component="main" maxWidth="xs">
      <h2>Want to Play Hangman? Log in below.</h2>
      <img src={hangman} className="logo" alt="hangman clip art" />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
        <p>Need to Sign Up as a New User?</p>
        <Link to={"/hangman-react-django/signup"} state={{ gameId: gameId }}>Create Account</Link>
      </Box>
    </Container>
  );
};
