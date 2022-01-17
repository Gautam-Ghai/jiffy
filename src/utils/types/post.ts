import { User } from "./user";
export interface Post {
  id?: number
  createdAt?: string
  updatedAt?: string
  title?: string
  description?: string
  url?: string
  publicId?: string
  gameId?: number
  game?: {
    name?: string,
    image?: string
  },
  _count?: {
    likedBy?: number,
    comments?: number
  }
  authorId?: number,
  author?: User
  likedBy?: User[]
  savedBy?: User[]
  comments?: any[] 
}