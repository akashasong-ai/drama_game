import React, { useState, useEffect } from 'react';
import { DramaSubmissionForm } from './components/DramaSubmissionForm';
import { QuestionCard } from './components/QuestionCard';
import { Leaderboard } from './components/Leaderboard';
import { ModerationQueue } from './components/ModerationQueue';
import { DramaCategory, Question, LeaderboardEntry, DramaSubmission } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Camera, Share2 } from 'lucide-react';

// TODO: Replace with environment variable
const API_URL = 'http://localhost:8000/api/v1';
const MOCK_SCHOOL_ID = 'school-123';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [submissions, setSubmissions] = useState<DramaSubmission[]>([]);
  const [predictions, setPredictions] = useState<{ question: string; options: string[] }[]>([
    { question: "Will the principal cancel prom?", options: ["Yes", "No"] },
    { question: "Who will win Class President?", options: ["Student A", "Student B", "Student C"] }
  ]);
  const [cloutCoins, setCloutCoins] = useState(0);

  useEffect(() => {
    // Load initial data
    fetchQuestions();
    fetchLeaderboard();
    fetchSubmissions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/questions/${MOCK_SCHOOL_ID}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_URL}/leaderboard/${MOCK_SCHOOL_ID}`);
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${API_URL}/submissions/${MOCK_SCHOOL_ID}`);
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    }
  };

  const handleSubmission = async (submission: { content: string; category: DramaCategory; anonymous_author: string }) => {
    try {
      const response = await fetch(`${API_URL}/submissions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...submission, school_id: MOCK_SCHOOL_ID }),
      });
      if (response.ok) {
        fetchSubmissions();
        // Award clout coins for submission
        setCloutCoins(prev => prev + 5);
      }
    } catch (error) {
      console.error('Failed to submit drama:', error);
    }
  };

  const handleVote = async (questionId: string, optionIndex: number) => {
    try {
      await fetch(`${API_URL}/vote/${questionId}/${optionIndex}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_id: 'mock-player-id' }),
      });
      fetchQuestions();
      // Award clout coins for voting
      setCloutCoins(prev => prev + 1);
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const handlePrediction = async (predictionIndex: number, choice: string) => {
    // In a real app, this would be persisted to the backend
    console.log(`Prediction made for "${predictions[predictionIndex].question}": ${choice}`);
    // Award clout coins for making a prediction
    setCloutCoins(prev => prev + 2);
  };

  const handleMemeCreate = async (questionId: string) => {
    // In a real app, this would open a meme creator interface
    console.log(`Creating meme for question ${questionId}`);
    // Award clout coins for creating a meme
    setCloutCoins(prev => prev + 3);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Drama Detectives: School Edition</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">🪙 {cloutCoins} Clout Coins</span>
        </div>
      </header>
      
      <Tabs defaultValue="play" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="play">Play</TabsTrigger>
          <TabsTrigger value="submit">Submit</TabsTrigger>
          <TabsTrigger value="predict">Predictions</TabsTrigger>
          <TabsTrigger value="memes">Memes</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="moderate">Moderate</TabsTrigger>
        </TabsList>

        <TabsContent value="play" className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="space-y-2">
              <QuestionCard
                question={question}
                onVote={(optionIndex) => handleVote(question.id, optionIndex)}
                disabled={question.correct_option_index !== undefined}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMemeCreate(question.id)}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Create Meme
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="submit">
          <DramaSubmissionForm onSubmit={handleSubmission} />
        </TabsContent>

        <TabsContent value="predict" className="space-y-4">
          {predictions.map((prediction, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{prediction.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {prediction.options.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    className="w-full"
                    onClick={() => handlePrediction(index, option)}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="memes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meme Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select a drama update to turn into a meme! Coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Leaderboard entries={leaderboard} />
        </TabsContent>

        <TabsContent value="moderate">
          <ModerationQueue
            submissions={submissions}
            onApprove={async (submission) => {
              // TODO: Implement moderation approval
              console.log('Approve:', submission);
            }}
            onReject={async (submission) => {
              // TODO: Implement moderation rejection
              console.log('Reject:', submission);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App
