from datetime import datetime
import os,shutil

date = datetime.now()
year = date.year
month = date.month
day = date.day
if(day<10):
    day = '0'+str(day)
if(month<10):
    month = '0'+str(month)

date_string = str(day)+'_'+str(month)+'_'+str(year)


os.system('python ActualGenerationTransfer.py '+date_string)
os.system('python PushGenerationAll.py '+date_string)

fileCreated = 'RENEWABLE_CS_' + date_string+ '.xlsx'

shutil.move(fileCreated,'./PushedSheets to db/')


