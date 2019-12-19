const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/ForecastingDB',{ useNewUrlParser: true,useUnifiedTopology: true })

connection = mongoose.connection;

connection.on('connected',function(){
    console.log('Connected To Mongodb via Mongoose.')
})