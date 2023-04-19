import { RequestMethods } from "../enums/request-method.enum"
import { BuilderType } from "./server-api-slice"

interface LoginUserRequest {
  email: string
  password: string
}

interface LoginUserResponse {
  token: string
  sub: string
}

export const loginUser = (builder: BuilderType) =>
  builder.mutation<LoginUserResponse, LoginUserRequest>({
    query: (body) => ({
      url: "users/login",
      method: RequestMethods.POST,
      body,
    }),
  })
