export interface UserResponse {
  readonly username: string,
  readonly firstname: string,
  readonly lastname: string,
  readonly gender: number,
  readonly dob: Date,
  readonly avatar: string,
  readonly created_at: Date,
  readonly roles: number[],
  readonly positions: number[]
}  

export interface AuthPayload {
  readonly username: string;
}

export interface AuthResponse extends UserResponse {
  readonly token: string;
}
