export const LoginPagePathKey = "login_path";

export interface UserAuth {
  name: string;
  given_name: string;
  family_name: string;
  nickname: string;
  picture: string;
  locale: string;
  updated_at: string;
  sub: string;
}
