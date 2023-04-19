import { Genders } from "../../components/form-auth/gender.enum"
import { RequestMethods } from "../enums/request-method.enum"
import { BuilderType } from "./server-api-slice"

interface GetUserResponse {
  avatar: string
  bio: string
  birth: Date
  color: string
  email: string
  firstName: string
  lastName: string
  gender: Genders
  role: string
  userId: string
}

export const getUser = (builder: BuilderType) =>
  builder.query<GetUserResponse, string>({
    query: (userId) => ({
      url: `users/${userId}`,
      method: RequestMethods.GET,
    }),
  })
