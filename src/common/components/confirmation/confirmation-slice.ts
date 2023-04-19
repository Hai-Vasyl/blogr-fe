import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ActivateConfirmationPayload {
  title?: string
  description: string
  onAccept: () => void
}

interface ConfirmationState {
  isActive: boolean
  title: string
  description: string
  onAccept: () => void
}

const initialState: ConfirmationState = {
  isActive: false,
  title: "",
  description: "",
  onAccept: () => {},
}

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState,
  reducers: {
    activateConfirmation: (
      state,
      action: PayloadAction<ActivateConfirmationPayload>
    ) => {
      state.isActive = true
      state.title = action.payload.title || "Are you sure?"
      state.description = action.payload.description
      state.onAccept = action.payload.onAccept
    },

    deactivateConfirmation: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { activateConfirmation, deactivateConfirmation } =
  confirmationSlice.actions
export default confirmationSlice.reducer
