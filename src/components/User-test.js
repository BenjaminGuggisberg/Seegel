import { useState } from "react";

function User(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilepicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const currentuser = sessionStorage.getItem('username');
  const currentmail = sessionStorage.getItem('email');


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", currentuser);
    console.log(currentuser)
    formData.append("email", currentmail);
    console.log(currentmail)
    formData.append("profilepicture", profilepicture);
    console.log(profilepicture)


    try {
      const response = await fetch("http://localhost:8000/upload-profile-picture", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
      setImageURL(data.image_url);
    } catch (error) {
      console.error(error);
      setMessage("Error uploading profile picture.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Profile Picture:
        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            setProfilePicture(event.target.files[0].name)
          }
        />
      </label>
      <br />
      <button type="submit">Upload Profile Picture</button>
      {message && <p>{message}</p>}
      {imageURL && <img src={imageURL} alt="Profile" />}
    </form>
  );
}

export default User;
