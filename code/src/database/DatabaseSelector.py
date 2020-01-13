from datetime import date,datetime
import json

def DatabaseName(databaseDate,provider):
    databaseName =''
    if(provider == 'IITM' or provider == 'ECMWF'):
        today = datetime.strptime(databaseDate,"%Y%m%d")
    if(provider == 'ACTUAL'):
        today = datetime.strptime(databaseDate,"%d_%m_%Y")
   
    todayDateFormat = int(today.strftime("%Y%m%d"))
    
    with open('D:\\Software\\Forecasting DB\\DatabaseRecord.json') as f:
        dbRecord = json.load(f)
        timeSeriesArray = dbRecord.keys()
        for series in timeSeriesArray:
            datesData = series.split('-')
            dbStartDate = int(datesData[0])
            dbEndDate = int(datesData[1])
            if(dbStartDate <= todayDateFormat and todayDateFormat <= dbEndDate):
                databaseName = dbRecord[series]
    return databaseName

