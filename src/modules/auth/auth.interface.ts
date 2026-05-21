export interface TSignupUser {
  name: string;
  email: string;
  password: string;
  role: "contributor" | "maintainer";
}

export interface TLoginUser {
  email: string;
  password: string;
}