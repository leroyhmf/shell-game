import React from 'react';
import players from './resources/players.png'
import star from './resources/star.png'

function Scoreboard(props) {
  //Add player by clicking the header Players
  function handleHeaderClick() {
    const enteredNamed = prompt('Please enter your name');
    if (enteredNamed) {props.updatePlayers(enteredNamed)}
  }

    function generateStars(i) {
      let stars = [];
        for (let starNum = 0; starNum < props.playerPoints[i]; starNum++ ) {
          stars.push (<td><img alt="star" className="star" src={star}/></td>)
        }
        return stars
      }

    return (<div id="scoreboard"><img alt="players" src={players} id="score-header"
    onClick={handleHeaderClick}/>
    <table>
    {props.players.map((p, i) => <tr className={`player ${i}`}>
    <td onClick={() => props.addStarToPlayer(i)}
    onDoubleClick={() => props.removeStarFromPlayer(i)}>{p}</td>
    {generateStars(i)}</tr>)}
    </table>
    </div>)
}

export default Scoreboard;
