import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';

jest.mock('axios');

describe('OrderForm', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('creates an order on form submission', async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;

        const mockOrderData = {
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
        };

        const mockResponse = { url: 'https://portal.integration.scalapay.com/checkout/123456' };
        mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

        render(<OrderForm />);

        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);

        await waitFor(async () => {
            expect(mockedAxios.post).toHaveBeenCalledTimes(1);
            expect(mockedAxios.post).toHaveBeenCalledWith(
                'http://localhost:8080/scalapay/orders',
                mockOrderData
            );
            expect(mockedAxios.post).toHaveReturned();
        });

    });

});
