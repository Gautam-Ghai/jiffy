export interface Session {
    user: {
        id: number
        name: string
        email: string
        image: string
        profileImage: string
    },
    expires: string
}