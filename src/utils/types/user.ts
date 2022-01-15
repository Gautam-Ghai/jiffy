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
    _count?: { posts?: number }
}