interface Leaderboard {
  id: number
}

interface Achievement {
  achievement: string
  game: string
  lastUpdated: string
  percentCompleted: number
}

interface AchievementData {
  achievements: Array<Achievement>
}


declare class GameCenter {
  loadAchievements(): Promise<{ achievements: Array<Achievement> }>

  updateAchievement(achievement: Achievement): Promise<{ achievement: Achievement }>

  startGame(): Promise<void>

  endGame(): Promise<void>

  report(option: string, value: unknown): Promise<void>

  submitScore(score: number): Promise<void>

  getHighScore(): Promise<{ highscore: number }>

  share(message: string): Promise<void>

  loadLeaderboards(): Promise<Array<Leaderboard>>
}

export class GameCenterModule {
  public shared(moduleID: string): GameCenter
}
