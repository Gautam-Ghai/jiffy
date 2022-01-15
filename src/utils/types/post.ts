import { User } from "./user";
export interface Post {
  id?: number
  createdAt?: string
  updatedAt?: string
  title?: string
  description?: string
  video?: string
  gameId?: number
  game?: {
    name?: string,
    image?: string
  }
  authorId?: number
  author?: User
  likedBy?: User[]
  savedBy?: User[]
  comments?: any[] 
}