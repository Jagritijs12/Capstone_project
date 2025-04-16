import React, { useState } from "react";
import Login from "./Login";
import ToDo from "./MainApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <ToDo /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}
export default App;