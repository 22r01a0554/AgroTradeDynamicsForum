import React from 'react'

const Profile = async () => {
    const [userData, setUserData] = useState({ name: '', email: '' });
        try {
          const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUserData({ name: data.name, email: data.email });
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      
  return (
    <div>
    <h2>{userData.name}</h2>
    <h2>{userData.email}</h2>
    </div>
  )
}

export default Profile
