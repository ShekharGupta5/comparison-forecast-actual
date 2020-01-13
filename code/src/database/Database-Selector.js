function DatabaseName(date){
    var databaseName ;
    var todayDate;
    
    todayDate =new Date(date);
    
    
    var todayDateFormat = parseInt(todayDate.getFullYear() + '' + ('0' + (todayDate.getMonth() + 1)).slice(-2) + "" + ('0' + todayDate.getDate()).slice(-2));
    var dbRecord = JSON.parse(require('fs').readFileSync('D:\\Software\\Forecasting DB\\DatabaseRecord.json'))
    var timeSeriesArray = Object.keys(dbRecord)
    timeSeriesArray.forEach( (series) => {
        datesData = series.split('-')
        dbStartDate = parseInt(datesData[0])
        dbEndDate = parseInt(datesData[1])
        
        if(dbStartDate <= todayDateFormat && todayDateFormat <= dbEndDate){
            databaseName = dbRecord[series]
        }
    })
    return databaseName;
}

// var giveDate = new Date('2020-01-10')
// console.log('The everydataind si ',giveDate.getDate(),' ',giveDate.getMonth())
// console.log('THe dataabase returned is ',DatabaseName(giveDate))
module.exports.DatabaseName = DatabaseName;