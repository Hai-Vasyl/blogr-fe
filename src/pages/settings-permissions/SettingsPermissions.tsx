import React, { useEffect } from "react";
import { WithStyles } from "../../common/helpers/with-styles";
import styles from "./settings-permissions.module.scss";
import { FieldInputModel } from "../../common/components/form/components/fields/field-input/field-input-model";
import useForm from "../../common/components/form/hooks/useForm";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../../common/queries/server-api-slice";
import Form from "../../common/components/form/Form";
import useParam from "../../common/hooks/useParam";
import PermissionItem from "./components/permission-item/PermissionItem";
import { FieldSelectModel } from "../../common/components/form/components/fields/field-select/field-select-model";
import Button from "../../common/components/buttons/button/Button";
import { ButtonTypes } from "../../common/components/buttons/button-type.enum";
import useErrorHandler from "../../common/hooks/useErrorHandler";

const SettingsPermissions = WithStyles(({ styles }) => {
  const { formValues, getContainers, setField, setContainer, setErrors } =
    useForm({
      state: {
        title: "Create permission",
        property: "settings_permissions",
        fields: [
          new FieldSelectModel({
            property: "name",
            label: "Permission name",
            options: [],
          }),
          new FieldInputModel({
            property: "description",
            label: "Permission description",
          }),
        ],
      },
    });

  const navigate = useNavigate();
  const permissionId = useParam("permission");
  const page = useParam("page", 1) as number;
  const itemsCount = 10;
  const skip = itemsCount * page - itemsCount;

  const getPermissionNames = serverApi.useGetPermissionNamesQuery();
  const [createPermissionRequest, createPermission] =
    serverApi.useCreatePermissionMutation();
  const [getPermissionsRequest, getPermissions] =
    serverApi.useLazyGetPermissionsQuery();

  useErrorHandler(createPermission.error, setErrors);
  useErrorHandler(getPermissionNames.error);
  useErrorHandler(getPermissions.error);

  useEffect(() => {
    getPermissionsRequest({
      skip,
      take: itemsCount,
    });
  }, [createPermission.data, getPermissionsRequest]);

  useEffect(() => {
    const permissionNameOptions =
      getPermissionNames.data?.map((name) => ({
        label: name,
        value: name,
      })) || [];

    setField(
      (prevField) => ({
        ...prevField,
        options: permissionNameOptions,
        value: permissionNameOptions?.[0]?.value || "",
      }),
      "name"
    );
  }, [getPermissionNames.data]);

  const handleSubmitSettingsPermissionsForm = async () => {
    const { name, description } = formValues.settings_permissions;

    if (permissionId) {
      console.log("Edit permissions");
    } else {
      await createPermissionRequest({ name, description });
    }
  };

  const handleDeletePermission = () => {};

  const handleMakePermissionActive = (permissionId: string) => {
    navigate(`/settings/permissions?permission=${permissionId}`);
  };

  const permissions = getPermissions?.data?.map((permission) => {
    return (
      <PermissionItem
        key={permission.permissionId}
        description={permission.description}
        name={permission.name}
        isActive={permission.permissionId === permissionId}
        onDelete={handleDeletePermission}
        onClick={() => handleMakePermissionActive(permission.permissionId)}
      />
    );
  });

  return (
    <div>
      <div>
        <Form
          getContainers={getContainers}
          onSubmit={handleSubmitSettingsPermissionsForm}
          styles={styles.cascade}
          isLoading={createPermission.isLoading}
        >
          {permissionId ? (
            <button>Nothing</button>
          ) : (
            <Button
              label="Create"
              type={ButtonTypes.SUBMIT}
              disabled={createPermission.isLoading}
            />
          )}
          {/* <ButtonLight
          label={activeForm.buttonRightLabel}
          onClick={handleSwitchForm}
          disabled={activeForm.isLoading}
        /> */}
        </Form>
      </div>
      <div>
        <div></div>
        <div>{permissions}</div>
      </div>
    </div>
  );
}, styles);

export default SettingsPermissions;
