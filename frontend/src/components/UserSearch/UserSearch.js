import React, { useState } from 'react';

export default function UserSearch() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [query, setQuery] = useState('');
  const API_URL = window.location.origin.replace('3000', '5000');

  const getUsers = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/users/search?query=${query}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setUserData(data.users || []); // Ensure to handle the case where `data.users` might be undefined
      setIsData(true);
      // alert('alert');
    } catch (err) {
      console.error(err); // Log error for debugging
      setUserData([]); // Clear user data on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    getUsers(e.target.value); // Fetch users based on input value
  };

  return (
    <div className="relative w-full py-2">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search users by username"
        className="w-full bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-blue-600"
      />
      {/* {isLoading && <div>Loading...</div>} */}
      {/* <div className="background-blue-400"> */}
      {
        userData.length > 0 && isData
          ? userData.map((user) => (
              <div key={user.id} className="flex items-center mb-2 z-50">
                {/* <h1>hihihi</h1> */}
                <img
                  src={user.profilePhoto}
                  alt={user.fullname}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <h3 className="font-semibold">{user.fullname}</h3>
                  <h3 className="text-gray-600">{user.username}</h3>
                </div>
              </div>
            ))
          : ''
        // <div>No users found</div> // Show message if no users found
      }
      {/* {isData && <h1>Hihihihi</h1>} */}
      {/* </div> */}
    </div>
  );
}
