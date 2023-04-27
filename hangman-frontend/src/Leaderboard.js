import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Leaderboard = () => {
  const [info, setInfo] = useState([
    {username: "username1", score: 45},
    {username: "username2", score: 33},
    {username: "username3", score: 22},
    {username: "username4", score: 21},
    {username: "username5", score: 14},
    {username: "username6", score: 11},
    {username: "username7", score: 6},
    {username: "username8", score: 6},
    {username: "username9", score: 5},
    {username: "username10", score: 1},
  ])

  //useEffect to populate info

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {info.map((row) => (
              <TableRow
                key={row.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}