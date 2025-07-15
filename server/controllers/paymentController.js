import paypal from '../configs/paypal.js';

export const createPayment = (req, res) => {
  const { total } = req.body;

  const paymentJson = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    redirect_urls: {
      return_url: 'http://localhost:5173/api/rooms',
      cancel_url: 'http://localhost:5173/api/rooms',
    },
    transactions: [{
      amount: {
        currency: 'USD',
        total: parseFloat(total).toFixed(2), // ensures it's a valid money string like "45.00"
      },
      description: 'Hotel Booking Payment',
    }],
  };

  paypal.payment.create(paymentJson, (err, payment) => {
    if (err) return res.status(500).json({ error: err });
    const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
    res.json({ url: approvalUrl.href });
  });
};

