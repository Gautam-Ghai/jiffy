import { Post } from "./post"

export interface User {
    id?: number,
    username?: string,
    createdAt?: string,
    profileImage?: string,
    profileImageId?: string,
    bannerImage?: string,
    bannerImageId?: string,
    website?: string,
    description?: string,
    likedPosts? : Post[]
    _count?: { posts?: number },
    user:{
        image?: string
    }
}