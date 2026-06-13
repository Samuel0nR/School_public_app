from enum import Enum
from pydantic import BaseModel, Field
from datetime import datetime as DT, timezone
from typing import Optional

class NewsType(str, Enum):
  INFO = "INFO"
  URGENT = "URGENT"
  EVENT = "EVENT"


class News(BaseModel):
  autor_name: str
  title: str
  comments: str = Field(min_length=10, max_length=150)
  created_at: DT = DT.now(timezone.utc)
  type: NewsType = NewsType.INFO
  fixed: bool = False
  expires_at: Optional[DT] = None
