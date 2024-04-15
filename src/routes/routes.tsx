export const ROUTES = {
  login: "/",
  contact: "/contact",
  addcontact: "/addcontact",
  dynamic: {
    contact_detail: (id = ":id") => `contact/${id}`,
    editphone: (id = ":id") => `editphone/${id}`,
  },
};
