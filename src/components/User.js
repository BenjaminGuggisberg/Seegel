import React from "react";
import { useState, useEffect } from "react";
import './css/user.css'
import axios from "axios";


function User(props) {
    const [thunersee, setThunersee] = useState(false);
    const [brienzersee, setBrienzersee] = useState(false);
    const [neuenburgersee, setNeuenburgersee] = useState(false);
    const [bielersee, setBielersee] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPush, setIsPush] = useState(false);
    const currentuser = sessionStorage.getItem('username');
    const currentmail = sessionStorage.getItem('email');
    const [profilepicture, setProfilePicture] = useState(null)
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showChooseFile, setShowChooseFile] = useState(true);
    const [showprofilePicture, setShowProfilePicture] = useState(false);
    const [isDelete, setisDelete] = useState(false);

    // const hashedUsername = getHashedUsername(currentuser);


    // const FileSetter = (event) => {
    //     setProfilePicture(event.target.files[0].name);
    // }
    // useEffect(() => {
    //     console.log(imageFile);
    // }, [imageFile]);

    useEffect(() => {
        if (isPush) {
            const element = document.getElementById('push');
            element.scrollIntoView({ behavior: 'smooth' });
        }
        if (isPush === false) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        };

    }, [isPush]);


    const handleAddImage = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", currentuser);
        console.log(currentuser)
        formData.append("email", currentmail);
        console.log(currentmail)
        formData.append("profilepicture", profilepicture);
        console.log(profilepicture)

        axios
            .post("http://localhost:8000/upload-profile-picture", formData, {
                params: {
                    username: currentuser,
                    email: currentmail,
                },
            })
            .then((response) => {
                console.log(response.data);
                // setProfilePictureUrl(response.data.imageUrl);
            })
            .catch((error) => {
                console.log(error);
            });

        setIsMenuOpen(false);
        window.location.reload();

    };

    // function getHashedUsername(username) {
    //     // generate SHA-256 hash of the username using CryptoJS library
    //     return CryptoJS.SHA256(username).toString();
    //   }

    //   useEffect(() => {
    //     axios
    //       .get(`http://localhost:8000/get-profile-picture/${hashedUsername}`, { responseType: 'blob' })
    //       .then((response) => {
    //         const file = new Blob([response.data], { type: 'image/png' });
    //         setProfilePictureUrl(URL.createObjectURL(file));
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }, [props.username]);


    const handleDeleteImage = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", currentuser);
        console.log(currentuser)
        formData.append("email", currentmail);
        console.log(currentmail)

        axios
            .post("http://localhost:8000/delete-profile-picture", formData, {
                params: {
                    username: currentuser,
                    email: currentmail,
                },
            })
            .then((response) => {
                console.log(response.data);
                setProfilePictureUrl('');
            })
            .catch((error) => {
                console.log(error);
            });
        setShowChooseFile(true);
        setIsMenuOpen(false);
        window.location.reload();
    };

    const handleFileInputChange = (event) => {
        setProfilePicture(event.target.files[0]);
        setShowChooseFile(false);
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
    };

    const handleOpenPushSettings = () => {
        setIsPush(true);
        // setTimeout(() => {
        //     const element = document.getElementById('push');
        //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // }, 100);
    };

    const DeleteClick = () => {
        setShowPopup(true);
    }
    const PictureClick = () => {
        setShowProfilePicture(true);
    }

    const handleConfirm = async () => {
        // setShowPopup(false);                   User wird so oder so ausgeloggt - Account gelöscht - Testen
        try {
            const response = await axios.delete('http://localhost:8000/api/delete-account', {
                data: {
                    username: currentuser,
                    email: currentmail,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        props.handleLogout();
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("email");
        window.location.reload();
    };

    const handleCancel = () => {
        setShowPopup(false);
    }


    const circleStyle = {
        width: '65px',
        height: '65px',
        boxShadow: '0 0 3px 3px white',
        borderRadius: '50%',
        backgroundColor: 'lightblue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    };

    const cameraStyle = {
        fontSize: '40px',
        marginTop: '-5%'
    };



    return (<>
        <div style={{ marginTop: "42%" }}>
        </div>
        <div style={{ textAlign: "center" }}>
            <h3>Willkommen zurück {currentuser}!</h3>
            <p>Email: {currentmail}</p>
            <br />
            <div className="profile-picture">
                <div className="form-container" >
                    {props.profilePictureUrl ? (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={props.profilePictureUrl} alt="Profile Picture" style={{ border: '5px solid lightblue', background: 'white', borderRadius: '50%', width: '200px', height: '200px', objectFit: 'cover', padding: '2px' }} onClick={PictureClick} />
                                    <div style={{ ...circleStyle, position: 'absolute', bottom: '0', right: '0' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                        <span style={cameraStyle}>&#128247;</span>
                                    </div>
                                </div>
                            </div>

                            {showprofilePicture && (
                                <div style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 9999,
                                }}>
                                    <div style={{
                                        backgroundColor: '#fff',
                                        padding: 20,
                                        borderRadius: 5,
                                    }}>
                                        <div id='imshow' style={{ textAlign: 'center', position: 'relative' }}>
                                            <img src={props.profilePictureUrl} alt="Profile Picture" style={{ width: '250px', height: '250px', objectFit: 'cover', padding: '25px' }} />
                                            <button style={{ position: "absolute", top: 0, right: 0, cursor: "pointer", border: "none", background: "none", color: "black", fontSize: "medium" }} onClick={() => setShowProfilePicture(false)}>X</button>
                                            <div id='div2' style={{ position: 'absolute', marginBottom: '3%', left: '46%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {isDelete ? (<>
                                                    <img src="/delete.png" alt="Delete" style={{ height: '15px', cursor: 'pointer', marginBottom: '35px' }} className="menu-item" onClick={handleDeleteImage} />
                                                </>
                                                ):(
                                                <>
                                                <button onClick={() => setisDelete(true)} style={{background: 'none', border: '1px solid black', borderRadius: '50px', padding: '6px', marginBottom: '10%'}}>Bild löschen </button>
                                                </>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <br />
                            <div className="menu">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {isMenuOpen ? (<>

                                        {showChooseFile ? (
                                            <>
                                                <label
                                                    htmlFor="fileInput"
                                                    className="custom-file-input"
                                                    style={{border: '1px solid black', borderRadius: '50px', padding: '12px', background: 'transparent'}}
                                                >
                                                    Bild ändern
                                                </label>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="menu-item"
                                                    onClick={handleAddImage}
                                                    style={{border: '1px solid black', borderRadius: '50px', padding: '12px', background: 'transparent'}}
                                                >
                                                    Bild hochladen
                                                </button>
                                            </>
                                        )}
                                        {profilepicture && (
                                            <div
                                                id="div2"
                                                style={{
                                                    position: 'absolute',
                                                    marginTop: '5%',
                                                    left: '46%',
                                                    transform: 'translate(-50%, -50%)',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >

                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept="image/*"
                                            onChange={handleFileInputChange}
                                            required
                                            style={{
                                                display: 'none', // Hide the default file input appearance
                                                marginTop: '5%'
                                            }}
                                        />
                                    </>) : (null)}
                                </div>
                            </div>
                            {/* <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <p>Click to change Picture</p>
                            </div> */}
                            <br />
                            <div>
                                <hr style={{ borderTop: '2px solid lightblue', width: '80%', marginTop: '5%', marginBottom: '4%' }} />
                            </div>

                        </>
                    ) : (
                        <>
                            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <img src="/example_icon.png" alt="Basic Icon" style={{ height: '100px' }} />
                                <p>Click to change Picture</p>
                            </div><br />
                            <div className="menu">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {isMenuOpen ? (<>
                                        <div style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                                <label
                                                    htmlFor="fileInput"
                                                    className="custom-file-input"
                                                    style={{
                                                        background: 'transparent',
                                                        borderRadius: '50px',
                                                        border: '1px solid black',
                                                        color: 'black',
                                                        cursor: 'pointer',
                                                        display: 'inline-block',
                                                        fontFamily: 'Rubik, sans-serif',
                                                        fontSize: 'inherit',
                                                        fontWeight: 500,
                                                        outline: 'none',
                                                        padding: '1rem 50px',
                                                        position: 'relative',
                                                        transition: 'all 0.3s',
                                                        verticalAlign: 'middle',
                                                    }}
                                                >
                                                    Choose File
                                                </label>
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    accept="image/*"
                                                    onChange={(event) => setProfilePicture(event.target.files[0])}
                                                    required
                                                    style={{
                                                        display: 'none', // Hide the default file input appearance
                                                    }}
                                                />
                                            </div>

                                            <div id='div2' style={{ position: 'absolute', marginTop: '5%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <button className="menu-item" onClick={handleAddImage} style={{ border: 'none', background: 'transparent', fontSize: 'larger', cursor: 'pointer' }}></button>
                                                <div style={{ width: '20px' }}></div>
                                                <img src="/delete.png" alt="Delete" style={{ height: '12px', cursor: 'pointer' }} className="menu-item" onClick={handleDeleteImage} />
                                            </div>
                                        </div>
                                    </>) : (null)}
                                </div>
                            </div>
                            <br /><br /><br />
                        </>
                    )}
                </div>
            </div>
        </div>
        {isPush ? (
            <>
                <div id='push' style={{ display: "flex", justifyContent: "center", position: 'relative', border: '5px solid lightblue', borderRadius: '5px' }}>
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
                <button style={{ marginTop: '0px', background: 'transparent', border: '1px solid black', borderRadius: '50px', height: '10%', padding: '12px', fontSize: 'medium', fontFamily: 'Lucida Sans' }} onClick={handleOpenPushSettings}>Open Push-Settings</button>
            </div>
        )}
        <br /><br />
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: 'xx-small', width: '70%', fontStyle: 'italic' }}>(Take care using personal pictures - Software security development in progress!)</p>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
            <button style={{ marginTop: '0px', background: 'transparent', color: 'red', border: '1px solid red', borderRadius: '50px', height: '10%', padding: '12px', fontSize: 'medium', fontFamily: 'Lucida Sans' }} onClick={DeleteClick}>Account löschen</button>
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: 20,
                        borderRadius: 5,
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3>&#9940; Bestätigung &#9940;</h3>
                            <p>Möchtest du deinen Account wirklich löschen?</p>
                            <p>Diese Aktion kann nicht rückgänging gemacht werden!</p>
                            <button style={{ marginTop: '0px', background: 'transparent', border: '1px solid black', borderRadius: '50px', height: '2%', padding: '4px', fontSize: 'small', fontFamily: 'Lucida Sans', marginRight: '5px' }} onClick={handleConfirm}>Bestätigen</button>
                            <button style={{ marginTop: '0px', background: 'transparent', border: '1px solid black', borderRadius: '50px', height: '2%', padding: '4px', fontSize: 'small', fontFamily: 'Lucida Sans', marginLeft: '5px' }} onClick={handleCancel}>Abbrechen</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
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



