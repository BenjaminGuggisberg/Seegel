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
          style={{ height: 74, marginLeft: '5%', marginTop: '3%' }}
        />
        <h2>{props.nameTag}</h2>
        {props.profilePictureUrl ? (
          <>
            <img
              src={props.profilePictureUrl}
              alt='Profile Picture'
              style={{
                height: 45,
                width: 45,
                marginRight: '4%',
                marginBottom: '0%',
                cursor: 'pointer',
                border: '5px solid lightblue',
                borderRadius: '50%',
                objectFit: 'cover',
                background: 'white',
                padding: '2px',
                objectPosition: 'center center',
              }}
              onClick={() => handleButtonClick()}
            />

          </>
        ) : (
          <>
            <img className="usericon" style={{ height: 100, marginRight: '4%', marginBottom: '1%', cursor: 'pointer' }} src="user.png" alt="User" onClick={() => handleButtonClick()} />
          </>
        )}
      </div>
    </>
  );
}

export default AppbarMenu;
