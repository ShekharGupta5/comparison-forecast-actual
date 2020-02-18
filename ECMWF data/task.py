import subprocess
for i in range(27,32):
    date = '202001' + str(i)
    subprocess.Popen('python PUSHDataECMWF.py '+date)
