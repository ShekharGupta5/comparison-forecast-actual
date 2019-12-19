from datetime import date
import os,shutil
today =  date.today().strftime('%Y%m%d')

os.system('python IITMFTPTransfer.py '+today)
os.system('python PUSH_IITM_Solar.py '+today)
os.system('python TurboExtractor_IITM.py '+today)
os.system('python PUSHDataIITM.py '+today)
fileCreated = today+'IITM.xlsx'
shutil.move(fileCreated,'./Generated Sheets/')


