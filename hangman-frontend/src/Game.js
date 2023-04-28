import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import hangman0 from "./static/hangman/0.png";
import hangman1 from "./static/hangman/1.png";
import hangman2 from "./static/hangman/2.png";
import hangman3 from "./static/hangman/3.png";
import hangman4 from "./static/hangman/4.png";
import hangman5 from "./static/hangman/5.png";
import hangman6 from "./static/hangman/6.png";
import hangman7 from "./static/hangman/7.png";
import hangman8 from "./static/hangman/8.png";
import hangman9 from "./static/hangman/9.png";
import hangman10 from "./static/hangman/10.png";

import { Login } from "./Login";

export const Game = () => {
  const [wordDict, setWordDict] = useState({}); // {letter: [position]}
  const [wordList, setWordList] = useState([]); // [letter] of word
  const [wordBool, setWordBool] = useState([]); // [bool] open/close
  const [alphabet, setAlphabet] = useState(new Array(26).fill(false)); //alphabet used/unused
  const [hangman, setHangman] = useState(0); // hangman state
  const [correct, setCorrect] = useState(0);
  const [gameover, setGameover] = useState(false);

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // if we want, we can have difficulty state as well
  const alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const hangmanStates = [
    hangman0,
    hangman1,
    hangman2,
    hangman3,
    hangman4,
    hangman5,
    hangman6,
    hangman7,
    hangman8,
    hangman9,
    hangman10,
  ];

  const handleAlphabetClick = (a, i) => {
    if (!gameover) {
      let newAlphabet = [...alphabet];
      newAlphabet[i] = true;
      setAlphabet(newAlphabet);

      let indices = wordDict[a];
      if (indices) {
        let newWordBool = [...wordBool];
        indices.map((i) => (newWordBool[i] = true));
        setCorrect(correct + indices.length);
        setWordBool(newWordBool);
      } else setHangman(hangman + 1);
    }
  };

  const getDict = (wd) => {
    let dict = {};
    for (let i = 0; i < wd.length; i++) {
      let c = wd.at(i);
      if (dict[c]) dict[c].push(i);
      else dict[c] = [i];
    }
    return dict;
  };

  const getGame = () => {
    fetch("https://abhijithibukun.pythonanywhere.com/api/gameDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${btoa(user.username + ":" + user.password)}`,
      },
      body: JSON.stringify({
        game_id: id,
      }),
    })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      if (resp.response) {
        let word = resp.response.word.toUpperCase();
        setWordList(word.split(""));
        setWordDict(getDict(word));
        setWordBool(new Array(word.length).fill(false));
      } else {
        alert("Oops. URL Expired!");
      }
    });
  }

  const submitGame = (won) => {
    fetch("https://abhijithibukun.pythonanywhere.com/api/submitGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${btoa(user.username + ":" + user.password)}`,
      },
      body: JSON.stringify({
        game_id: id,
        is_won: won,
      }),
    })
    .then((resp) => resp.json())
    .then((resp) => {
      // console.log(resp);
      if (resp.error) alert("Oops. Something went wrong.");
      else navigate("/hangman-react-django/");
    });
  };

  useEffect(() => {
    if (hangman === 10) {
      setGameover(true);
      setTimeout(() => {
        alert("YOU LOSE!");
        submitGame(false);
      }, 300);
    }
    // eslint-disable-next-line
  }, [hangman]);

  useEffect(() => {
    if (correct !== 0 && correct === wordList.length) {
      setGameover(true);
      setTimeout(() => {
        alert("YOU WIN!");
        submitGame(true);
      }, 300);
    }
    // eslint-disable-next-line
  }, [correct]);

  useEffect(() => {
    if (state) setUser(state);
    else setUser(JSON.parse(localStorage.getItem("user")));
    // eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    if (user) getGame();
    // eslint-disable-next-line
  }, [user])

  return (
    <div>
      {!user ? (
        <div>
          <p>
            It seems like you are not logged in. Please log in first to access
            the game!
          </p>
          <Login gameId={id} />
        </div>
      ) : (
        <div className="hangman">
          <img
            src={hangmanStates[hangman]}
            height={"25%"}
            width={"25%"}
            alt=""
          />
          <Grid className="word" container justifyContent="center">
            {wordList.map((a, i) => (
              <Paper sx={{ height: 100, width: 60 }} key={i}>
                {wordBool[i] && <h1>{a}</h1>}
              </Paper>
            ))}
          </Grid>

          <Grid className="alphabet" container justifyContent="center">
            <Grid item xs={10}>
              <Grid container justifyContent="center" spacing={2}>
                {alpha.map((a, i) => (
                  <Grid key={i} item xs={1}>
                    <Button
                      sx={{ height: 60, width: 60 }}
                      variant="contained"
                      disabled={alphabet[i]}
                      onClick={() => handleAlphabetClick(a, i)}
                    >
                      <h1>{a}</h1>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};
