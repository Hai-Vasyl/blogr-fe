import { useDispatch as useApiDispatch } from "react-redux"
import { AppDispatch } from "../../store"

export const useDispatch = () => useApiDispatch<AppDispatch>()
