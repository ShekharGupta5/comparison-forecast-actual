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

module.exports.Log = Log;