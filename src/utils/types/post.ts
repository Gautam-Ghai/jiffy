export interface Post {
    
  id: String
  createdAt: Date
  updatedAt: Date
  likes: Number
  comments: Number
  views: Number
  shares: Number
  video: String
  username: String
  game: Game
}

interface Game {
    Valorant: String
    LeagueOfLegends: String
    RocketLeague: String
    ApexLegends: String
}