export enum DramaCategory {
  RELATIONSHIP = "relationship_roulette",
  SQUAD = "squad_wars",
  RUMOR = "rumor_radar",
  PUBERTY = "puberty_puzzles"
}

export interface DramaSubmission {
  content: string;
  category: DramaCategory;
  anonymous_author: string;
  created_at: string;
  valid_votes: number;
  school_id: string;
}

export interface QuestionOption {
  text: string;
  votes: number;
}

export interface Question {
  id: string;
  submission_id: string;
  question_text: string;
  options: QuestionOption[];
  correct_option_index?: number;
  category: DramaCategory;
  created_at: string;
  school_id: string;
}

export interface Player {
  id: string;
  nickname: string;
  school_id: string;
  points: number;
  title?: string;
  clout_coins: number;
  created_at: string;
}

export interface LeaderboardEntry {
  player_id: string;
  nickname: string;
  points: number;
  title: string;
  school_id: string;
  week_number: number;
}
