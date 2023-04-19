import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NotificationTypes } from "./notification-type.enum"
import { v4 as uuidv4 } from "uuid"

interface NotificationPayload {
  message: string
  type: NotificationTypes
}

interface Notification {
  id: string
  message: string
  type: NotificationTypes
}

interface NotificationState {
  list: Notification[]
}

const initialState: NotificationState = {
  list: [],
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    pushNotification: (
      state,
      action: PayloadAction<string | NotificationPayload>
    ) => {
      const id = uuidv4()
      let message: string
      let type: NotificationTypes

      if (typeof action.payload === "object") {
        ;({ message, type } = action.payload)
      } else {
        type = NotificationTypes.ERROR
        message = action.payload
      }

      state.list.push({ id, message, type })
    },
    shiftNotification: (state) => {
      state.list.shift()
    },
    shiftNotificationById: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (notification) => notification.id !== action.payload
      )
    },
  },
})

export const { pushNotification, shiftNotification, shiftNotificationById } =
  notificationSlice.actions
export default notificationSlice.reducer
