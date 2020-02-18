from openpyxl import Workbook
from openpyxl import load_workbook
from datetime import timedelta, date,datetime
import pymongo
import os,shutil

myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
mydb = myclient['DataFetch']
collection = mydb['Humiditys']



fromdate = datetime(2020,2,9)
todate = datetime(2020,2,11)


folderFromDate = fromdate.strftime("%Y%m%d")
folderToDate = todate.strftime("%Y%m%d")

diff = (todate-fromdate).days + 1

while(fromdate <= todate):
    folderDate = fromdate.strftime("%Y%m%d")
    fromdate = fromdate + timedelta(days=1)

    baseName = 'wrf_other.' + folderDate + '00'
    CWD = os.path.join('D:\Software\Forecasting DB\IITM data\RE Stations Forecast Folder\Other',baseName)
    os.chdir(CWD)
    objectData = []
    for station in range(1,45):
        #print('Station number is ',station)
        if station < 10:
            stationName = 'output_Pstn0' + str(station) + '.csv'
        else:
            stationName = 'output_Pstn' + str(station) + '.csv'
        
        fyle = open(stationName)
        fileData = []
        for row in fyle:
            fileData.append(row)
        
        for mydata in range(75,171):
            # print('The value of d is ',mydata)
            dataParts = fileData[mydata].split(' ')
            dateValue = datetime.strptime(dataParts[0] +' '+ dataParts[1],"%d-%m-%Y %H:%M")
            dateValue = dateValue + timedelta(hours=5) + timedelta(minutes=30)
            try:
                data = float(dataParts[4].strip())
            except:
                data = 0
            
            obj = {
            "timestamp":dateValue,
            "value":data,
            "id": 'Station '+str(station),
            "provider":'IITM'
            }
            
            objectData.append(obj)

    collection.insert_many(objectData)
    print('Total ',len(objectData),' documents inserted in ','HumidityDb',' database. For ',folderDate)       