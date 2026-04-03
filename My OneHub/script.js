// This should be on your server, NOT in the HTML
const axios = require('axios');

app.post('/api/create-order', async (req, res) => {
    const { service, amount, customer_phone, customer_email } = req.body;
    
    try {
        const response = await axios.post('https://api.cashfree.com/pg/orders', {
            order_id: `ORDER_${Date.now()}`,
            order_amount: amount,
            order_currency: "INR",
            customer_details: {
                customer_id: `CUST_${Date.now()}`,
                customer_phone,
                customer_email
            }
        }, {
            headers: {
                'x-client-id': '1247580e2c2371897606fb0d0440857421',
                'Content-Type': 'application/json'
            }
        });
        
        res.json({ 
            payment_session_id: response.data.payment_session_id 
        });
    } catch (error) {
        res.status(500).json({ error: 'Order creation failed' });
    }
});