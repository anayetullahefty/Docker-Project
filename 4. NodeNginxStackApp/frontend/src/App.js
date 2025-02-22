import './App.css';

// frontend/src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const allUser = ()=>{
    fetch('http://localhost:5000/users')
    .then((response) => response.json())
    .then((data) => {
      console.log('user data', data)
      setUsers(data.users);
      setLoading(false);
    })
    .catch((error) => console.error('Error fetching users:', error));
  }

  // Fetch the users from the backend
  useEffect(() => {
    allUser()
  }, []);


  // Handle adding a new user
  const addUser = () => {
    const username = prompt('Enter your username:');
    if (username) {
      fetch('http://localhost:5000/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
        .then((response) => response.json())
        .then(() => {
          setUsers((prevUsers) => [...prevUsers, username]);
        })
        .then(()=>{
          allUser();
        })
        .catch((error) => console.error('Error adding user:', error));
    }
  };


  return (
    <div className="App">
      <h1>User List</h1>
      <p>lorem150</p>
      <button onClick={addUser}>Add User</button>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
