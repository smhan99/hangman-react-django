import React from 'react'
import Leaderboard from './Leaderboard';

export const HomePage = () => {
  const [user, setUser] = useState("");
  return (
    <div>
      {user ? (<div><Leaderboard/></div>) : (<Login/>)}
    </div>
  )
}