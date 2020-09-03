import React from 'react';
import './App.css';
import useStorage from './hooks/useStorage';



async function login(userLogin){
  try {
    const res = await fetch("/api/password/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
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
  const [userName, setUserName] = useStorage("userName", " ", localStorage);
  const [userPassword, setUserPassword] = React.useState("");
  const [sassionStoreg, setSassionStorege]
  const usersLogin = {userName: userName, password: userPassword};

  function useLocalStorage (){

  }

  console.log(usersLogin);

  return (
    <div className="App">
      <label>
        User-Name: {" "}
        <input value={userName} onChange={(event) => setUserName(event.target.value)}/>
      </label>
      <label>
        User-Password: {" "}
        <input value={userPassword} onChange={(event) => setUserPassword(event.target.value)}/>
      </label>
      <button onClick={() => login(usersLogin)}>Login</button>
      <label>
        Password-Name: {" "}
        <input value={passwordName} onChange={(event) => setPasswordName(event.target.value)}/>
      </label>
      <button onClick={() => fetchPassword(passwordName)}>Get Password</button>
    </div>
  );
}

export default App;
