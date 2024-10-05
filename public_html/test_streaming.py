import time
import random
print('Random number spittin...')
"""
TEST
"""
j=0
k=3
while True:
    print('data: '+str(random.randint(10000, 99999)), flush=True)
    time.sleep(1)
    j+=1
    if j>k:
        break
print('ENDSTREAM',flush=True)