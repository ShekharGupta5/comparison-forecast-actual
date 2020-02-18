require('../database/mongo-connection');

const GenerationModel = require('../model/GenerationModel')
const RMSE = require('../functions/GeneralFunction').RMSE;

async function FetchData(fromdate,parameter,provider,owner){
 formatedStrin = String( fromdate.getFullYear() + '-' +('0' + (fromdate.getMonth() + 1)).slice(-2)+ '-' +('0' + fromdate.getDate()).slice(-2) ) 
 aDateAgo = new Date(fromdate);
 aDateAgo.setDate(aDateAgo.getDate()+1)
 aDateAgoString = String( aDateAgo.getFullYear() + '-' +('0' + (aDateAgo.getMonth() + 1)).slice(-2)+ '-' +('0' + aDateAgo.getDate()).slice(-2) ) 
 

 require('../model/ForecastModel').setDate(fromdate);
   

 const ForecastModel = require('../model/ForecastModel').Forecast;


 var result = await ForecastModel().find({
       timestamp:{
           $gte:new Date(formatedStrin),
           $lt:new Date(aDateAgoString)
       },
       parameter:parameter,
       provider:{
           $in:provider
       },
       owner:owner
   })

   bifurcatedResult = BifurcateProvider(result);
   returnDataObj = {}
   returnDataObj['IITM'] = TrasnformData(bifurcatedResult['IITM'])
   returnDataObj['ECMWF'] = TrasnformData(bifurcatedResult['ECMWF'])
   returnDataObj['ACTUAL'] = TrasnformData(bifurcatedResult['ACTUAL'])
   
   ActualObject = {...returnDataObj['ACTUAL']}
   //Objects are passed by reference in js, so need to create a new object
   //Need to make a separate variable because otherwise it is over writing returnDataObj['ACTUAL']
   returnDataObj['MYForecast'] =  MYForecast(ActualObject)
   

   return await returnDataObj;
}
function BifurcateProvider(resultSet){
    bigDataObject = {}
    bigDataObject['IITM'] = [];
    bigDataObject['ECMWF'] = [];
    bigDataObject['ACTUAL'] = [];

    resultSet.forEach( (doc) => {
        provider = doc.provider;
        if(provider == "IITM"){
            bigDataObject['IITM'].push(doc)
        }
        else if(provider == "ECMWF"){
            bigDataObject['ECMWF'].push(doc)
        }else if(provider == "ACTUAL"){
            bigDataObject['ACTUAL'].push(doc)
        }
    })
    return bigDataObject;
}
function giveMeTimestampIndex(timestamp){
    var hours = timestamp.getUTCHours();
    var seconds = timestamp.getUTCMinutes();
    index = (hours*4)+1 + (seconds/15);
    return index;
}
function TrasnformData(data){
    
    timestampArray = [];
    for(var i=0;i<96;i++){
        timestampArray[i] = {};
        timestampArray[i]['value'] = 0;
        timestampArray[i]['index'] = 999;
    }
    numberOfTurbines = data.length / 96;
    
    data.forEach( (doc) => {
        index = giveMeTimestampIndex(doc.timestamp);
        timestampArray[index-1]['value'] += doc.value;
        timestampArray[index-1]['index'] = index;
    })

    //For getting the average, out of total
    for(var i=0;i<96;i++){
        timestampArray[i]['value'] = timestampArray[i]['value']/numberOfTurbines;
    }
    storage = {}
    storage['value'] = [];
    storage['index'] = [];

    timestampArray.forEach( (entry) => {
        storage['value'].push(entry.value);
        storage['index'].push(entry.index)
    })
    
    return storage;

}
async function FetchGenerationData(fromdate,parameter,provider,owner){
    formatedStrin = String( fromdate.getFullYear() + '-' +('0' + (fromdate.getMonth() + 1)).slice(-2)+ '-' +('0' + fromdate.getDate()).slice(-2) ) 
 aDateAgo = new Date(fromdate);
 aDateAgo.setDate(aDateAgo.getDate()+1)
 aDateAgoString = String( aDateAgo.getFullYear() + '-' +('0' + (aDateAgo.getMonth() + 1)).slice(-2)+ '-' +('0' + aDateAgo.getDate()).slice(-2) ) 
   var result = await GenerationModel.find({
       timestamp:{
           $gte:new Date(formatedStrin),
           $lt:new Date(aDateAgoString)
       },
       parameter:parameter,
       provider:{
           $in:provider
       },
       owner:owner
   })
   returnDataObj = {};
   returnDataObj['Generation'] = TrasnformData(result);

   ActualObject = {...returnDataObj['Generation']}
   //Objects are passed by reference in js, so need to create a new object
   //Need to make a separate variable because otherwise it is over writing returnDataObj['ACTUAL']
   returnDataObj['GenerationForecast'] =  MYForecast(ActualObject)
   returnDataObj['RMSE'] = RMSE(returnDataObj['Generation'].value,returnDataObj['GenerationForecast'].value,250)
   
   return returnDataObj;
}


async function NewDbPatch(){
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://127.0.0.1:27017/'
    MongoClient.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db('ForecastingDB')
        dbo.collection('forecastingsJans').find({'provider':'IITM' , 'parameter':'solar' ,'owner':'arinsun' }).toArray( function(err,result){
            if(err) throw err;
            return result
            
        })
    })
}

function MYForecast(data){
    pointC = []
    pointC.push
//    console.log('The before values are ',data.value)
   for(var i=0;i<96;i++){
    if(i==0 || i==1){
       pointC.push(data.value[i]) 
    }else{
        APoint = data.value[i-2];
        BPoint = data.value[i-1];
        // curvefactor = Math.sqrt(BPoint/APoint);
        curvefactor = BPoint/APoint;
        considerAlpha = false;
        alpha = 0
        alphaCurveFactorConsideration = 0.05 //that is 10%
        if(considerAlpha){
            if(curvefactor<1){
                alpha = - (alphaCurveFactorConsideration)*curvefactor;
            }
            else if(curvefactor>1){
                alpha = (alphaCurveFactorConsideration)*curvefactor;
            }
        }
        if(isNaN(curvefactor) || curvefactor == Infinity){
            curvefactor = 0;
        }
        if(curvefactor>2.25){
            curvefactor = 2.25;//limit so that spikes can be reduced.
        }
        if(curvefactor < 0.625){
            curvefactor = 0.625 //limit so that spikes can reduced ,it is difficult to drop more rapid that this value.
        }
        
        CPoint = (curvefactor-alpha)*BPoint; //Cpoint is Forecasted Point
        pointC.push(CPoint);
        
    }
}
    //just shifting a timeblock to left
    shiftingLeft = false
    if(shiftingLeft){
        console.log('nO')
        for(var j=0;j<96;j++){
            if(j==0){
                //do nothing
            }
            else{
                temp = pointC[j];
                pointC[j-1] = temp;
            }
        }
    }
    data.value = pointC;
    //  console.log('After values',data.value)
    
    return data;
 
}
function MYForecast2(data){
    pointC = []
    pointC.push
//    console.log('The before values are ',data.value)
   for(var i=0;i<96;i++){
    if(i==0 || i==1 || i==2 || i==3){
       pointC.push(data.value[i]) 
    }else{
        APoint = data.value[i-4];
        BPoint = data.value[i-3];
        // curvefactor = Math.sqrt(BPoint/APoint);
        curvefactor = BPoint/APoint;
        considerAlpha = false;
        alpha = 0
        alphaCurveFactorConsideration = 0.05 //that is 10%
        if(considerAlpha){
            if(curvefactor<1){
                alpha = - (alphaCurveFactorConsideration)*curvefactor;
            }
            else if(curvefactor>1){
                alpha = (alphaCurveFactorConsideration)*curvefactor;
            }
        }
        if(isNaN(curvefactor) || curvefactor == Infinity){
            curvefactor = 0;
        }
        if(curvefactor>2.25){
            curvefactor = 2.25;//limit so that spikes can be reduced.
        }
        if(curvefactor < 0.625){
            curvefactor = 0.625 //limit so that spikes can reduced ,it is difficult to drop more rapid that this value.
        }
        CPoint = (curvefactor-alpha)*BPoint; //Cpoint is Forecasted Point
        pointC.push(CPoint);
        
    }
}
    //just shifting a timeblock to left
    shiftingLeft = false
    if(shiftingLeft){
        console.log('nO')
        for(var j=0;j<96;j++){
            if(j==0){
                //do nothing
            }
            else{
                temp = pointC[j];
                pointC[j-1] = temp;
            }
        }
    }
    data.value = pointC;
    //  console.log('After values',data.value)
    
    return data;
 
}
module.exports.FetchGenerationData = FetchGenerationData
module.exports.TrasnformData = TrasnformData;
module.exports.FetchData = FetchData;
