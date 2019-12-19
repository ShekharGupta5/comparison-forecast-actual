from ftplib import FTP
from datetime import datetime
import os,sys
ftp = FTP('scheduling.wrldc.in')
ftp.login('weatherdata','wrldc@123')

# date = datetime.now().strftime("%Y%m%d")
date = sys.argv[1]

latest_folder_other = 'wrf_other.' + date + '00'
latest_folder_solar = 'wrf_solar.' + date + '00'
# print(latest_folder_other,latest_folder_solar)

ftp.cwd(latest_folder_solar)
files = ftp.nlst()

#create new directory

################# SOlAR Directory
os.mkdir(os.path.join('D:/Software/Forecasting DB/IITM data/RE Stations Forecast Folder/Solar',latest_folder_solar))

################## Other Directory
os.mkdir(os.path.join('D:/Software/Forecasting DB/IITM data/RE Stations Forecast Folder/Other',latest_folder_other))

for f in files:
    local_file_name = os.path.join('D:/Software/Forecasting DB/IITM data/RE Stations Forecast Folder/Solar',latest_folder_solar ,f)  
    ftp.retrbinary("RETR "+f,open(local_file_name,'wb').write)

################################ for other cwd needs to be changed
ftp.cwd('../')
ftp.cwd(latest_folder_other)
files = ftp.nlst()

for f in files:
    local_file_name = os.path.join('D:/Software/Forecasting DB/IITM data/RE Stations Forecast Folder/Other',latest_folder_other ,f)  
    ftp.retrbinary("RETR "+f,open(local_file_name,'wb').write)



ftp.quit()