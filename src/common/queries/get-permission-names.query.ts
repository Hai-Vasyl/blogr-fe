import { RequestMethods } from "../enums/request-method.enum";
import { BuilderType } from "./server-api-slice";

export const getPermissionNames = (builder: BuilderType) =>
  builder.query<string[], void>({
    query: () => ({
      url: "permissions/names",
      method: RequestMethods.GET,
    }),
  });
