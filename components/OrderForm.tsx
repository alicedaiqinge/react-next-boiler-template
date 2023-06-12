import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import router from 'next/router';
import { StatusCodes } from 'http-status-codes';

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
    const [formData, setFormData] = useState({
        totalAmount: {
            amount: '190.00',
            currency: 'EUR'
        },
        consumer: {
            phoneNumber: '0413323344',
            givenNames: 'Joe',
            surname: 'DD',
            email: 'dd@gmail.com'
        },
        shipping: {
            countryCode: 'it',
            name: 'd',
            postcode: 'dd',
            suburb: 'dd',
            line1: 'dd'
        },
        items: [
            {
                quantity: 1,
                price: {
                    amount: '10.00',
                    currency: 'EUR'
                },
                name: 'dd',
                category: 'dd'
            }
        ],
        sku: 'sku',
        merchant: {
            redirectCancelUrl: 'https://portal.integration.scalapay.com/failure-url',
            redirectConfirmUrl: 'https://portal.integration.scalapay.com/success-url'
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { totalAmount, consumer, shipping, items, sku, merchant } = formData;
        const orderData = { totalAmount, consumer, shipping, items, sku, merchant, };

        try {
            const response = await axios.post('http://localhost:8080/scalapay/orders', orderData);

            // Handle successful response
            if (response.status == StatusCodes.CREATED) {
                let url = response.data.url;
                router.push(url);
            }
        } catch (error) {
            // Handle error
            console.error('Failed to create order:', error);
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Total Amount */}
            <Grid container spacing={1} style={{
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '10px',
                marginLeft: '5px',
            }}>
                <Grid item xs={2}>
                    <TextField
                        name="totalAmount.amount"
                        label="Total Amount"
                        value={formData.totalAmount.amount}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="totalAmount.currency"
                        label="Currency"
                        value={formData.totalAmount.currency}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            {/* Consumer */}
            <Grid container spacing={1} style={{
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '10px',
                marginLeft: '5px',
                marginTop: '15px'
            }}>
                <Grid item xs={2}>
                    <TextField
                        name="consumer.phoneNumber"
                        label="Phone Number"
                        value={formData.consumer.phoneNumber}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="consumer.givenNames"
                        label="Given Names"
                        value={formData.consumer.givenNames}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="consumer.surname"
                        label="Surname"
                        value={formData.consumer.surname}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="consumer.email"
                        label="Email"
                        value={formData.consumer.email}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            {/* Shipping */}
            <Grid container spacing={1} style={{
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '10px',
                marginLeft: '5px',
                marginTop: '15px'
            }}>
                <Grid item xs={2}>
                    <TextField
                        name="shipping.countryCode"
                        label="Country Code"
                        value={formData.shipping.countryCode}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="shipping.name"
                        label="Name"
                        value={formData.shipping.name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="shipping.postcode"
                        label="Postcode"
                        value={formData.shipping.postcode}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="shipping.suburb"
                        label="Suburb"
                        value={formData.shipping.suburb}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="shipping.line1"
                        label="Line 1"
                        value={formData.shipping.line1}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            {/* Items */}
            <Grid container spacing={1} style={{
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '10px',
                marginLeft: '5px',
                marginTop: '15px'
            }}>
                <Grid item xs={2}>
                    <TextField
                        name="items[0].quantity"
                        label="Quantity"
                        value={formData.items[0].quantity}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="items[0].price.amount"
                        label="Price Amount"
                        value={formData.items[0].price.amount}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="items[0].price.currency"
                        label="Price Currency"
                        value={formData.items[0].price.currency}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="items[0].name"
                        label="Item Name"
                        value={formData.items[0].name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="items[0].category"
                        label="Item Category"
                        value={formData.items[0].category}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            {/* SKU */}
            <Grid container spacing={1} style={{
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '10px',
                marginLeft: '5px',
                marginTop: '15px'
            }}>
                <Grid item xs={2}>
                    <TextField
                        name="sku"
                        label="SKU"
                        value={formData.sku}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            {/* Merchant */}
            <Grid container spacing={1} style={{
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '10px',
                marginLeft: '5px',
                marginTop: '15px'
            }}>
                <Grid item xs={2}>
                    <TextField
                        name="merchant.redirectCancelUrl"
                        label="Redirect Cancel URL"
                        value={formData.merchant.redirectCancelUrl}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        name="merchant.redirectConfirmUrl"
                        label="Redirect Confirm URL"
                        value={formData.merchant.redirectConfirmUrl}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid container spacing={1} justifyContent="center" style={{
                marginLeft: '5px',
                marginTop: '15px',
            }}>
                <Grid item xs={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default OrderForm;
