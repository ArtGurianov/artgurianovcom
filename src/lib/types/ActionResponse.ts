import { NonUndefined } from "./NonUndefined";

export interface ActionResponse {
  success: boolean;
  data: NonUndefined<any>;
  errorMessage: string | null;
}
