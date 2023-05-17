import React from "react";
import { useState, useEffect } from "react";
import './css/user.css'
import axios from "axios";

function User(props, { imageSrc }) {
    const [thunersee, setThunersee] = useState(false);
    const [brienzersee, setBrienzersee] = useState(false);
    const [neuenburgersee, setNeuenburgersee] = useState(false);
    const [bielersee, setBielersee] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPush, setIsPush] = useState(false);
    const currentuser = sessionStorage.getItem('username');
    const currentmail = sessionStorage.getItem('email');
    const [imageFile, setImageFile] = useState('');


    const FileSetter = (event) => {
        setImageFile(event.target.files[0].name);
    }
    // useEffect(() => {
    //     console.log(imageFile);
    // }, [imageFile]);

    const handleAddImage = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", currentuser);
        console.log(currentuser)
        formData.append("email", currentmail);
        console.log(currentmail)
        formData.append("profilepicture", imageFile);
        console.log(imageFile)

        axios
            .post("http://localhost:8000/upload-profile-picture", formData, {
                params: {
                    username: currentuser,
                    email: currentmail,
                },
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setIsMenuOpen(false);
    };


    const handleDeleteImage = () => {
        setIsMenuOpen(false);
        // Logic for deleting image goes here
    };


    const handleLogoutAndReload = () => {
        props.handleLogout();
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("email");
        window.location.reload();
    };

    useEffect(() => {
        // Beim Laden der Komponente die Checkbox-States aus Local Storage abrufen
        const thunerseeState = localStorage.getItem("thunersee");
        if (thunerseeState !== null) {
            setThunersee(JSON.parse(thunerseeState));
        }
        const brienzerseeState = localStorage.getItem("brienzersee");
        if (brienzerseeState !== null) {
            setBrienzersee(JSON.parse(brienzerseeState));
        }
        const neuenburgerseeState = localStorage.getItem("neuenburgersee");
        if (neuenburgerseeState !== null) {
            setNeuenburgersee(JSON.parse(neuenburgerseeState));
        }
        const bielerseeState = localStorage.getItem("bielersee");
        if (bielerseeState !== null) {
            setBielersee(JSON.parse(bielerseeState));
        }
    }, []);

    function handleCheckboxChange(e) {
        const { name, checked } = e.target;
        switch (name) {
            case "thunersee":
                setThunersee(checked);
                console.log(name, ':', checked);
                localStorage.setItem('thunersee', JSON.stringify(checked));
                break;
            case "brienzersee":
                setBrienzersee(checked);
                console.log(name, ':', checked);
                localStorage.setItem('brienzersee', JSON.stringify(checked));
                break;
            case "neuenburgersee":
                setNeuenburgersee(checked);
                console.log(name, ':', checked);
                localStorage.setItem('neuenburgersee', JSON.stringify(checked));
                break;
            case "bielersee":
                setBielersee(checked);
                console.log(name, ':', checked);
                localStorage.setItem('bielersee', JSON.stringify(checked));
                break;
            default:
                break;
        }
    }


    return (<>
        <div style={{ marginTop: "42%" }}>
        </div>
        <div style={{ textAlign: "center" }}>
            <h3>Welcome back {currentuser}!</h3>
            <br />
            Email: {currentmail}
            <br /><br />
            <div className="profile-picture">
                <div className="form-container" >
                    {imageSrc ? (
                        <img src={imageSrc} style={{width: '20%'}} alt="Profile" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    ) : (
                        <>
                            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <img src="/example_icon.png" style={{ height: '100px' }} />
                                <p>Click to add Picture</p>
                            </div>
                        </>
                    )}
                    <div className="menu">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {isMenuOpen ? (<>
                                <input id="fileInput" type="file" accept="image/png, image/jpeg" onChange={FileSetter} style={{ display: 'none' }} />                                
                                <label htmlFor="fileInput" style={{padding: '5px', fontSize: 'smaller'}}>Choose Image</label>
                                <button className="menu-item" onClick={handleAddImage} style={{ marginRight: '10px', border: 'none', background: 'transparent', fontSize: 'larger', cursor: 'pointer' }}>+</button>
                                <img src="/delete.png" style={{ height: '12px', cursor: 'pointer' }} className="menu-item" onClick={handleDeleteImage} />
                            </>) : (null)}
                        </div>

                        {imageSrc && <div className="menu-item" onClick={handleDeleteImage}>Remove current picture</div>}
                    </div>
                    <br /><br />
                </div>
            </div>
        </div>
        {isPush ? (
            <>
                <div id='push' style={{ display: "flex", justifyContent: "center", position: 'relative' }}>
                    <h4>Push-Settings</h4><button style={{ position: "absolute", top: 15, right: 15, cursor: "pointer", border: "none", background: "none", color: "black", fontSize: "medium" }} onClick={() => setIsPush(false)}>X</button>
                    <p style={{ fontStyle: "italic", fontSize: "smaller" }}>(Activate notification to know if waterlevel or wind forecast exceeds thresholds) </p><br />
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
            </>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ background: 'transparent', border: '1px solid black', borderRadius: '50px', height: '10%', padding: '12px', fontSize: 'medium', fontFamily: 'Lucida Sans' }} onClick={() => setIsPush(true)}>Open Push-Settings</button>
            </div>
        )}
        {/* <div>
            <br />
            <label>
                New Data:
                <input type='text' value={newData} onChange={handleNewDataChange} />
                <button onClick={handleNewDataChange}>Add Data</button>
            </label>
        </div> */}
        <div>
            <br /><br />
            <footer id='menufooter'>
                <button type="logout" onClick={handleLogoutAndReload}>Logout</button>
                {/* <button onClick={() => props.onClick('menu')}>Hauptmenü</button> */}
            </footer>
            <br /><br />
        </div>

    </>)
};

export default User;

