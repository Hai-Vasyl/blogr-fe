import { RequestMethods } from "../enums/request-method.enum";
import { BuilderType } from "./server-api-slice";

interface CreatePermissionRequest {
  name: string;
  description: string;
}

export const createPermission = (builder: BuilderType) =>
  builder.mutation<void, CreatePermissionRequest>({
    query: (body) => ({
      url: "permissions",
      method: RequestMethods.POST,
      body,
    }),
  });
