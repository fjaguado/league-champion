import React, { useState } from 'react';
import Modal from '@marketgoo/ola/dist/Modal';
import ModalHeader from '@marketgoo/ola/dist/Modal/Header';
import ModalContent from '@marketgoo/ola/dist/Modal/Content';
import Input from '@marketgoo/ola/dist/Input';
import Field from '@marketgoo/ola/dist/Field';
import Button from '@marketgoo/ola/dist/Button';

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
                    <Button as="button" variant="primary">
                        Add new player
                    </Button>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddPlayer;
