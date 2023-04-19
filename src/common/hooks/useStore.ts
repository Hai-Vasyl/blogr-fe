import { useDispatch } from "./useDispatch"
import { useSelector } from "./useSelector"

const useStore = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  return { state, dispatch }
}

export default useStore
