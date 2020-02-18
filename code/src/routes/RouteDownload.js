var functions = require('../functions/GeneralFunction')

var Log = functions.Log;

const express = require('express');


const spawn = require("child_process").spawn;


var router = express.Router();

router.get('',(req,res)=> {
    console.log(Log(req,'DownloadData'));
    if (req.query.fromdate === undefined || req.query === null) {
        return res.render('download', {
            data: "Enter dates",
            message:'Please select date'

        });
    }
    fromdate = new Date(req.query.fromdate);
    todate = new Date(req.query.todate);
    year = fromdate.getFullYear();
    fmonth = fromdate.getMonth()+1;
    fday = fromdate.getDate();
    tmonth = todate.getMonth() + 1;
    tday = todate.getDate();
    parameter = req.query.parameter;

    switch(parameter){
       case 'temperature':
        var pythonProcess = spawn('python',["D:\\Software\\Forecasting DB\\data Fetch\\PythonTemperatureAutomated.py",year,fmonth,fday,tmonth,tday]);
        var pythonProcess2 = spawn('python',["D:\\Software\\Forecasting DB\\data Fetch\\GenerateSheet.py",year,fmonth,fday,tmonth,tday,'TemperatureSolars'])
        pythonProcess.stdout.on('data',function(data){
            console.log(data.toString())
        })
        pythonProcess2.stdout.on('data',function(data){
            console.log(data.toString())
        })
        break;
    }
    res.render('download')
})


module.exports = router;
