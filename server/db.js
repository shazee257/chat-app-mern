const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('connected to mongodb');
});

mongoose.connection.on('error', (err) => {
    console.log('error connecting to mongodb', err);
});


