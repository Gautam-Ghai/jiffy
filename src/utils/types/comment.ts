import { User } from "./user";

export interface Comment {
    content?: string
    createdAt?: string
    authorId?: number
    author?: User
}