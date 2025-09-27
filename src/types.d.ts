export {};

declare global {
  type ApiResponse<T> = {
    data: T;
  };

  type ApiErrorResponse = {
    message: string;
  };

  interface AuthUser {
    id: string;
    name: string;
    email: string;
    profile_picture_url?: string | null;
    created_at: string;
  }

  interface RegisterResponse {
    user: AuthUser;
    token: string;
  }

  interface LoginResponse {
    id: string;
    user: AuthUser;
    name: string;
    profile_picture_url: string;
    token: string;
  }

  interface PostData {
    title: string;
    content: string;
    image?: string;
  }
}
