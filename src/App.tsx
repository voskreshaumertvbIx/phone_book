import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import LoginForm from "./pages/loginPage/loginPage";
import AppRoutes from "./routes/index";

function App() {
  return (
    <Provider store={store}>
      <div>
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
