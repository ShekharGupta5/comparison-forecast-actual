const mongoose = require('mongoose')

const Generation = mongoose.model('generation',{
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

module.exports = Generation;