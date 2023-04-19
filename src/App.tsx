import { useEffect } from "react"
import useStore from "./common/hooks/useStore"
import Popup from "./common/components/popup/Popup"
import NotificationContainer from "./common/components/notification/notification-container/NotificationContainer"
import { setAuth, setUser } from "./common/actions/auth-slice"
import Router from "./components/router/Router"
import { serverApi } from "./common/queries/server-api-slice"
import { activateConfirmation } from "./common/components/confirmation/confirmation-slice"
import Confirmation from "./common/components/confirmation/Confirmation"

function App() {
  const {
    dispatch,
    state: {
      auth: { isAuth, sub: userId },
    },
  } = useStore()

  const [getUserRequest, getUser] = serverApi.useLazyGetUserQuery()

  useEffect(() => {
    dispatch(setAuth())
  }, [dispatch])

  useEffect(() => {
    const getUserData = async () => {
      await getUserRequest(userId)
    }

    if (isAuth) {
      getUserData()
    }
  }, [isAuth, getUserRequest])

  useEffect(() => {
    if (getUser.isSuccess) {
      dispatch(setUser(getUser.data))
    }
  }, [
    dispatch,
    setUser,
    getUser.data,
    getUser.isSuccess,
    getUser.startedTimeStamp,
  ])

  return (
    <div>
      {/* <button
        onClick={() =>
          dispatch(pushNotification("some message really important!!!"))
        }
      >
        Activate notification
      </button> */}
      <button
        onClick={() =>
          dispatch(
            activateConfirmation({
              description:
                "Delete current permissions, with no further restoring?",
              onAccept: () => {
                console.log("DELETED")
              },
            })
          )
        }
      >
        ------------------- Activate confirmation
      </button>
      <Popup />
      <Confirmation />
      <NotificationContainer />
      <Router />
    </div>
  )
}

export default App
