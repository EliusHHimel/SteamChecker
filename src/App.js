// Code to display the main page of the application
import { useState } from 'react';
import './App.css';
import { isDisabled } from '@testing-library/user-event/dist/utils';

function App() {
  const [userInput, setUserInput] = useState('');
  const [steamData, setSteamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const findSteamAccount = (e) => {
    setLoading(true);
    setError(null);
    //post request to the backend
    fetch('https://tradeit.gg/api/steam/v1/steams/id-finder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "id" : userInput })
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 400) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setSteamData(data);
        setLoading(false);
      })
      .catch(err => {
        alert(err.message);
        setLoading(false);
      })
  }
  console.log(steamData);
  const creationDate = steamData ? new Date(steamData.created * 1000).toLocaleDateString() : null;
  return (
    <div>
      <div>
      <h1>Steam Account Finder</h1>
      <p>Find your steam account information easily</p>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'}}>
      <input style={
        {
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '300px'
        }
      } type="text" onChange={e => setUserInput(e.target.value)} placeholder='Enter a SteamID, SteamID3, SteamID64, custom URL or complete URL' />
      <button style={
        {
          padding: '10px 20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: userInput ? 'pointer' : 'not-allowed',
        }
      } onClick={findSteamAccount} disabled={userInput ? false : true} title={userInput ? 'Find your steam account information' : 'Please enter a SteamID, SteamID3, SteamID64, custom URL or complete URL in order to find steam account information'}>Find</button>
      </div>
      {error && <p>{error}</p>}
    </div>
    <div>
      {loading && <p>Loading...</p>}
      {steamData && (
        <div style={
          {
            padding: '10px 20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            margin: '20px 40px',
            backgroundColor: '#031127',
          }
        }>
          <h2>Steam Account Found</h2>
          <p>SteamID: {steamData.steamID}</p>
          <p>SteamID3: {steamData.steamId3}</p>
          <p>Custom URL: {steamData.url}</p>
          <p>Name: {steamData.nickname}</p>
          <p>Account Created: {creationDate}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
