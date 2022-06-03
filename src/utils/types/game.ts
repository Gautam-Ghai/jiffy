import { Post } from "./post"

export interface Game {
    id: number,
    name: string,
    logoImage: string
}

export interface GameWithPosts {
    _count?:{
        posts?: number,
        userFollows?: number
    },
    posts?: Post[]
    id?: number,
    name?: string,
    coverImage: string
    logoImage: string
    genre?: any
    releaseDate?: any
}

export interface GameCard {
    _count?:{
        posts?: number,
        userFollows?: number
    },
    id?: number,
    name?: string,
    coverImage: string
    logoImage: string
    genre?: any
    releaseDate?: any
}