from pymongo import MongoClient

connection_url = "mongodb+srv://dbSamRM:RadezioX@pyhton-cluster.jbk1acq.mongodb.net/?appName=Pyhton-cluster"

client = MongoClient(connection_url)
db = client["school_python"]

