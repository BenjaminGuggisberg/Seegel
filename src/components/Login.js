import { useState } from "react";
import axios from "axios";
import './css/login.css'
import RegisterForm from "./RegisterForm";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleRegisterClick = () => setShowRegisterForm(true);

  const handleRegisterSuccess = () => {
    setShowRegisterForm(false);
    if (props.onRegisterSuccess) {
      props.onRegisterSuccess();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const json = {
      email: email,
      password: password,
    };

    if (props.onRegisterSuccess) {
      props.onRegisterSuccess();
    }

    axios
      .post("http://localhost:8000/api/log_hash", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
            props.onLoginSuccess(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id='body'>
      <div id='overall'>
        <div id="formdiv">
        {!showRegisterForm ? (
          <>
          <img
          id='sail'
          src="Sailing.png"
          alt="Segelschiff-Icon"
          />
          <form className='form' onSubmit={handleSubmit}>
            <div>
              <label>
                Email:
              </label>
              <br />
              <input type="email" value={email} onChange={handleEmailChange} required/>
            </div>
            <div>
              <label>
                Password:
              </label>
              <br />
              <input type="password" value={password} onChange={handlePasswordChange} required/>
            </div>
            <div className="form-buttons">
              <div>
                <button type="submit">Login</button>
              </div>
              <div >
                <button type="logform" onClick={handleRegisterClick}>Register</button>
              </div>
            </div>
          </form>
          </>
        ) : (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        )}
        </div>
      </div>
    </div>
  );
}

export default Login;
