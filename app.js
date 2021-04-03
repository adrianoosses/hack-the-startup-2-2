require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser')
const server = require('http').createServer(app);
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())
 


const user = require('./components/user/router.js');
const nea = require('./components/nea/router.js');

const PORT = process.env.PORT || 3001;
app.use(express.json());

// CORS
app.use(cors());

app.use('/user', user.routes);
app.use('/nea', nea.routes);
app.get('/', (req, res) => res.send('Hello word'));

const MongoURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`; // process.env.MongoURI || 
mongoose.connect(MongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
})
    .then(() => console.log('Mongoose connected'))
    .catch(e => console.error('Mongoose not connected', e));


server.listen(PORT, () => console.log(`Server running ${PORT}`));

['unhandledRejection', 'uncaughtException'].forEach((event) => process.on(event, (err) => {
    console.error(`unhandled error: ${err.stack || err}`);
}));
