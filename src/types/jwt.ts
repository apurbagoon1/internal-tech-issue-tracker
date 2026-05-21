export interface TJwtPayload {
  id: number;
  name: string;
  role: "contributor" | "maintainer";
}