var functions = require('../functions/GeneralFunction')

var Log = functions.Log;

const express = require('express');




const { convertArrayToCSV } = require('convert-array-to-csv');


var router = express.Router();

router.get('', (req, res) => {
    console.log(Log(req,'Generation'));
    console.log(req.query)
    if (req.query.fromdate === undefined || req.query === null) {
        return res.render('dashboard', {
            data: "Enter dates",
            message:'Please select date'

        });
    }
    fromdate = new Date(req.query.fromdate);
    //todate = new Date(req.query.todate);
    parameter = req.query.parameter;
    provider = req.query.provider;
    owner = req.query.owner;
    var parameter_title = {
        'solar':'GHI W/m2',
        'wind':'Wind Speed (m/s)',
        'temperature':' Degree Celcius',
        'humidity':'Relative Humidity %'
    }
    if(owner == undefined || owner == null){
        owner = '';
    }
    const Fetcher = require('../fetch/Fetcher')
    Fetcher.FetchGenerationData(fromdate,parameter,provider,owner).then( (result) => {
            // res.render('dashboard', {
            //     status:200,
            //     message: 'a download button should come',
            //     data:result,//convert data in csv format to make it download .,
            //     date:fromdate.getDate()+'/'+(fromdate.getMonth()+1)+'/'+fromdate.getFullYear(),
            //     y_axis_title:parameter_title[parameter],
            //     owner:owner
            // });
            //console.log('The result returned from generatueion is ',result)
            
             res.send(result)
        
    })
    
    
    
});

module.exports = router;
