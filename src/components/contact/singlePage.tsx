import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./../../store";
import { fetchContact } from "./../contact/redux/thunk";
import "tailwindcss/tailwind.css";

const SinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContact() as any);
  }, [dispatch, id]);

  const contact = useSelector((state: RootState) =>
    state.contact.contact.find((contact) => contact.id === id)
  );

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const { age, name, company, email, phone, address, registered } = contact;

  return (
    <div className="inline-block text-base bg-white shadow-md rounded-lg p-5">
      <div className="px-2 py-1">
        <h1 className="font-bold text-2xl py-3">Contact Info</h1>
        <p>
          <span className="font-semibold">ID:</span> {id}
        </p>
        <p>
          <span className="font-semibold">Age:</span> {age}
        </p>
        <p>
          <span className="font-semibold">First Name:</span> {name.first}
        </p>
        <p>
          <span className="font-semibold">Last Name:</span> {name.last}
        </p>
        <p>
          <span className="font-semibold">Company:</span> {company}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {phone}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {address}
        </p>
        <p>
          <span className="font-semibold">Registered:</span> {registered}
        </p>
      </div>
    </div>
  );
};

export default SinglePage;
