import mongoose = require('mongoose');

const { mongoURI } = require('./config.json');

const connectDB = async() => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database')
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
}

module.exports = connectDB;
