import subprocess
for i in range(21,27):
    date = '201911' + str(i)
    subprocess.Popen('python PushTemperature.py '+date)
