import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
            maxWidth: '300px',
        },
    })
);

const OrderForm = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const orderData = { name, email, address };

        try {
            const response = await axios.post('/scalapay/createOrder', orderData);

            // Handle successful response
            console.log('Order created:', response.data);
        } catch (error) {
            // Handle error
            console.error('Failed to create order:', error);
        }

        // Reset the form after submission
        setName('');
        setEmail('');
        setAddress('');
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                id="name-input"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                id="address"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
      </Button>
        </form>
    );
};

export default OrderForm;
