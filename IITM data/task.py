import subprocess
for i in range(26,28):
    date = '201911' + str(i)
    subprocess.Popen('python ReadOtherCSV.py '+date)
