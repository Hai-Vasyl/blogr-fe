import React from "react";
import { WithStyles } from "../../common/helpers/with-styles";
import styles from "./settings.module.scss";
import useForm from "../../common/components/form/hooks/useForm";
import { FieldInputModel } from "../../common/components/form/components/fields/field-input/field-input-model";
import Form from "../../common/components/form/Form";
import { serverApi } from "../../common/queries/server-api-slice";
import { useLocation } from "react-router-dom";
import Button from "../../common/components/buttons/button/Button";

const Settings = WithStyles(({ styles }) => {
  return <div>Settings page</div>;
}, styles);

export default Settings;
