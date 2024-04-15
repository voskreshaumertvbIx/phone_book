import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../components/auth/hooks/use-auth";
import useContacts from "./hooks/use-contact";
import { Table, Tag, Button, Popconfirm, message } from "antd";
import { ContactInfo } from "./types";
import { useAppDispatch, useAppSelector } from "../../store";
import { ColumnsType } from "antd/es/table";
import { deleteContact } from "./redux/contactSlice";
import { ROUTES } from "../../routes/routes";

const Contact = () => {
  const { onLogout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { contactState, fetchContacts } = useContacts();
  const contacts = useAppSelector((state) => state.contact.contact);

  useEffect(() => {
    if (!contactState.loading && contactState.contact.length === 0) {
      fetchContacts();
    }
  }, [contactState.loading, contactState.contact.length]);

  const handleLogout = () => {
    onLogout();
    navigate(ROUTES.login);
  };

  const handleAddContactClick = () => {
    navigate(ROUTES.addcontact);
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
    message.success("Contact deleted successfully");
  };

  const columns: ColumnsType<ContactInfo> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string, record: any) => (
        <Link to={`/contact/${id}`}>{id}</Link>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "InActive"}
        </Tag>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "InActive", value: false },
      ],
      onFilter: (value: any, record: ContactInfo) => record.isActive === value,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
    },
    {
      title: "First Name",
      dataIndex: ["name", "first"],
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: ["name", "last"],
      key: "lastName",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Registered",
      dataIndex: "registered",
      key: "registered",
    },
    {
      title: "Edit Contact",
      key: "editContact",
      dataIndex: "id",
      render: (id: string, record: ContactInfo) => (
        <Link to={`/editphone/${id}`}>Edit Contact</Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: ContactInfo) => (
        <Popconfirm
          title="Are you sure to delete this contact?"
          onConfirm={() => handleDeleteContact(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-4  text-center">Contact</h1>
      <div className="mb-4">
        <Button className="mr-2" onClick={handleAddContactClick}>
          Add contact
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="overflow-x-auto">
        <Table
          className="w-full table-fixed border-collapse border"
          dataSource={contacts}
          columns={columns}
        />
      </div>
    </>
  );
};

export default Contact;
