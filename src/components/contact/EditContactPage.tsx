import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { ContactInfo } from "./types";
import { updateContact } from "./redux/contactSlice";
import { ROUTES } from "../../routes/routes";
import InputMask from "react-input-mask";

const EditContactPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contact.contact);
  const contact = contacts.find((c: ContactInfo) => c.id === id);
  const [editedContact, setEditedContact] = useState<ContactInfo>({
    id: "",
    isActive: false,
    age: 0,
    name: { first: "", last: "" },
    company: "",
    email: "",
    phone: "",
    address: "",
    registered: "",
  });

  useEffect(() => {
    if (contact) {
      setEditedContact(contact);
    }
  }, [contact]);

  const handleEditContact = () => {
    if (editedContact) {
      dispatch(updateContact(editedContact));
      navigate(ROUTES.contact);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedContact((prevState) => ({
      ...prevState,
      [name.includes("name.") ? "name" : name]: name.includes("name.")
        ? { ...prevState.name, [name.split(".")[1]]: value }
        : value,
    }));
    if (name === "age") {
      const ageValue = parseInt(value);
      if (!isNaN(ageValue) && ageValue >= 1 && ageValue <= 120) {
        setEditedContact((prevState) => ({
          ...prevState,
          age: ageValue,
        }));
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-lg">
      <h1 className="mb-4 font-bold text-2xl text-center">Edit Contact</h1>
      <div className="flex flex-wrap mb-4 bg-white border border-gray-300 shadow-md p-4 rounded-lg">
        <div className="w-1/2 pr-4 mb-4">
          <label htmlFor="firstName" className="mb-2 block">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="name.first"
            value={editedContact.name?.first}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="w-1/2 pl-4 mb-4">
          <label htmlFor="lastName" className="mb-2 block">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="name.last"
            value={editedContact.name?.last}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="isActive" className="mb-2 block">
            Active:
          </label>
          <select
            id="isActive"
            name="isActive"
            value={editedContact.isActive ? "true" : "false"}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div className="w-full mb-4">
          <label htmlFor="age" className="mb-2 block">
            Age:
          </label>
          <input
            type="number"
            placeholder="Age"
            name="age"
            min="1"
            max="120"
            value={editedContact.age}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="company" className="mb-2 block">
            Company:
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={editedContact.company}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="email" className="mb-2 block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={editedContact.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="phone" className="mb-2 block">
            Phone:
          </label>
          <InputMask
            mask="+1 (999) 999-9999"
            type="text"
            id="phone"
            name="phone"
            value={editedContact.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="address" className="mb-2 block">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={editedContact.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
      <button
        onClick={handleEditContact}
        className="bg-blue-500 hover:bg-blue-700 rounded-md text-white w-32 h-10 mx-auto my-3 mb-0 block"
      >
        Save
      </button>
    </div>
  );
};

export default EditContactPage;
