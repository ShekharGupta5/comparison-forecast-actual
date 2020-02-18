function Log(req,route){
    var timestamp = new Date();
    fromdate = new Date(req.query.fromdate);
    todate =  new Date(req.query.todate);
    FormattedFormDate = String(  ('0' + fromdate.getDate()).slice(-2)+'/' + ('0' + (fromdate.getMonth() + 1)).slice(-2) + "/" +fromdate.getFullYear());
    FormattedToDate = String(  ('0' + todate.getDate()).slice(-2)+ '/' +('0' + (todate.getMonth() + 1)).slice(-2) + "/" +todate.getFullYear());
    var str = ' The request is made from ' + req.ip+' at '+timestamp.getDate()+'/'+(timestamp.getMonth()+1)+'/'+timestamp.getFullYear() + ' on ' + timestamp.getHours() +":"+ timestamp.getMinutes() +':'+ timestamp.getSeconds() +' from ' + route +' for date '+FormattedFormDate+' to '+FormattedToDate;
    require('fs').appendFileSync('./logs/AppExecution.txt',str +'\n')
    return str;
}
function RMSE(actual,forecast,generationCapacity){
    // console.log(actual,forecast)
    squaresValues = []
    var sums =0 ;
    for(var i=0;i<96;i++){
        item = Math.pow( ( (actual[i]-forecast[i]) / generationCapacity ),2 );
        squaresValues.push(item)
        sums = sums + item;
    }
    rmse = Math.sqrt(sums/96);
    return rmse*100;

}
module.exports.Log = Log;
module.exports.RMSE = RMSE;