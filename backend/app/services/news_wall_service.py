from fastapi import HTTPException
from pymongo.errors import PyMongoError

from db.database import db

collection = db["news_wall"]


def get_news():
   try:
      news = list(collection.find())

      for n in news:
         n["_id"] = str(n["_id"])

   except PyMongoError as e:
      print("Error Mongo:", e)
      raise HTTPException(
         status_code=500,
         detail= f"Error al obtener noticias. {e._message}"
      )
   return news


def post_news(news: dict):
   try:
      result = collection.insert_one(news)
      return {
         "message": "Noticia creada",
         "id": str(result.inserted_id)
      }
   except PyMongoError as e:
      print("Error Mongo:", e)
      raise HTTPException(
         status_code=500,
         detail= f"Error al crear noticia. {e._message}"
      )
   
