const mongoose = require('mongoose')

const Wind = mongoose.model('wind',{
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

module.exports = Wind;