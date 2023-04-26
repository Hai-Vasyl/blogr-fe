import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { loginUser } from "./login-user.mutation";
import { registerUser } from "./register-user.mutation";
import { getUser } from "./get-user.query";
import { getPermissions } from "./get-permissions.query";
import { getPermissionNames } from "./get-permission-names.query";
import { createPermission } from "./create-permission.mutation";

export type BuilderType = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  never,
  "api"
>;

export const serverApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_SERVER_URL,
    prepareHeaders(headers) {
      const auth = localStorage.getItem("auth");
      if (!auth) {
        return headers;
      }

      const token = JSON.parse(auth).token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: loginUser(builder),
    registerUser: registerUser(builder),
    getUser: getUser(builder),
    getPermissions: getPermissions(builder),
    getPermissionNames: getPermissionNames(builder),
    createPermission: createPermission(builder),
  }),
});
