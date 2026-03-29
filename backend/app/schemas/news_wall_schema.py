from pydantic import BaseModel, Field
from datetime import datetime as DT, timezone

class News(BaseModel):
   autor_name: str
   title: str
   comments: str = Field(min_length=10, max_length=150)
   created_at: DT = DT.now(timezone.utc)