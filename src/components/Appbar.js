import React from "react";
import { useState } from "react";
import User from "./User";
import './css/appbar.css'

function Appbar(props) {

  // const [userPage, setUserPage] = useState("");

  // const handlePageChange = (page) => {
  //   setUserPage(page);
  //   console.log(page);
  //   window.location.href = "/user";
  // };
  const [buttonname, setButtonName] = useState('User')

  const handleButtonClick = () => {
    props.handleClick('user')
    if (props.currentPage === 'user') {
      setButtonName('User')
    } else {
      setButtonName('Back')
    }
  }



  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: 64,
          backgroundColor: "lightblue",
          opacity: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 1,
        }}
      >
        <img
          src="Sailing.png"
          alt="Segelschiff-Icon"
          style={{ height: 74 }}
        />
        <h2>{props.nameTag}</h2>
        <button className='userbutton' onClick={handleButtonClick}>{buttonname}</button>
      </div>
      {props.currentPage === "user" &&
        (<User username={props.username} />)}
      </>
  )
}

export default Appbar;
