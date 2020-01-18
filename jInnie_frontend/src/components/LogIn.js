import React, { useState } from "react";

function LogIn(props) {
  console.log("LogIn");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  console.log("user, pass", user, pass)

  const login = (evt) => {
    console.log("LogIn - login");
    evt.preventDefault();
    console.log("user, pass", user, pass)
    props.login(user, pass);
  };

  const logout = (evt) => {
    console.log("LogIn - logout");
    evt.preventDefault();
    props.logout();
  };

  const onChange = evt => {
    console.log("onChange  ->", evt.target.id);
    if ([evt.target.id] == "username") {
      console.log("username", evt.target.value);
      setUser(evt.target.value);
    } else {
      console.log("password", evt.target.value);
      setPass(evt.target.value);
    }
  };
  
  if (!props.loggedIn) {
    return (
      <div>
        <form onChange={onChange}>
          <button onClick={login}>Login</button>
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
}
export default LogIn;