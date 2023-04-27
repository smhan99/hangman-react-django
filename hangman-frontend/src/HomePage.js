import { useState } from "react";
import Leaderboard from "./Leaderboard";
import { Login } from "./Login";

export const HomePage = () => {
  const [user, setUser] = useState("");
  return (
    <div>
      {user ? (
        <div>
          <Leaderboard />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};
