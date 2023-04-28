import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";

export const Login = ({gameId}) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let username = data.get("username");
    let password = data.get("password");
    // set username to local storage
    localStorage.setItem("user", JSON.stringify({
      username,
      password,
    }));

    // make call to user API with this object
    console.log({
      username: username,
      password: password,
    });
    if (gameId) {
      navigate("/hangman-react-django/game/" + gameId, {state: {
        username: username,
        password: password,
      }});
    } else {
      navigate("/hangman-react-django", {state: {
        username: username,
        password: password,
      }});
    }
    
  };
  return (
    <Container component="main" maxWidth="xs">
      <h2>Log In</h2>
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
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
