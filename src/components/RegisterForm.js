import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';

const RegisterForm = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState(false);

  const ChangeForm = () => {
    setRegistered(true)
    window.location.reload();
  };

  const Registrationmessage = () => {
    if (email, username, password) {
      setMessage(true)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!email || !username || !password) {
    //   console.log("All fields are required.");
    //   return;
    // }

    await axios
      .post('http://localhost:8000/api/reg_hash', {
        email,
        username,
        password,
      })
      .then((response) => { console.log(response.data) })
      .catch((error) => { console.log(error) });
  };

  return (<>
    {!registered ? (
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>
            Username:
          </label>
          <br />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>
            Password:
          </label>
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='form-buttons'>
          <div>
            <button type="submit" onClick={() => Registrationmessage()}>Register</button>
          </div>
          <div>
            <button type="logform" onClick={ChangeForm}>Back</button>
            {/* <button type="logform" onClick={() => window.location.reload()}>Back</button> This button just refreshes the URL of the actual Page, because of rendering between to Child-Components won't work without rendering error */}
          </div>
          <div className='message'>
            {message && <div><p>Welcome {username}! You have successfully registered for Seegel.</p>
            <p>Go "Back" to Login for Seegel :D</p></div>}
          </div>
        </div>
      </form>
      </>
    ) : (
      <Login />
    )}

  </>
  );
};

export default RegisterForm;
