import React, { useState, useEffect } from 'react';
import Modal from '@marketgoo/ola/dist/Modal';
import ModalHeader from '@marketgoo/ola/dist/Modal/Header';
import ModalContent from '@marketgoo/ola/dist/Modal/Content';
import Field from '@marketgoo/ola/dist/Field';
import Button from '@marketgoo/ola/dist/Button';
import FieldInput from './FieldInput';

const AddPlayer = props => {
    const [player, setPlayer] = useState({ name: null, team: null, score: null });
    const [isDisabled, setIsDisabled] = useState(true);

    const handleChange = event => {
        setPlayer({ ...player, [event.target.name]: event.target.value });
    };

    useEffect(() => {
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
                    <FieldInput
                        name="name"
                        placeholder="Tsubasa Ōzora"
                        required={true}
                        label="Player name"
                        type="text"
                        onChange={handleChange}
                    />
                    <FieldInput
                        name="team"
                        placeholder="Nankatsu"
                        required={true}
                        label="Team"
                        type="text"
                        onChange={handleChange}
                    />
                    <FieldInput
                        name="score"
                        placeholder="0000"
                        required={true}
                        label="score"
                        type="number"
                        onChange={handleChange}
                    />
                    <Button as="button" variant="primary" disabled={isDisabled}>
                        Add new player
                    </Button>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddPlayer;
