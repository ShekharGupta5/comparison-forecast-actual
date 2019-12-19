const mongoose = require('mongoose')

const Solar = mongoose.model('solar',{
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

module.exports = Solar;