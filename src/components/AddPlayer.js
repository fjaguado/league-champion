import React, { useState, useEffect } from 'react';
import Modal from '@marketgoo/ola/dist/Modal';
import ModalHeader from '@marketgoo/ola/dist/Modal/Header';
import ModalContent from '@marketgoo/ola/dist/Modal/Content';
import Field from '@marketgoo/ola/dist/Field';
import Button from '@marketgoo/ola/dist/Button';

const AddPlayer = props => {
    const [player, setPlayer] = useState({ name: null, team: null, score: null });
    const [isDisabled, setIsDisabled] = useState(true);

    const handleChange = event => {
        setPlayer({ ...player, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        console.log(player);
        setIsDisabled(!formIsValid());
    }, [player]);

    const formIsValid = () => {
        return (
            player.name &&
            player.name.length > 0 &&
            player.team &&
            player.team.length > 0 &&
            player.score &&
            player.score.length > 0
        );
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!formIsValid()) {
            return;
        }
        props.onSubmit(player);
    };

    return (
        <Modal open={props.isFormVisible} onClose={props.onCancel}>
            <ModalHeader title="Add new player" />
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <Field
                        disabled={false}
                        error={false}
                        hint="(required)"
                        id="name"
                        label="Player name">
                        <input
                            className="ola_input"
                            name="name"
                            placeholder="Tsubasa Ōzora"
                            type="text"
                            onChange={handleChange}
                        />
                    </Field>
                    <Field disabled={false} error={false} hint="(required)" id="team" label="Team">
                        <input
                            className="ola_input"
                            name="team"
                            placeholder="Nankatsu"
                            type="text"
                            onChange={handleChange}
                        />
                    </Field>
                    <Field
                        disabled={false}
                        error={false}
                        hint="(required)"
                        id="score"
                        label="score">
                        <input
                            className="ola_input"
                            name="score"
                            placeholder="0000"
                            type="number"
                            onChange={handleChange}
                        />
                    </Field>
                    <Button as="button" variant="primary" disabled={isDisabled}>
                        Add new player
                    </Button>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddPlayer;
