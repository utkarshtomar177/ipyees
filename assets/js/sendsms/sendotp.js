const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });


const express = require('express');
const cors = require('cors');
const app = express();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
app.use(cors());
app.use(express.json());

const otpStore = {}; 

app.post('/send-otp', async (req, res) => {
    const { phone } = req.body;
    
    if (!phone || !phone.startsWith('+91')) {
        return res.status(400).json({ 
            success: false, 
            error: "Invalid phone number format. Must start with +91." 
        });
    }
    
    const otp = Math.floor(1000 + Math.random() * 9000); 
    otpStore[phone] = otp.toString(); 
    
    console.log(`Sending OTP ${otp} to ${phone}`); 

    try {
        await client.messages.create({
            from: process.env.TWILIO_FROM_NUMBER,
            to: phone,
            body: `Your OTP is ${otp}`
        });
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/verify-otp', (req, res) => {
    const { phone, otp } = req.body;
    
    console.log(`Verifying OTP: ${otp} for ${phone}`); 
    console.log(`Stored OTP: ${otpStore[phone]}`); 
    
    if (otpStore[phone] && otpStore[phone] === otp) {
        delete otpStore[phone]; 
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: "Invalid OTP" });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});