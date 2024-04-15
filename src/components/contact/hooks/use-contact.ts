import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchContact } from "../redux/thunk";

const useContacts = () => {
  const dispatch = useAppDispatch();
  const contactState = useAppSelector((state) => state.contact);

  const fetchContacts = useCallback(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return { contactState, fetchContacts };
};

export default useContacts;
