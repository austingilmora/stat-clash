import './App.css';
import Comparison from './components/Comparison';
import { useState, useEffect } from 'react'


function App() {

  

  const [tempCode, setTempCode] = useState();
  const [players, setPlayers] = useState();
  const [player1Id, setPlayer1Id] = useState();
  const [player2Id, setPlayer2Id] = useState();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();

  const codeURL = 'https://project.trumedianetworks.com/api/token';

  useEffect(() => {
    fetch(codeURL, {
      method: 'get',
      headers: new Headers({
        accept: "application/json",
        apiKey: process.env.REACT_APP_API_KEY
      })
    }).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          return setTempCode(data.token);
        })
      }
    })
  }, []);

  const playersURL = 'https://project.trumedianetworks.com/api/nfl/players';

  useEffect(() => {

    if (tempCode) {
      fetch(playersURL, {
        method: 'get',
        headers: new Headers({
          accept: "application/json",
          tempToken: tempCode
        })
      }).then(function(response) {
        if(response.ok) {
          response.json().then(function(data) {
            return setPlayers(data);
          })
        }
      })
    }
  }, [tempCode])

  

  
  const singlePlayerURL = "https://project.trumedianetworks.com/api/nfl/player/"
  useEffect(() => {
    if (player1Id) {
      fetch(singlePlayerURL + player1Id, {
        method: 'get',
        headers: new Headers({
          accept: "application/json",
          tempToken: tempCode
        })
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            setPlayer1(data);
          })
        }
      })

    }

  }, [player1Id])

  useEffect(() => {
    if (player2Id) {
      fetch(singlePlayerURL + player2Id, {
        method: 'get',
        headers: new Headers({
          accept: "application/json",
          tempToken: tempCode
        })
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            setPlayer2(data);
          })
        }
      })

    }

  }, [player2Id])

  useEffect(() => {

  }, [player1Id])

  function getStats(games = []) {
    let completions = 0;
    let attempts = 0;
    let sacks = 0;
    let interceptions = 0;
    let passYards = 0;
    let passTouchDowns = 0;
    let rushes = 0;
    let rushYards = 0;
    let rushTouchdowns = 0;

    games.forEach(game => {
      completions += game.Cmp;
      attempts += game.Att;

      
    })
    return { attempts, completions, completionPercentage: completions/attempts }
  }

 
  return (
    <section>
      <h1>Who Do you want to Compare?</h1>
      <div id="player-1">
        <select id="select-player-1" placeholder="Pick a player..." onChange={(event) => setPlayer1Id(event.target.value)}>
          <option value=''>Select a Player</option>
          {players && players.map((player) => {
            return (<option value={player.playerId} key={`player1${player.playerId}`} >{player.fullName}</option>);
          })}
        </select>
        <div>
          <h3>Completion Percentage</h3>
            
            {player1 &&
              <h5>attemps: {getStats(player1).attempts}, completions: {getStats(player1).completions}, percentage: {getStats(player1).completionPercentage}</h5>
            }

          <p> </p>
        </div>
        
      </div>
      <div id="player-2">
      <select id="select-player-2" placeholder="Pick a player..." onChange={(event) => setPlayer2Id(event.target.value)}>
          <option value=''>Select a Player</option>
          {players && players.map((player) => {
            return (<option value={player.playerId} key={`player2${player.playerId}`} >{player.fullName}</option>);
          })}
        </select>          
      </div>
    </section>
  );
}

export default App;
