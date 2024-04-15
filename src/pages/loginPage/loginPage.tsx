import React, { useState, useEffect } from "react";
import useAuth from "../../components/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import "./loginPage.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shouldClearForm, setShouldClearForm] = useState(false);
  const navigate = useNavigate();
  const { isLoading, onLogin } = useAuth();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("handleSubmit called");

    if (!validatePassword(password)) {
      setPasswordError(
        "The password must contain at least one number, one lowercase letter and one uppercase letter, and be at least 8 characters long."
      );
      return;
    }

    try {
      await onLogin({ email: email, password: password });
      setShouldClearForm(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (shouldClearForm) {
      setEmail("");
      setPassword("");
      setPasswordError("");
      navigate(ROUTES.contact);

      setShouldClearForm(false);
    }
  }, [shouldClearForm, navigate, isLoading]);

  return (
    <div>
      <h2 className="loginName">Login Form</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <div>
          <label className="formLabel">Email:</label>
          <input
            className="input-login-form"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label className="formLabel">Password:</label>
          <input
            className="input-login-form"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="form-submit-button"
        >
          {!isLoading ? "Login" : "Loading"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
