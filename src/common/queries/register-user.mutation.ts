import { Genders } from "../../components/form-auth/gender.enum";
import { RequestMethods } from "../enums/request-method.enum";
import { BuilderType } from "./server-api-slice";

interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  gender: Genders;
  email: string;
  password: string;
}

export const registerUser = (builder: BuilderType) =>
  builder.mutation<void, RegisterUserRequest>({
    query: (body) => ({
      url: "users",
      method: RequestMethods.POST,
      body,
    }),
  });
