import { RequestMethods } from "../enums/request-method.enum"
import { BuilderType } from "./server-api-slice"

interface GetPermissionsResponse {
  creator: string
  description: string
  name: string
  permissionId: string
}

interface GetPermissionsRequest {
  skip: number
  take: number
}

export const getPermissions = (builder: BuilderType) =>
  builder.query<GetPermissionsResponse[], GetPermissionsRequest>({
    query: ({ skip, take }) => ({
      url: `permissions?skip=${skip}&take=${take}`,
      method: RequestMethods.GET,
    }),
  })
