export const currency = (value) =>
    new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(Number(value ?? 0));

export const number = (value) =>
    new Intl.NumberFormat('en-PH').format(Number(value ?? 0));

export const paymentLabel = (value) =>
    ({
        card: 'Card',
        cod: 'Cash on Delivery',
        bank_transfer: 'Bank Transfer',
    })[value] ?? value;
