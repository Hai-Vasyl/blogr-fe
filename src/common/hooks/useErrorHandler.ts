import { useEffect } from "react";
import { StatusCodes } from "../enums/status-code.enum";
import { ContextCodes } from "../enums/context-code.enum";
import { ErrorCodes } from "../enums/error-code.enum";
import { Exceptions } from "../enums/exception.enum";
import useStore from "./useStore";
import { pushNotification } from "../components/notification/notification-slice";
import { resetAuthGlobal } from "../../common/actions/auth-slice";

interface FieldErrorMessage {
  code: ErrorCodes;
  constraint: string;
  message: string;
  property: string;
}

export interface FormError {
  data: {
    contextCode: ContextCodes;
    error: Exceptions;
    messages: FieldErrorMessage[];
    statusCode: StatusCodes;
  };
  status: StatusCodes;
}

export interface Error {
  data: {
    contextCode: ContextCodes;
    error: Exceptions;
    statusCode: StatusCodes;
    message: string;
    code: ErrorCodes;
  };
  status: StatusCodes;
}

export interface FieldErrorMapped {
  [key: FieldErrorMessage["property"]]: FieldErrorMessage["message"];
}

const useErrorHandler = (
  error?: Error | FormError | any,
  setErrors?: (errors: FieldErrorMapped) => void
) => {
  const { dispatch } = useStore();

  useEffect(() => {
    if (!error) {
      return;
    }

    if (setErrors && error.status === StatusCodes.BAD_REQUEST) {
      setErrors(
        (error as FormError).data.messages.reduce(
          (accumulator: FieldErrorMapped, { message, property }) => {
            accumulator[property] = message;

            return accumulator;
          },
          {}
        )
      );
    } else if (error.status === StatusCodes.FORBIDDEN) {
      dispatch(resetAuthGlobal());
    } else {
      dispatch(pushNotification((error as Error).data.message));
    }
  }, [error, dispatch]);
};

export default useErrorHandler;
