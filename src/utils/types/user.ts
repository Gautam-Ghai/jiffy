export interface User {
    id: Number,
    name: String,
    email: String,
    emailVerified: Date,
    image: String,
    website: String,
    description: String,
    createdAt: Date,
    postsCount: Number,
    viewsCount: Number,
    followersCount: Number,
    followingCount: Number
}