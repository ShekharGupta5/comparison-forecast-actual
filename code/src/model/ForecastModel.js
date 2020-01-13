const mongoose = require('mongoose')

global.databaseNameForDate ;
//this above var should be equal to the reqeust fromdate
function setDate(date){
    global.databaseNameForDate = date
}

var database = require('../database/Database-Selector')
var Schema = mongoose.Schema;

var ForecastSchema = new Schema({
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

function Forecast(){
  console.log('The database name returned is from ForecastModel.js ',database.DatabaseName(global.databaseNameForDate))

   return mongoose.model(database.DatabaseName(global.databaseNameForDate),ForecastSchema)
}
module.exports.Forecast = Forecast;
module.exports.setDate = setDate;