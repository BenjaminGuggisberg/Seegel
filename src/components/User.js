import React from "react";
import { useState } from "react";
import './css/user.css'

function User(props) {
    const [thunersee, setThunersee] = useState(false);
    const [brienzersee, setBrienzersee] = useState(false);
    const [neuenburgersee, setNeuenburgersee] = useState(false);
    const [bielersee, setBielersee] = useState(false);

    function handleCheckboxChange(e) {
        const { name, checked } = e.target;
        switch (name) {
            case "thunersee":
                setThunersee(checked);
                console.log(name, ':', checked);
                break;
            case "brienzersee":
                setBrienzersee(checked);
                console.log(name, ':', checked);
                break;
            case "neuenburgersee":
                setNeuenburgersee(checked);
                console.log(name, ':', checked);
                break;
            case "bielersee":
                setBielersee(checked);
                console.log(name, ':', checked);
                break;
            default:
                break;
        }
    }

    
    
    
    

    return (<>
        <div>
            <h3>
                Welcome back {props.username}!
            </h3><br/><br/>
        </div>
        <div id='push'>
            <h4>Einstellungen für Push-Benachrichtigungen</h4>
            <label className="push-label">
                Thunersee
                <input
                    type="checkbox"
                    name="thunersee"
                    checked={thunersee}
                    onChange={handleCheckboxChange}
                />
            </label>
            <label className="push-label">
                Brienzersee
                <input
                    type="checkbox"
                    name="brienzersee"
                    checked={brienzersee}
                    onChange={handleCheckboxChange}
                />
            </label>
            <label className="push-label">
                Neuenburgersee
                <input
                    type="checkbox"
                    name="neuenburgersee"
                    checked={neuenburgersee}
                    onChange={handleCheckboxChange}
                />
            </label>
            <label className="push-label">
                Bielersee
                <input
                    type="checkbox"
                    name="bielersee"
                    checked={bielersee}
                    onChange={handleCheckboxChange}
                />
            </label>
        </div>
        <div>
            <br /><br />
            <footer id='menufooter'>
                <button type="logout" onClick={() => window.location.reload()}>Logout</button>
                {/* <button onClick={() => props.onClick('menu')}>Hauptmenü</button> */}
            </footer>
            <br /><br />
        </div>
    </>)
};

export default User;

