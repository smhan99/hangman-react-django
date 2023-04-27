import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

// import hangman0 from "./static/hangman/0.png";
// import hangman1 from "./static/hangman/1.png";
// import hangman2 from "./static/hangman/2.png";
// import hangman3 from "./static/hangman/3.png";
// import hangman4 from "./static/hangman/4.png";
// import hangman5 from "./static/hangman/5.png";
// import hangman6 from "./static/hangman/6.png";
// import hangman7 from "./static/hangman/7.png";
// import hangman8 from "./static/hangman/8.png";
// import hangman9 from "./static/hangman/9.png";
// import hangman10 from "./static/hangman/10.png";

export const Game = () => {
  const [wordDict, setWordDict] = useState({}); // {letter: [position]}
  const [wordList, setWordList] = useState([]); // [letter] of word
  const [wordBool, setWordBool] = useState([]); // [bool] open/close
  const [alphabet, setAlphabet] = useState(new Array(26).fill(false)); //alphabet used/unused
  const [hangman, setHangman] = useState(0); // hangman state
  const [correct, setCorrect] = useState(0);

  const [user, setUser] = useState({});
  // if we want, we can have difficulty state as well
  const alpha = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const handleAlphabetClick = (a, i) => {
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
  };

  useEffect(() => {
    if (hangman === 10) {
      setTimeout(() => {
        alert("YOU LOSE!");
      }, 300);
    }
    // send back lose
  }, [hangman]);

  useEffect(() => {
    if (correct !== 0 && correct === wordList.length) {
      setTimeout(() => {
        alert("YOU WIN!");
      }, 300);
    }
    // send back win
    // eslint-disable-next-line
  }, [correct]);

  useEffect(() => {}, [user]);

  useEffect(() => {
    const getDict = (wd) => {
      let dict = {};
      for (let i = 0; i < wd.length; i++) {
        let c = wd.at(i);
        if (dict[c]) dict[c].push(i);
        else dict[c] = [i];
      }
      return dict;
    };
    // fetch API to populate everything
    //dummy word: caterpillar
    let word = "caterpillar";
    setWordList(word.split(""));
    setWordDict(getDict(word));
    setWordBool(new Array(word.length).fill(false));
  }, []);

  return (
    <div className="hangman">
      {/* {user ? (game) : (<Login gid={}/>)} */}
      <h1>HI</h1>

      {/* <img src={"/static/hangman/" + hangman + ".png"} /> */}

      <h1>Hangman Counts left: {10 - hangman}</h1>

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
  );
};
