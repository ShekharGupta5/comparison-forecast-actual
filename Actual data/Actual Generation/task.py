import subprocess
for i in range(12,16):
    if(i<10):
        dte = '0' + str(i)
    else:
        dte = str(i)
    date =  dte +'_12_2019'
    subprocess.Popen('python PushGenerationAll.py '+date)
