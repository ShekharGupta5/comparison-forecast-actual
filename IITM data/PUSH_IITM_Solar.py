from openpyxl import Workbook
from openpyxl import load_workbook
from datetime import datetime,timedelta
import pymongo
import sys
import owner_solar
sys.path.append('D://Software//Forecasting DB//code//src//database')

#As we are forecasting for a day ahead and the file name is of d-1 so 
#it is causing error , so will give a date d+1 for dabasename function
dayAhead = datetime.strptime(sys.argv[1],"%Y%m%d") + timedelta(days=1)
dayAheadString = datetime.strftime(dayAhead,"%Y%m%d")
import DatabaseSelector
dbName = DatabaseSelector.DatabaseName(dayAheadString,provider='IITM')
print('The Records are inserted in ',dbName)

myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
mydb = myclient['ForecastingDB']
collection = mydb[dbName]

date = sys.argv[1]
base = 'RE Stations Forecast Folder/Solar/wrf_solar.'
path = base + date +'00/'

objectData = []

owner_obj = owner_solar.owner_obj

for station  in range(45,48):
    allData = []
    name = path + 'station_' + str(station) +'.csv'

    fyle = open(name)
    
    owner = owner_obj[str(station)]
    
    for row in fyle:
        allData.append(row)

    for d in range(75,171):  
        dataParts = allData[d].split(',')
        timeStampParts = dataParts[0].split(' ')
        dateValue = datetime.strptime(timeStampParts[0] +' '+ timeStampParts[1],"%d-%m-%Y %H:%M")
        dateValue = dateValue + timedelta(hours=5) + timedelta(minutes=30)
        
        #dateValue = datetime.strftime(dateValue,"%d-%m-%Y %H:%M")
        
        
        data = float(dataParts[1].strip())
        
        obj = {
            "timestamp":dateValue,
            "value":data,
            "id": 'Station '+str(station),
            "provider":'IITM',
            "owner":owner,
            "parameter":"solar"
        }
        
        objectData.append(obj)
    

collection.insert_many(objectData)

print('Total ',len(objectData),' documents inserted in ',dbName,' database. These docs are for date ',date,' for IITM Solar')


        