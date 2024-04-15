import { Routes, Route } from 'react-router-dom';
import LoginForm from '../pages/loginPage/loginPage';
import Contact from '../components/contact/contact';
import { ROUTES } from './routes';
import AddContactForm from '../components/contact/addNewContact';
import SinglePage from './../components/contact/singlePage';
import EditContactPage from '../components/contact/EditContactPage';
const AppRoutes = () => {
  

 

  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginForm />} />
      <Route path={ROUTES.contact} element={<Contact />} /> 
      <Route path={ROUTES.addcontact} element={<AddContactForm />} />
      <Route path={ROUTES.dynamic.contact_detail()} element={<SinglePage />} /> 
      <Route path={ROUTES.dynamic.editphone()} element={<EditContactPage />} />
      
    </Routes>
  );
}

export default AppRoutes;


