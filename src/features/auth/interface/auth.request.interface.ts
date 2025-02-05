export interface LoginRequest {
    email: string;
    password: string;
}

export interface JoinRequest extends LoginRequest {}
