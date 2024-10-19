import { IResponse } from "@/types/response.type";
import { ApiService } from "../api.service";
import { IAllPassword } from "../password/password.dto";
import { ICurrentUser, ILoginDto, IMasterPassChangeDto } from "./user.dto";
import {
  IChangePasswordSchema,
  ILoginWithEmailSchema,
  ISignUpWithEmailSchema,
} from "./user.schema";

export const UserService = {
  loginWithEmail: async (schema: ILoginWithEmailSchema) => {
    const dto: ILoginDto = {
      email: schema.email,
      pass: schema.password,
    };
    const { data } = await ApiService.post<IResponse<ICurrentUser>>(
      "/auth/login",
      dto
    );

    return data;
  },
  getLoggedInUser: async () => {
    const { data } = await ApiService.get<Boolean>("/auth/is-loggedin");
    return data;
  },
  logoutUser: async () => {
    await ApiService.get("/auth/logout");
  },
  signUp: async (schema: ISignUpWithEmailSchema) => {
    const dto = {
      name: schema.name,
      email: schema.email,
      pass: schema.password,
    };
    const { data } = await ApiService.post<IResponse<ICurrentUser>>(
      "/auth/signup",
      dto
    );

    return data;
  },
  changeMasterPass: async (
    schema: IChangePasswordSchema,
    savedPass: IAllPassword[]
  ) => {
    const dto: IMasterPassChangeDto = {
      arr: savedPass.map((item) => {
        return {
          _id: item._id,
          password: item.password,
        };
      }),
      user: {
        oldPass: schema.oldPass,
        pass: schema.newPass,
      },
    };
    const { data } = await ApiService.put<IResponse<{ update: boolean }>>(
      "/pass/rest/all-pass",
      dto
    );
    return data;
  },
};
