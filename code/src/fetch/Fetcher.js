require('../database/mongo-connection');

const ForecastModel = require('../model/ForecastModel')
const GenerationModel = require('../model/GenerationModel')

async function FetchData(fromdate,parameter,provider,owner){
 formatedStrin = String( fromdate.getFullYear() + '-' +('0' + (fromdate.getMonth() + 1)).slice(-2)+ '-' +('0' + fromdate.getDate()).slice(-2) ) 
 aDateAgo = new Date(fromdate);
 aDateAgo.setDate(aDateAgo.getDate()+1)
 aDateAgoString = String( aDateAgo.getFullYear() + '-' +('0' + (aDateAgo.getMonth() + 1)).slice(-2)+ '-' +('0' + aDateAgo.getDate()).slice(-2) ) 
   var result = await ForecastModel.find({
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
   
   return TrasnformData(result);
}

module.exports.FetchGenerationData = FetchGenerationData
module.exports.TrasnformData = TrasnformData;
module.exports.FetchData = FetchData;
