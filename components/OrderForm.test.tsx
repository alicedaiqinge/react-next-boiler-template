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
            name: 'John Doe',
            email: 'john@example.com',
            address: '123 Street',
        };

        mockedAxios.post.mockResolvedValueOnce({ data: { orderId: '123456' } });

        render(<OrderForm />);

        const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const addressInput = screen.getByLabelText('Address') as HTMLInputElement;
        const submitButton = screen.getByText('Submit');

        fireEvent.change(nameInput, { target: { value: mockOrderData.name } });
        fireEvent.change(emailInput, { target: { value: mockOrderData.email } });
        fireEvent.change(addressInput, { target: { value: mockOrderData.address } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledTimes(1);
            expect(mockedAxios.post).toHaveBeenCalledWith(
                '/scalapay/createOrder',
                mockOrderData
            );
        });
    });

});
