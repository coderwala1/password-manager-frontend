import { AxiosError } from "axios";
import { StatusCode } from "../constants/code.constant";
import { MessageConstant } from "../constants/message.constant";

export interface IErrorMessage {
  message: string;
}

export const ErrorUtil = {
  getErrorMessage: (error: AxiosError | Error): IErrorMessage => {
    if (error instanceof AxiosError) {
      // ! if 500 then show something went wrong, show a button to share error with MM team, open error screen
      if (error.response?.status === StatusCode.SERVER_ERROR) {
        return { message: MessageConstant.SOMETHING_WENT_WRONG };
      }
      if (error.code === AxiosError.ERR_NETWORK) {
        return { message: MessageConstant.NO_INTERNET };
      }
      if (error.code === AxiosError.ETIMEDOUT) {
        return { message: MessageConstant.SLOW_INTERNET };
      }
      if (error.code === AxiosError.ECONNABORTED) {
        return { message: MessageConstant.SLOW_INTERNET };
      }

      return { message: error?.message };
    }
    return { message: error?.message };
  },
  log: (name: string, error: unknown) => {
    // eslint-disable-next-line no-console
    console.log(name, error);
  },
};
