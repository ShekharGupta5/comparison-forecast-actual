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

date_string = str(day)+'_'+str(month)+'_'+str(year)


baseDirectory = os.getcwd()
################# For GHI ##########################
ghiFilePath = os.path.join(baseDirectory,'Actual GHIParameter')
os.chdir(ghiFilePath)

os.system('python TransferWeatherParam.py '+date_string)
os.system('python PushActualGHIParameters.py '+date_string)

fileCreated = 'WEATHER_PARM_' + date_string+ '.xlsx'

shutil.move(fileCreated,'Pushed Sheets to DB/')


################### FOR OStro MPS #####################

ostroFilePath = os.path.join(baseDirectory,'Ostro Wind Speed')
os.chdir(ostroFilePath)

os.system('python TransferOstroParam.py '+date_string)
os.system('python PUSHDataActual.py '+date_string)

fileCreatedSolar = 'OSTRO_MPS_' + date_string + '.xlsx'

shutil.move(fileCreatedSolar,'PushedSheets to db/')



