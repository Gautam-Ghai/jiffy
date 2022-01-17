import { Post } from "./post"

export interface User {
    id?: number,
    name?: string,
    email?: string,
    emailVerified?: null,
    image?: string,
    createdAt?: string,
    profileImage?: string,
    bannerImage?: string,
    website?: string,
    description?: string,
    likedPosts? : Post[]
    _count?: { posts?: number }
}