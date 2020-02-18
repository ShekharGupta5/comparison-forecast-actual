from openpyxl import Workbook
from openpyxl import load_workbook
from datetime import timedelta, date,datetime
import pymongo
import os,shutil

myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
mydb = myclient['DataFetch']
collection = mydb['RainRateSolars']



fromdate = datetime(2020,2,9)
todate = datetime(2020,2,11)


folderFromDate = fromdate.strftime("%Y%m%d")
folderToDate = todate.strftime("%Y%m%d")

diff = (todate-fromdate).days + 1

while(fromdate <= todate):
    folderDate = fromdate.strftime("%Y%m%d")
    fromdate = fromdate + timedelta(days=1)

    baseName = 'wrf_solar.' + folderDate + '00'
    CWD = os.path.join('D:\Software\Forecasting DB\IITM data\RE Stations Forecast Folder\Solar',baseName)
    os.chdir(CWD)
    objectData = []
    for station in range(1,45):
        # print('Station number is ',station)
        stationName = 'station_' + str(station) + '.csv'
        fyle = open(stationName)
        fileData = []
        for row in fyle:
            fileData.append(row)
        
        for mydata in range(75,171):
            # print('The value of d is ',mydata)
            dataParts = fileData[mydata].split(',')
            timeStampParts = dataParts[0].split(' ')
            dateValue = datetime.strptime(timeStampParts[0] +' '+ timeStampParts[1],"%d-%m-%Y %H:%M")
            dateValue = dateValue + timedelta(hours=5) + timedelta(minutes=30)

            data = float(dataParts[7].strip())
            
            obj = {
            "timestamp":dateValue,
            "value":data,
            "id": 'Station '+str(station),
            "provider":'IITM'
            }

            objectData.append(obj)

    collection.insert_many(objectData)
    print('Total ',len(objectData),' documents inserted in ','TemperatureSolars',' database. For ',folderDate)       