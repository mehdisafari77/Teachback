const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    app.use(express.static(path.join(__dirname, '../client/build')));
});

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
