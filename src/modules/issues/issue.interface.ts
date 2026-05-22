export interface TCreateIssue {
  title: string;
  description: string;
  type: "bug" | "feature_request";
}