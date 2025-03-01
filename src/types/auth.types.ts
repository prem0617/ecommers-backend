export interface User {
  name?: string;
  _id?: string;
  email: string;
  password: string;
  role: "user" | "admin";
}
