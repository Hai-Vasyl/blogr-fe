import { configureStore } from "@reduxjs/toolkit"
import popupReducer from "./common/components/popup/popup-slice"
import notificationReducer from "./common/components/notification/notification-slice"
import authReducer from "./common/actions/auth-slice"
import confirmationReducer from "./common/components/confirmation/confirmation-slice"
import { serverApi } from "./common/queries/server-api-slice"

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    popup: popupReducer,
    auth: authReducer,
    notification: notificationReducer,
    confirmation: confirmationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(serverApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
