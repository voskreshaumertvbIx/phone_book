import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "./../../store";
import { addContact } from "./../contact/redux/contactSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
// import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import InputMask from "react-input-mask";

interface Contact {
  id: string;
  isActive: boolean;
  age: number;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  phone: string;
  address: string;
  registered: string;
}

const { v4: uuidv4 } = require("uuid");
const AddContactForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [newContact, setNewContact] = useState<Contact>({
    id: uuidv4(),
    isActive: false,
    age: 1,
    name: {
      first: "",
      last: "",
    },
    company: "",
    email: "",
    phone: "",
    address: "",
    registered: date.toDateString(),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addContact(newContact));
    navigate(ROUTES.contact);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "first" || name === "last") {
      setNewContact((prevState) => ({
        ...prevState,
        name: {
          ...prevState.name,
          [name]: value,
        },
      }));
    } else if (type === "checkbox") {
      setNewContact((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setNewContact((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 shadow-md rounded-lg"
    >
      <h1 className="text-center font-bold text-xl">Add contact</h1>
      <div className="border border-gray-300 shadow-md p-4 rounded-lg">
        <input
          className="block border border-gray-300 mb-2 p-2 rounded-md w-full"
          type="text"
          placeholder="First Name"
          name="first"
          value={newContact.name.first}
          onChange={handleChange}
        />
        <input
          className="block border border-gray-300 mb-2 p-2 rounded-md w-full"
          type="text"
          placeholder="Last Name"
          name="last"
          value={newContact.name.last}
          onChange={handleChange}
        />
        <input
          className="block border border-gray-300 mb-2 p-2 rounded-md w-full"
          type="text"
          placeholder="Company"
          name="company"
          value={newContact.company}
          onChange={handleChange}
        />
        <input
          className="block border border-gray-500 mb-2 p-2 rounded-md w-full"
          type="email"
          placeholder="Email"
          name="email"
          value={newContact.email}
          onChange={handleChange}
        />
        <InputMask
          className="block border border-gray-300 mb-2 p-2 rounded-md w-full"
          mask="+1 (999) 999-9999"
          placeholder="Phone"
          name="phone"
          value={newContact.phone}
          onChange={handleChange}
        />
        <input
          className="block border border-gray-300 mb-2 p-2 rounded-md w-full"
          type="text"
          placeholder="Address"
          name="address"
          value={newContact.address}
          onChange={handleChange}
        />
        <div className="flex items-center mb-2">
          <input
            className="border border-gray-300 p-2 rounded-md mr-2"
            type="checkbox"
            name="isActive"
            checked={newContact.isActive}
            onChange={handleChange}
          />
          <label htmlFor="isActive">Is Active</label>
        </div>

        <input
          className="block border border-gray-300 mb-2 p-2 rounded-md w-full"
          type="text"
          placeholder="Age"
          name="age"
          min="1"
          max="120"
          value={newContact.age}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 rounded-md text-white w-32 h-10 mx-auto my-3 mb-0 block"
      >
        Add Contact
      </button>
    </form>
  );
};

export default AddContactForm;
