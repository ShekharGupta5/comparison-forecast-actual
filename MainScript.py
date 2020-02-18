from datetime import date
import os,shutil,sys


year = '2020'
month = '01'
day = '24'

iitm_date_string = year+month+day
weather_date_string = day+'_'+month+'_'+year


os.chdir('D:\Software\Forecasting DB\IITM Data')
os.system('python MainScript.py '+iitm_date_string)

os.chdir('D:\Software\Forecasting DB\Actual data\Actual Generation')
os.system('python MainScript.py '+weather_date_string)

os.chdir('D:\Software\Forecasting DB\Actual data\Actual Weather Parameter')
os.system('python MainScript.py '+weather_date_string)

