from typing import Dict, List
from datetime import datetime, timedelta
import uuid

# In-memory database
drama_submissions: Dict[str, dict] = {}
questions: Dict[str, dict] = {}
players: Dict[str, dict] = {}
leaderboard: Dict[str, List[dict]] = {}  # school_id -> list of entries

def get_week_number() -> int:
    """Get the current week number for leaderboard resets"""
    return int((datetime.now() - datetime(2024, 1, 1)).days / 7)

def reset_weekly_leaderboard():
    """Reset leaderboard scores weekly but maintain player history"""
    current_week = get_week_number()
    for school_entries in leaderboard.values():
        for entry in school_entries:
            if entry["week_number"] < current_week:
                entry["points"] = 0
                entry["week_number"] = current_week

# Initialize with some generic offline questions
def init_offline_questions():
    generic_questions = [
        {
            "id": str(uuid.uuid4()),
            "question_text": "Your voice cracks during a presentation. Do you...",
            "options": [
                {"text": "Own it", "votes": 0},
                {"text": "Flee", "votes": 0},
                {"text": "Blame the mic", "votes": 0}
            ],
            "category": "puberty_puzzles",
            "created_at": datetime.now(),
            "school_id": "offline"
        }
    ]
    for q in generic_questions:
        questions[q["id"]] = q

init_offline_questions()
