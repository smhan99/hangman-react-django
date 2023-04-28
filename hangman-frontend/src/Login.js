import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = ({ gameId }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = async (username, password) => {
    const url = "https://abhijithibukun.pythonanywhere.com/api/validateCreds";

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => response.json());
    if (response.response.validated && !gameId) {
      navigate("/hangman-react-django/", {
        state: {
          username: username,
          password: password,
        },
      });
    } else if (response.response.validated && gameId) {
      navigate("/hangman-react-django/game/" + gameId, {
        state: {
          username: username,
          password: password,
        },
      });
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let username = data.get("username");
    let password = data.get("password");
    // set username to local storage
    localStorage.setItem(
      "user",
      JSON.stringify({
        username,
        password,
      })
    );

    verifyUser(username, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <h2>Want to Play Hangman? Log in below.</h2>
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
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
        <p>Need to Sign Up as a New User?</p>
        <Link to={"/hangman-react-django/signup"}>Create Account</Link>
      </Box>
    </Container>
  );
};
