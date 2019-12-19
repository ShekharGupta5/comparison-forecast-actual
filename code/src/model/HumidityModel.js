const mongoose = require('mongoose')

const Humidity = mongoose.model('humidity',{
    timestamp:{
        type:Date
    },
    data:{
        type:Number
    },
    station_id:{
        type:String
    }
})

module.exports = Humidity;