const mongoose = require('mongoose')

const Forecast = mongoose.model('forecasting',{
    timestamp:{
        type:Date
    },
    value:{
        type:Number
    },
    id:{
        type:String
    },
    provider:{
        type:String
    },
    owner:{
        type:String
    },
    parameter:{
        type:String
    }
})

module.exports = Forecast;