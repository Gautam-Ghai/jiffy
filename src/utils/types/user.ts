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
    _count?: { 
        posts?: number
        followers?: number
        following?: number
    },
    user:{
        image?: string
    },
    socialMedia?:{
        discord?: string,
        facebook?: string,
        instagram?: string,
        tiktok?: string,
        twitch?: string,
        twitter?: string
    }
}