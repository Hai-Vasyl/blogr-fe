import { useEffect } from "react";
import { FieldInputModel } from "../../common/components/form/components/fields/field-input/field-input-model";
import { FieldInputTypes } from "../../common/components/form/components/fields/field-input/field-input-type.enum";
import { WithStyles } from "../../common/helpers/with-styles";
import useForm from "../../common/components/form/hooks/useForm";
import styles from "./form-auth.module.scss";
import Form from "../../common/components/form/Form";
import Button from "../../common/components/buttons/button/Button";
import ButtonLight from "../../common/components/buttons/button-light/ButtonLight";
import { FieldSelectModel } from "../../common/components/form/components/fields/field-select/field-select-model";
import { Genders } from "./gender.enum";
import { ButtonTypes } from "../../common/components/buttons/button-type.enum";
import { AuthFormTypes } from "./auth-form-type.enum";
import { serverApi } from "../../common/queries/server-api-slice";
import useStore from "../../common/hooks/useStore";
import { setAuthGlobal } from "../../common/actions/auth-slice";
import { deactivatePopup } from "../../common/components/popup/popup-slice";
import useErrorHandler from "../../common/hooks/useErrorHandler";

interface FormAuthProps {}

type FormStateKey = AuthFormTypes;
type FormStateValue = {
  group: FormStateKey;
  formLabel: string;
  buttonLeftLabel: string;
  buttonRightLabel: string;
  isLoading: boolean;
  errors?: any;
};
type FormState = {
  [value in FormStateKey]: FormStateValue;
};

const FormAuth = WithStyles<FormAuthProps>(({ styles }) => {
  const {
    formValues,
    group,
    setGroup,
    getContainers,
    setContainer,
    setErrors,
  } = useForm({
    state: {
      title: "Login form",
      property: "auth",
      fields: [
        new FieldInputModel({
          property: "firstName",
          label: "First Name",
          groups: [AuthFormTypes.REGISTER],
        }),
        new FieldInputModel({
          property: "lastName",
          label: "Last Name",
          groups: [AuthFormTypes.REGISTER],
        }),
        new FieldSelectModel({
          property: "gender",
          label: "Gender",
          value: Genders.MALE,
          options: [
            {
              label: "Male",
              value: Genders.MALE,
            },
            {
              label: "Female",
              value: Genders.FEMALE,
            },
            {
              label: "Other",
              value: Genders.OTHER,
            },
          ],
          groups: [AuthFormTypes.REGISTER],
        }),
        new FieldInputModel({
          property: "email",
          label: "Email",
          type: FieldInputTypes.EMAIL,
          groups: [AuthFormTypes.REGISTER, AuthFormTypes.LOGIN],
        }),
        new FieldInputModel({
          property: "password",
          label: "Password",
          type: FieldInputTypes.PASSWORD,
          groups: [AuthFormTypes.REGISTER, AuthFormTypes.LOGIN],
        }),
      ],
    },
    group: "login",
  });

  const { dispatch } = useStore();
  const [loginUserRequest, loginUser] = serverApi.useLoginUserMutation();
  const [registerUserRequest, registerUser] =
    serverApi.useRegisterUserMutation();

  useErrorHandler(loginUser.error, setErrors);
  useErrorHandler(registerUser.error, setErrors);

  const formStates: FormState = {
    [AuthFormTypes.LOGIN]: {
      group: AuthFormTypes.REGISTER,
      formLabel: "Register form",
      buttonLeftLabel: "Login",
      buttonRightLabel: "Register",
      isLoading: loginUser.isLoading,
    },
    [AuthFormTypes.REGISTER]: {
      group: AuthFormTypes.LOGIN,
      formLabel: "Login form",
      buttonLeftLabel: "Register",
      buttonRightLabel: "Login",
      isLoading: registerUser.isLoading,
    },
  };

  const getFormState = (key: FormStateKey | any) => {
    return formStates[key as FormStateKey];
  };

  const activeForm = getFormState(group);

  useEffect(() => {
    if (loginUser.isSuccess) {
      dispatch(deactivatePopup());
      dispatch(setAuthGlobal(loginUser.data));
    }
  }, [dispatch, loginUser.data, loginUser.isSuccess]);

  useEffect(() => {
    if (registerUser.isSuccess) {
      const { email, password } = formValues.auth;
      loginUserRequest({ email, password });
    }
  }, [registerUser.isSuccess]);

  const handleSubmitAuthForm = async () => {
    const { firstName, lastName, gender, email, password } = formValues.auth;

    if (group === AuthFormTypes.LOGIN) {
      await loginUserRequest({ email, password });
    } else {
      await registerUserRequest({
        firstName,
        lastName,
        gender: gender as Genders,
        email,
        password,
      });
    }
  };

  const handleSwitchForm = () => {
    setGroup((prevGroup) => getFormState(prevGroup).group);

    setContainer((prevContainer) => ({
      ...prevContainer,
      label: activeForm.formLabel,
    }));

    setErrors();
  };

  return (
    <Form
      getContainers={getContainers}
      onSubmit={handleSubmitAuthForm}
      styles={styles.cascade}
      isLoading={activeForm.isLoading}
    >
      <Button
        label={activeForm.buttonLeftLabel}
        type={ButtonTypes.SUBMIT}
        disabled={activeForm.isLoading}
      />
      <ButtonLight
        label={activeForm.buttonRightLabel}
        onClick={handleSwitchForm}
        disabled={activeForm.isLoading}
      />
    </Form>
  );
}, styles);

export default FormAuth;
