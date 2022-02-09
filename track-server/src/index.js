require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth'); 

console.log;

const app = express();

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:zire31@cluster0.mpwvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) =>{
    console.log('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) =>{
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3002, () => {
    console.log('Listening on port 3002')
})