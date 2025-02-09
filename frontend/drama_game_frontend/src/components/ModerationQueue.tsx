import React from 'react';
import { DramaSubmission } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ModerationQueueProps {
  submissions: DramaSubmission[];
  onApprove: (submission: DramaSubmission) => void;
  onReject: (submission: DramaSubmission) => void;
}

export function ModerationQueue({ submissions, onApprove, onReject }: ModerationQueueProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Moderation Queue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {submissions.map((submission) => (
          <Card key={submission.created_at}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline">{submission.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  By: {submission.anonymous_author}
                </span>
              </div>
              <p className="mb-4">{submission.content}</p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReject(submission)}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => onApprove(submission)}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
