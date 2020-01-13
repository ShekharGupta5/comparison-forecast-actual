import os,shutil
from datetime import datetime
import sys

# date = datetime.now()
# year = date.year
# month = date.month
# day = date.day
# if(day<10):
#     day = '0'+str(day)
# if(month<10):
#     month = '0'+str(month)

# date_string = str(day)+'_'+str(month)+'_'+str(year)
date_string = sys.argv[1]
fileName = "OSTRO_MPS_" + date_string + '.csv'
RemoteFilePath = '\\\\10.2.100.51\scada\Reports\Renewable_MPS\OSTRO'
files = os.listdir(RemoteFilePath)

fileFound = False
for f in files:
    if(f == fileName):
        localFileName = os.path.join('D:\Software\Forecasting DB\Actual data\Actual Weather Parameter\Ostro Wind Speed',fileName)
        shutil.copyfile(RemoteFilePath+'\\'+f,localFileName)
        fileFound = True
    

if(not fileFound):
    print('File is not present in scada 51 server.')
