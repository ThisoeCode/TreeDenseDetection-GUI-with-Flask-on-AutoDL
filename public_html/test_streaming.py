import time
import random
print('Random number spittin...')
"""
TEST
"""
j=0
k=9
while True:
    print("data: ['"+str(random.randint(10000, 999999))+"']", flush=True)
    time.sleep(1)
    j+=1
    if j>k:
        break
print('ENDSTREAM',flush=True)