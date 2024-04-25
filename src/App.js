// Code to display the main page of the application
import { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [steamData, setSteamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const findSteamAccount = (e) => {
    setLoading(true);
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

  return (
    <div>
      <div>
      <h1>Steam Account Finder</h1>
      <p>Find your steam account information easily</p>
      <input type="text" onChange={e => setUserInput(e.target.value)} placeholder='Enter a SteamID, SteamID3, SteamID64, custom URL or complete URL' />
      <button onClick={findSteamAccount}>Find</button>
      {error && <p>{error}</p>}
    </div>
    <div>
      {loading && <p>Loading...</p>}
      {steamData && (
        <div>
          <h2>Steam Account Found</h2>
          <p>SteamID: {steamData.steamID}</p>
          <p>SteamID3: {steamData.steamId3}</p>
          <p>Custom URL: {steamData.url}</p>
          <p>Name: {steamData.nickname}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
