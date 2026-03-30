from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

connection_url = os.getenv("DB_CONNCT")

client = MongoClient(connection_url)
db = client["school_python"]

