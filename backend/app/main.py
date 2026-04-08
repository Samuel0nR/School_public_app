from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import news_wall

app = FastAPI()
app.include_router(news_wall.router)

app.add_middleware(
   CORSMiddleware,
   allow_origins=["*"],
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"]
)