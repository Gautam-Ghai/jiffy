import { Post } from "./post"

export interface Game {
    id: number,
    name: string,
    logoImage: string
}

export interface GameWithPosts {
    _count?:{
        posts?: number
    },
    posts?: Post[]
    id?: number,
    name?: string,
    profileImage?: string,
    coverImage: string
    genre?: any
    releaseDate?: any
}