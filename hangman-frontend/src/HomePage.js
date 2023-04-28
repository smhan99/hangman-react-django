import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Leaderboard } from "./Leaderboard";
import { Login } from "./Login";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const HomePage = () => {
  // eslint-disable-next-line
  const [user, setUser] = useState({});
  const [hasLink, setHasLink] = useState(false);
  const [link, setLink] = useState("");
  const [score, setScore] = useState(0);

  const navigate = useNavigate();
  const { state } = useLocation();

  const getNewGame = (word) => {
    fetch("https://abhijithibukun.pythonanywhere.com/api/newGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(user.username + ":" + user.password),
      },
      body: JSON.stringify({
        word: word,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(resp);
        if (resp.error) alert("Oops. Something went wrong. Try again!");
        if (word === "")
          navigate("/hangman-react-django/game/?id=" + resp.response.game_id);
        else {
          setLink(resp.response.game_id);
          setHasLink(true);
        }
      });
  };

  const handleNewGame = (e) => {
    e.preventDefault();
    getNewGame("");
  };

  const handleShareGame = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    let wd = data.get('word');
    if (/^[a-zA-Z]+$/.test(wd)) getNewGame(data.get("word"));
    else alert("Only english letters allowed!");
  };

  const handleSignOut = (e) => {
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (state) setUser(state);
    else setUser(JSON.parse(localStorage.getItem("user")));
    // eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    if (user !== null && JSON.stringify(user) !== '{}') {
      // console.log(user);
      fetch("https://abhijithibukun.pythonanywhere.com/api/getUserScore", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(user.username + ":" + user.password),
        },
      })
      .then(resp => resp.json())
      .then(resp => setScore(resp.response.win_count))
      .catch(error => console.log(error));
    }
  }, [user])

  return (
    <div>
      {user ? (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              sx={{
                m: 1,
                border: "2px solid darkgray",
                outline: "skyblue solid 10px",
                px: 2,
              }}
            >
              <h1>Hi, {user.username}. Your current score is {score}</h1><br/>
              <h2>Play Hangman Against the Computer</h2>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleNewGame}
              >
                New Game
              </Button>
            </Box>

            <Box
              component="form"
              noValidate
              sx={{
                m: 1,
                border: "2px solid darkgray",
                px: 2,
              }}
            >
              <h3>All Done?</h3>
              <Button
                type="submit"
                color="error"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </Box>
            <Box
              component="form"
              onSubmit={handleShareGame}
              noValidate
              sx={{
                m: 1,
                border: "2px solid darkgray",
                outline: "lightgray solid 10px",
                px: 2,
              }}
            >
              <h3>Challenge a Friend</h3>
              {hasLink && (
                <div>
                  <p>
                    Game created at:{" "}
                    <Link to={`/hangman-react-django/game/?id=${link}`}>
                      This Link
                    </Link>
                  </p>
                  <p>Right click and 'Copy Link Address' to share your game!</p>
                </div>
              )}
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
                sx={{ mt: 1, mb: 2 }}
              >
                Get Link to Share Game
              </Button>
            </Box>
            <Leaderboard />
          </Box>
        </Container>
      ) : (
        <Login />
      )}
    </div>
  );
};
