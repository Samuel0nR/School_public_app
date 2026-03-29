from fastapi import FastAPI

from routes import news_wall

app = FastAPI()
app.include_router(news_wall.router)
