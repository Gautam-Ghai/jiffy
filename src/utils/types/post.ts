import { User } from "./user";
export interface Post {
  id: String
  createdAt: Date
  updatedAt: Date
  likesCount: Number
  commentsCount: Number
  viewsCount: Number
  sharesCount: Number
  video: String
  author?: User
  game: Game
}

interface Game {
    Valorant: String
    LeagueOfLegends: String
    RocketLeague: String
    ApexLegends: String
}