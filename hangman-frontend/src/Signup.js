import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (username, password) => {
    const url = "https://abhijithibukun.pythonanywhere.com/api/registerUser";

    let headers = new Headers();

    headers.append("Content-Type", "application/json");

    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => response.json());
    if (response.response === "User successfully created") {
      navigate("/hangman-react-django/");
    } else {
      alert("ooops, something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(username, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <h2>Sign Up</h2>
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
            Create User
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
