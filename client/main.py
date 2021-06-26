from time import sleep
import os, threading, subprocess
import dotenv
import pymongo
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
dotenv.load_dotenv(dotenv_path)

refreshInterval = int(os.getenv("REFRESH_INTERVALL", "30"))
dbUrl = os.getenv("DB_URL", "mongodb://db:2701/")
nodeName = os.getenv("NODE_NAME", "docker0")

os.makedirs("keys", exist_ok=True)

#hostsCollection = pymongo.MongoClient(dbUrl)["tunnlr"]["hosts"]

all_procs = dict()

print("Started")

def monitor_process(host_id, proc):
    for line in iter(proc.stdout.readline, b''):
        print(f"{host_id}: {line.decode('utf-8')}", end='')
    print(f"{host_id}: Exited")
    del all_procs[host_id]

def init_process(host_id, lastChanged, cmd):
    global all_procs
    proc = subprocess.Popen(cmd,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT)
    t = threading.Thread(target=monitor_process, args=(host_id, proc))
    t.start()
    print(f"Started {host_id}: {' '.join(cmd)}")
    all_procs[host_id] = {
        "lastChanged": lastChanged,
        "proc": proc
    }

def generate_cmd(host):
    f = open(f"keys/{host['_id']}", "w")
    f.writelines(host["identity"])
    f.close()
    cmd = ["autossh", "-M", "0", "-o", "ConnectTimeout=10", "-o", "ServerAliveInterval=60", "-o", "ServerAliveCountMax=2", "-p", str(host["port"]) ,"-N", "-i", f"keys/{host['_id']}"]
    for port in host["ports"]:
        cmd += ["-R", f"{port['remotePort']}:{port['localHostname']}:{port['localPort']}"]
        
    cmd += [f"{host['username']}@{host['hostname']}"]
    return cmd

def check_for_change():
    #all_hosts = hostsCollection.find({})
    all_hosts = [
        {
            "_id": "hostId",
            "lastChanged": "gestern",
            "identity": "asdsd",
            "username": "u",
            "hostname": "localhost",
            "port": 22,
            "ports": [
                {
                    "remotePort": 80,
                    "localHostname": "localhost",
                    "localPort": 80,
                }
            ]
        }
    ]
    for host in all_hosts:
        host["_id"] = str(host["_id"])
        if not all_procs.get(host["_id"]):
            yield host
            continue
        if host["lastChanged"] != all_procs[host["_id"]]["lastChanged"]:
            proc = all_procs[host["_id"]]["proc"]
            proc.terminate()
            try:
                proc.wait(timeout=0.2)
                print (f'{host["_id"]} changed subprocess exited ', proc.returncode)
            except subprocess.TimeoutExpired:
                print(f'{host["_id"]} subprocess killed violently')
            del all_procs[host["_id"]]
            yield host

def main():
    while True:
        for host in check_for_change():
            cmd = generate_cmd(host)
            threading.Thread(target=init_process, args=(host["_id"], host["lastChanged"], cmd)).start()
        sleep(refreshInterval)

main()