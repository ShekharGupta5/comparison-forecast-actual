from datetime import date
import os,shutil,sys


today = date.today().strftime('%Y%m%d')
today = '20200211'
os.system('python TurboExtractor_ECMWF.py '+today)

os.system('python PUSHDataECMWF.py '+today)
fileCreated = today+'ECMWF.xlsx'
shutil.move(fileCreated,'./Sheets Created/')


