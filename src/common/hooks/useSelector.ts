import {
  TypedUseSelectorHook,
  useSelector as useApiSelector,
} from "react-redux"
import { RootState } from "../../store"

export const useSelector: TypedUseSelectorHook<RootState> = useApiSelector
