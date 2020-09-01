import React from 'react';
import './App.css';

async function login(){
  try {
    const res = await fetch("/api/password/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: "TestUser",
        password: "12345"
      }),
    });
    const result = await res.text();
    alert(result);
  } catch (error){
    alert(error.message);
  }
};

async function fetchPassword(name){
  try {
    const res = await fetch(`/api/passwords/${name}`);
    const result = await res.text();
    alert(result);
  } catch (error) {
    alert(error.message);
  }
}

function App() {
  const [passwordName, setPasswordName] = React.useState("");

  return (
    <div className="App">
      <button onClick={login}>Login</button>
      <label>
        Password-Name {" "}
        <input value={passwordName} onChange={(event) => setPasswordName(event.target.value)}/>
      </label>
      <button onClick={() => fetchPassword(passwordName)}>Get Password</button>
    </div>
  );
}

export default App;
