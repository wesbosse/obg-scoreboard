import React, { useState, useEffect } from 'react';

const PlayerForm = (props) => {
    const [name,  setName]  = useState(props.player.name);
    const [army,  setArmy]  = useState(props.player.army);
    const [team,  setTeam]  = useState(props.player.team);
    const [score, setScore] = useState(props.player.score);
    const [cp,    setCp]    = useState(props.player.cp);
    const [key,   setKey]   = useState(props.player.key);

    return (
      <form key={key} action={'/api/player/' + key.toString()} method="post">
        <h1>{name + ': ' + army}</h1>
        {/* 
        
        */}
        <label>
          Name <input name="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Army <input name="army" type="text" value={army} onChange={e => setArmy(e.target.value)} required />
        </label>
        <label>
          Team <input name="team" type="text" value={team} onChange={e => setTeam(e.target.value)} required />
        </label>
        {/* 
        
        */}
        <label>
          Score <input name="score" type="text" value={score} onChange={e => setScore(e.target.value)} required />
        </label>
        <label>
          CP <input name="cp" type="text" value={cp} onChange={e => setCp(e.target.value)} required />
        </label>

        <button>Submit</button>
      </form>
    )
}

export default PlayerForm;