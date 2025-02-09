import React, { useState } from 'react';
import { DramaCategory } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface DramaSubmissionFormProps {
  onSubmit: (submission: { content: string; category: DramaCategory; anonymous_author: string }) => void;
}

export function DramaSubmissionForm({ onSubmit }: DramaSubmissionFormProps) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<DramaCategory>(DramaCategory.RELATIONSHIP);
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ content, category, anonymous_author: author });
    setContent('');
    setAuthor('');
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Submit Your Tea ☕</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Select value={category} onValueChange={(value) => setCategory(value as DramaCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DramaCategory.RELATIONSHIP}>Relationship Roulette</SelectItem>
                <SelectItem value={DramaCategory.SQUAD}>Squad Wars</SelectItem>
                <SelectItem value={DramaCategory.RUMOR}>Rumor Radar</SelectItem>
                <SelectItem value={DramaCategory.PUBERTY}>Puberty Puzzles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              placeholder="Your initials or role (e.g., 'Band Kid', 'JD')"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={50}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="What's the tea? (e.g., 'Couple Alert: J & M split after the football game. Who started the drama?')"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
              maxLength={500}
              required
            />
          </div>
          <Button type="submit" className="w-full">Spill the Tea</Button>
        </form>
      </CardContent>
    </Card>
  );
}
