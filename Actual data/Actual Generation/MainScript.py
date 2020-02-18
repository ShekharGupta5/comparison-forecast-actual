from datetime import datetime,timedelta
import os,shutil

date = datetime.now() - timedelta(days=1)

year = date.year
month = date.month
day = date.day
if(day<10):
    day = '0'+str(day)
if(month<10):
    month = '0'+str(month)

try:
    date_string = sys.argv[1]
except:
    date_string = str(day)+'_'+str(month)+'_'+str(year)

# date_string = '02_02_2020'

os.system('python ActualGenerationTransfer.py '+date_string)
os.system('python PushGenerationAll.py '+date_string)
fileCreated = 'RENEWABLE_CS_' + date_string+ '.xlsx'

shutil.move(fileCreated,'./PushedSheets to db/')


