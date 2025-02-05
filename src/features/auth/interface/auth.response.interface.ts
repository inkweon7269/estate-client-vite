export interface UserProfileResponse {
    id: number;
    createdAt: string;
    email: string;
}

export interface JoinResponse {
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse extends JoinResponse {}
