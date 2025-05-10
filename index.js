const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Get the token from environment variables
const IPINFO_TOKEN = process.env.IPINFO_TOKEN;

app.get('/', async (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.split(',')[0].replace('::ffff:', '').trim(); // Clean the IP

    // Log the IP for debugging
    console.log(`Using IP: ${ip}`);

    try {
        // Construct the API URL and log it for debugging
        const apiUrl = `https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`;
        console.log(`Fetching IP info from: ${apiUrl}`);

        const response = await axios.get(apiUrl);
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
        console.error("Error response:", error.response ? error.response.data : error);
        res.status(500).send("Failed to fetch IP info.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
