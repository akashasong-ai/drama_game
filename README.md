# drama_game - Drama Detectives: School Edition

A dynamic, user-generated trivia game where players test their knowledge of real-time school gossip, social shifts, and teen life. The game evolves with the school's drama, letting students brag about their social savvy via a live leaderboard.

## Core Features

### 1. Player-Submitted "Tea" (Drama Updates)
- Anonymous submission of brief school event updates
- Auto-conversion into multiple-choice questions
- Crowd-sourced answer validation

### 2. Real-Time Leaderboard
- Points system based on speed and accuracy
- Weekly resets for fresh competition
- Special titles for top players (e.g., "Gossip Monarch")

### 3. Drama Categories
- Relationship Roulette: Dating updates
- Squad Wars: Friend-group drama
- Rumor Radar: Unverified gossip
- Puberty Puzzles: Growing-up scenarios

### 4. Safety & Moderation
- Anonymized submissions using initials/roles
- Content flagging system
- Teacher/Admin oversight options

## Technical Requirements

### Frontend
- React/Next.js for web interface
- Mobile-responsive design
- Real-time updates using WebSocket

### Backend
- School-specific servers
- Secure user authentication
- Data persistence for leaderboards
- Moderation queue system

### Mobile Support
- Progressive Web App (PWA)
- iOS/Android compatibility
- Offline mode support

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Next.js pages
├── styles/        # CSS/styling files
├── utils/         # Helper functions
└── types/         # TypeScript type definitions
```

## Safety Guidelines

- No real names in submissions
- Content moderation before publishing
- Automatic filtering of inappropriate content
- Rate limiting for submissions
- User reporting system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License
>>>>>>> b56fad8 (docs: initial README with project requirements and setup instructions)
