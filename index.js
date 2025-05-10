const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Replace with your actual token from ipinfo.io
// const IPINFO_TOKEN = 'd9a8e75e598172';
const IPINFO_TOKEN = process.env.IPINFO_TOKEN;


app.get('/', async (req, res) => {
    // let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    

    // For localhost testing, use a public IP instead
    // if (ip === '::1' || ip === '127.0.0.1') {
    //     ip = '8.8.8.8'; // Google's DNS IP
    // }

    try {
        const response = await axios.get(`https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`);
        const data = response.data;

        console.log('Visitor Info:');
        console.log(`IP Address: ${data.ip}`);
        console.log(`City: ${data.city}`);
        console.log(`Region: ${data.region}`);
        console.log(`Country: ${data.country}`);
        console.log(`Location (lat,long): ${data.loc}`);
        console.log(`ISP (Org): ${data.org}`);
        console.log(`Postal: ${data.postal}`);
        console.log('---------------------------');

        res.send("Visitor data logged in console.");
    } catch (error) {
        console.error("Error fetching IP info:", error.message);
        res.status(500).send("Failed to fetch IP info.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
