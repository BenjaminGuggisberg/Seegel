import React from "react";
import { useState } from "react";
import './css/appbar.css'
import User from "./User";

function AppbarMenu(props) {

  // const [userPage, setUserPage] = useState("");

  // const handlePageChange = (page) => {
  //   setUserPage(page);
  //   console.log(page);
  //   window.location.href = "/user";
  // };
  // const [buttonname, setButtonName] = useState('User')

  const handleButtonClick = () => {
    props.handleClick('user')
  };




  return (
    <>
      <div
        id='appbar'
      >
        <img
          src="Sailing.png"
          alt="Segelschiff-Icon"
          style={{ height: 74, marginLeft: '5%' }}
        />
        <h2>{props.nameTag}</h2>
        <img className="usericon" style={{ height: 100, marginRight: '4%', marginBottom: '2%', cursor: 'pointer'}} src="user.png" alt="User" onClick={() => handleButtonClick()} />
      </div>
    </>
  );
}

export default AppbarMenu;
