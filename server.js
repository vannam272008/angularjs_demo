const express = require('express');
const path = require('path');
const app = express();

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'app')));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});