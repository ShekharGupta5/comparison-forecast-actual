from openpyxl import Workbook
from openpyxl import load_workbook
from datetime import datetime
import pymongo
import sys


myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
mydb = myclient['ForecastingDB']
collection = mydb['forecastings']

date = sys.argv[1]

path =  'OSTRO_MPS_' + date+ '.xlsx'

wb = load_workbook(path)
ws = wb.active
allData = []

for col in range(2,ws.max_column+1):
    lid = ws.cell(2,col).value   
    for row in range(3,ws.max_row):
        timestamp = ws.cell(row,1).value
        date = datetime.strptime(timestamp,"%d-%m-%Y %H:%M:%S")
        data = ws.cell(row,col).value
        obj = {
        "timestamp":date,
        "value":data,
        "id":lid,
        "provider":"ACTUAL",
        "owner":'ostro',
        "parameter":'wind'
        }
        allData.append(obj)
        

collection.insert_many(allData)
print('Total ',len(allData),' documents inserted in forecasting database.')