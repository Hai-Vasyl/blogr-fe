import { useLocation } from "react-router-dom";

const useParam = (key: string, defaultValue?: string | number) => {
  const { search } = useLocation();
  let param: string | number | null = new URLSearchParams(search).get(key);

  if (typeof defaultValue === "number") {
    param = Number(param);
  }

  return param || defaultValue;
};

export default useParam;
