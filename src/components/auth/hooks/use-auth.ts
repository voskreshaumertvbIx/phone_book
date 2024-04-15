import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchUser } from "../redux/thunk";
import { LoginParams } from "../types";
import { logout } from "../redux/authSlice";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const onLogin = useCallback(
    (data: LoginParams) => {
      dispatch(fetchUser(data));
    },
    [dispatch]
  );
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return { ...auth, onLogin, onLogout };
};

export default useAuth;
