import React from "react";

const Header = ({user, changeUser})=> {
  return (
    <div>
      <header>
        <img src={ user.avatar }/>
        <h2>Welcome {user.email}</h2>
        <button onClick={changeUser}>Change User</button>
      </header>
    </div>
    );
};

export default Header;
