import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ComponentAndStylesProps } from "../../helpers/with-styles"

type PopupComponent = (
  props: ComponentAndStylesProps<any>
) => React.ReactElement<any, any> | null

interface PopupState {
  isActive: boolean
  Component: PopupComponent
}

const initialState: PopupState = {
  isActive: false,
  Component: () => null,
}

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    activatePopup: (state, action: PayloadAction<PopupComponent>) => {
      state.isActive = true
      state.Component = action.payload
    },

    deactivatePopup: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { activatePopup, deactivatePopup } = popupSlice.actions
export default popupSlice.reducer
