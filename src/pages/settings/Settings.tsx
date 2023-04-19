import React from "react"
import { WithStyles } from "../../common/helpers/with-styles"
import styles from "./settings.module.scss"
import useForm from "../../common/components/form/hooks/useForm"
import { FieldInputModel } from "../../common/components/form/components/fields/field-input/field-input-model"
import Form from "../../common/components/form/Form"
import { serverApi } from "../../common/queries/server-api-slice"
import { useLocation } from "react-router-dom"
import Button from "../../common/components/buttons/button/Button"

const Settings = WithStyles(({ styles }) => {
  const { formValues, getContainers, setContainer, setErrors } = useForm({
    state: {
      title: "Create permission",
      property: "settings_permissions",
      fields: [
        new FieldInputModel({
          property: "name",
          label: "Permission name",
        }),
        new FieldInputModel({
          property: "description",
          label: "Permission description",
        }),
      ],
    },
  })

  // TODO: refactor this part
  const { search } = useLocation()
  const page = Number(new URLSearchParams(search).get("page")) || 1
  const itemsCount = 10
  const take = itemsCount * page
  const skip = take - itemsCount

  const getPermissions = serverApi.useGetPermissionsQuery({ skip, take })

  const handleSubmitSettingsPermissionsForm = () => {}

  const handleDeletePermission = () => {}

  // const permissions = getPermissions.data.map(permission => {
  //   return <div>
  //     <div>
  //     <h3>{permission.name}</h3>
  //     <p>{permission.description}</p>
  //     </div>
  //     <div>
  //       <Button icon="delete" onClick={}/>
  //     </div>
  //   </div>
  // })

  return (
    <div>
      <div>
        <Form
          getContainers={getContainers}
          onSubmit={handleSubmitSettingsPermissionsForm}
          styles={styles.cascade}
          // isLoading={activeForm.isLoading}
        >
          {/* <Button
          label={activeForm.buttonLeftLabel}
          type={ButtonTypes.SUBMIT}
          disabled={activeForm.isLoading}
        />
        <ButtonLight
          label={activeForm.buttonRightLabel}
          onClick={handleSwitchForm}
          disabled={activeForm.isLoading}
        /> */}
        </Form>
      </div>
      <div></div>
    </div>
  )
}, styles)

export default Settings
