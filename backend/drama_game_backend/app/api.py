from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from .models import (
    DramaSubmission,
    Question,
    Player,
    LeaderboardEntry,
    DramaCategory
)
from .database import (
    drama_submissions,
    questions,
    players,
    leaderboard,
    get_week_number,
    reset_weekly_leaderboard
)
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/submissions/", response_model=DramaSubmission)
async def create_submission(submission: DramaSubmission):
    """Create a new drama submission"""
    submission_id = str(uuid.uuid4())
    drama_submissions[submission_id] = submission.dict()
    return submission

@router.get("/submissions/{school_id}", response_model=List[DramaSubmission])
async def get_submissions(
    school_id: str,
    category: Optional[DramaCategory] = None,
    valid_only: bool = True
):
    """Get drama submissions for a school"""
    filtered = [
        s for s in drama_submissions.values()
        if s["school_id"] == school_id
        and (not valid_only or s["valid_votes"] >= 10)
        and (not category or s["category"] == category)
    ]
    return filtered

@router.post("/questions/", response_model=Question)
async def create_question(submission_id: str):
    """Convert a submission to a question"""
    if submission_id not in drama_submissions:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    submission = drama_submissions[submission_id]
    if submission["valid_votes"] < 10:
        raise HTTPException(status_code=400, detail="Not enough valid votes")
    
    question_id = str(uuid.uuid4())
    question = Question(
        id=question_id,
        submission_id=submission_id,
        question_text=submission["content"],
        options=[],  # To be filled by moderator
        category=submission["category"],
        school_id=submission["school_id"]
    )
    questions[question_id] = question.dict()
    return question

@router.get("/questions/{school_id}", response_model=List[Question])
async def get_questions(
    school_id: str,
    category: Optional[DramaCategory] = None
):
    """Get questions for a school"""
    school_questions = [
        q for q in questions.values()
        if q["school_id"] in [school_id, "offline"]
        and (not category or q["category"] == category)
    ]
    return school_questions

@router.post("/players/", response_model=Player)
async def create_player(nickname: str, school_id: str):
    """Create a new player"""
    player_id = str(uuid.uuid4())
    player = Player(
        id=player_id,
        nickname=nickname,
        school_id=school_id
    )
    players[player_id] = player.dict()
    return player

@router.get("/leaderboard/{school_id}", response_model=List[LeaderboardEntry])
async def get_leaderboard(school_id: str):
    """Get the leaderboard for a school"""
    reset_weekly_leaderboard()  # Check and reset if needed
    return leaderboard.get(school_id, [])

@router.post("/vote/{question_id}/{option_index}")
async def vote_for_option(
    question_id: str,
    option_index: int,
    player_id: str
):
    """Vote for a question option"""
    if question_id not in questions:
        raise HTTPException(status_code=404, detail="Question not found")
    
    question = questions[question_id]
    if option_index >= len(question["options"]):
        raise HTTPException(status_code=400, detail="Invalid option index")
    
    question["options"][option_index]["votes"] += 1
    
    # Update correct answer if threshold reached
    total_votes = sum(opt["votes"] for opt in question["options"])
    if total_votes >= 10 and question["correct_option_index"] is None:
        max_votes = max(opt["votes"] for opt in question["options"])
        question["correct_option_index"] = next(
            i for i, opt in enumerate(question["options"])
            if opt["votes"] == max_votes
        )
    
    return {"status": "success"}
