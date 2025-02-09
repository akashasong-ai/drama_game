import React, { useState } from 'react';
import { Question } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface QuestionCardProps {
  question: Question;
  onVote: (optionIndex: number) => void;
  disabled?: boolean;
}

export function QuestionCard({ question, onVote, disabled }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleVote = (index: number) => {
    if (disabled) return;
    setSelectedOption(index);
    onVote(index);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'relationship_roulette': return 'Relationship Roulette';
      case 'squad_wars': return 'Squad Wars';
      case 'rumor_radar': return 'Rumor Radar';
      case 'puberty_puzzles': return 'Puberty Puzzles';
      default: return category;
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <Badge variant="secondary" className="mb-2 self-start">
          {getCategoryLabel(question.category)}
        </Badge>
        <CardTitle className="text-lg">{question.question_text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === index ? "default" : "outline"}
            className="w-full justify-start text-left"
            onClick={() => handleVote(index)}
            disabled={disabled}
          >
            {option.text}
            {question.correct_option_index !== undefined && (
              <Badge variant={question.correct_option_index === index ? "success" : "secondary"} className="ml-2">
                {option.votes} votes
              </Badge>
            )}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
