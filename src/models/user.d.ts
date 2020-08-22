export interface User {
    email: string;
    token: string;
    name: string;
}

export interface UserSubmit {
    email: string;
    password: string;
}

export interface UserResponse {
    user: User;
}