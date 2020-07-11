import React, { useState } from 'react';

const AddPlayer = props => {
    const [player, setPlayer] = useState({ name: null, team: null, score: null });

    const handleChange = event => {
        console.log(event);
        setPlayer({ ...player, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        props.onSubmit(player);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Add new players</h4>
            <input name="name" placeholder="player name" onChange={handleChange} />
            <input name="team" placeholder="team name" onChange={handleChange} />
            <input name="score" placeholder="team score" onChange={handleChange} />
            <button>Add</button>
        </form>
    );
};

export default AddPlayer;
