from datetime import timedelta, datetime as DT, timezone

from fastapi import HTTPException
from pymongo.errors import PyMongoError

from app.db.database import db

collection = db["news_wall"]

TTL_CONFIG_TYPE = {
  "INFO": timedelta(hours=24),
  "URGENT": timedelta(hours=48),
  "EVENT": timedelta(days=7),
}

def get_news():
   try:
      # Ordenados del más reciente al más antiguo, fijados primero
      news = list(
          collection.find().sort([("fijado", -1), ("created_at", -1)])
      )

      for n in news:
        n["_id"] = str(n["_id"])

   except PyMongoError as e:
      raise HTTPException(
        status_code=500,
        detail= f"Error al obtener noticias. {e._message}"
      )

   return news


def post_news(news: dict):
  try:
    if news.get("fixed"):
      news["expires_at"] = None
    else:
      tipo = news.get("type", "INFO")
      news["expires_at"] = DT.now(timezone.utc) + TTL_CONFIG_TYPE[tipo]

    result = collection.insert_one(news)
    
    return {
      "message": "Noticia creada",
      "id": str(result.inserted_id)
    }
  
  except PyMongoError as e:
    raise HTTPException(
      status_code=500,
      detail= f"Error al crear noticia. {e._message}"
    )
   

def delete_news(news_id: str):
    try:
        from bson import ObjectId
        result = collection.delete_one({"_id": ObjectId(news_id)})
        
        if result.deleted_count == 0:
          raise HTTPException(status_code=404, detail="Comunicado no encontrado")
        
        return {"message": "Comunicado eliminado"}
    
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar. {e._message}")