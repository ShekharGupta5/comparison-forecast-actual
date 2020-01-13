from openpyxl import Workbook
from openpyxl import load_workbook
from datetime import datetime
import pymongo
import sys

sys.path.append('D://Software//Forecasting DB//code//src//database')

import DatabaseSelector
dbName = DatabaseSelector.DatabaseName(sys.argv[1],provider='ACTUAL')
print('The Records are inserted in ',dbName)

myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
mydb = myclient['ForecastingDB']
collection = mydb[dbName]

date = sys.argv[1]



path =  'OSTRO_MPS_' + date+ '.csv'

fyle = open(path)
allData = []

for row in fyle:
    allData.append(row)

columnHeads = []
filteredDataArray = []
for i in range(1,2):
    columnHeadsArray = allData[i].split(',')
    for eachHead in columnHeadsArray:
        if(eachHead == 'Timestamp'):
            ignore = True
        else:
            columnHeads.append(eachHead)

for i in range(2,98):
    dataParts = allData[i].split(',')
    timestamp = datetime.strptime(dataParts[0],"%d-%m-%Y %H:%M:%S")
    # dataParts.remove(timestamp)
    
    for j in range(1,len(columnHeads)+1):
        obj = {
        "timestamp":timestamp,
        "value":dataParts[j],
        "id":'Ostro_Mps'+str(j),
        "provider":"ACTUAL",
        "owner":'ostro',
        "parameter":'wind'
        }
        filteredDataArray.append(obj)

# print(filteredDataArray)

collection.insert_many(filteredDataArray)
print('Total ',len(filteredDataArray),' documents inserted in forecasting database.')