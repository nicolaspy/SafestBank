import React, { useState } from "react";
import Account from "./account";

function App() {
  const [user, setUser] = useState("");
  const [login, setLogin] = useState(false);

  const handleOnLogin = () => {
    setLogin(true);
  };

  return (
    <>
      {!login ? (
        <form onSubmit={() => handleOnLogin()}>
          <label>
            User:
            <input value={user} onChange={(e) => setUser(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <Account user={user} />
      )}
    </>
  );
}

export default App;