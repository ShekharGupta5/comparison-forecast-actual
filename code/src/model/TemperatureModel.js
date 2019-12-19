const mongoose = require('mongoose')

const Temperature = mongoose.model('temperature',{
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

module.exports = Temperature;