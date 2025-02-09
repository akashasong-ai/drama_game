from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from datetime import datetime

class DramaCategory(str, Enum):
    RELATIONSHIP = "relationship_roulette"
    SQUAD = "squad_wars"
    RUMOR = "rumor_radar"
    PUBERTY = "puberty_puzzles"

class DramaSubmission(BaseModel):
    content: str = Field(..., min_length=10, max_length=500)
    category: DramaCategory
    anonymous_author: str = Field(..., min_length=1, max_length=50)  # initials or role
    created_at: datetime = Field(default_factory=datetime.now)
    valid_votes: int = Field(default=0)
    school_id: str  # to prevent cross-school spying

class QuestionOption(BaseModel):
    text: str
    votes: int = Field(default=0)

class Question(BaseModel):
    id: str
    submission_id: str
    question_text: str
    options: List[QuestionOption]
    correct_option_index: Optional[int] = None  # Set after voting threshold
    category: DramaCategory
    created_at: datetime = Field(default_factory=datetime.now)
    school_id: str

class Player(BaseModel):
    id: str
    nickname: str
    school_id: str
    points: int = Field(default=0)
    title: Optional[str] = None
    clout_coins: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.now)

class LeaderboardEntry(BaseModel):
    player_id: str
    nickname: str
    points: int
    title: str
    school_id: str
    week_number: int  # For weekly resets
