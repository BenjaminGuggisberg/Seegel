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
            <div id='appbar_child'>
                <h2 id='theme'>{props.nameTag}</h2>
                <div id="navigation">
                    <img className="backbutton" style={{ height: 30, marginBottom: '0%', marginLeft: '7%', cursor: 'pointer'}} src="back-button.png" alt="Back" onClick = {() => props.onClick('menu')} />
                    {props.currentPage !== 'user' && (
                        <img className="usericon" style={{ height: 100, marginRight: '4%', marginBottom: '1%', cursor: 'pointer'}} src="user.png" alt="User" onClick={() => handleButtonClick()} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Appbar;




