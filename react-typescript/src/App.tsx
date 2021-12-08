import React, { useState } from "react";
import Circle from "./Circle";

function App() {
  const [username, setUsername] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = event;
    console.log(event.currentTarget.value)
    setUsername(value)
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", username);
  }

  return (
    <div>
      <Circle borderColor="black" bgColor="teal" />
      <Circle bgColor="tomato" text="i'm tomato" />

      <form onSubmit={onSubmit}>
        <input value={username} onChange={onChange} type="text" placeholder="username" />
        <button>Log in</button>
      </form>

    </div>
  );
}

export default App;