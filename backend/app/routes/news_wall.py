from fastapi import APIRouter

from schemas.news_wall_schema import News
from services.news_wall_service import get_news, post_news

router = APIRouter(
   prefix="/news",
   tags=["news_wall"]
)

@router.get("/", operation_id="get_news")
def get_all():
   return get_news()

@router.post("/", operation_id="post_news")
def new_request(news: News):
   resp = post_news(news.model_dump())
   return resp