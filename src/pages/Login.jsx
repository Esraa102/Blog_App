import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { UseAuthContext } from "../utils/auth";
const Login = () => {
  const { logInUser } = UseAuthContext();
  const formRef = useRef(null);
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const emailValidation = () => {
    const email = formRef.current.email.value;
    const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(emailReg)) return true;
    else {
      setEmailErr(true);
      return false;
    }
  };
  const passwordValidation = () => {
    const password = formRef.current.password.value;
    if (password.length >= 8) return true;
    else {
      setPassErr(true);
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailValidation() && formRef.current.email.value;

    const password = passwordValidation() && formRef.current.password.value;
    console.log(email, password);
    if (email && password) {
      logInUser({ email, password });
    }
  };
  return (
    <section className="section">
      <h1 className="header">Log In</h1>
      <p className="sub-head">Hello Again To Your Blog</p>
      <form className="form" onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="user-email" className="label">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="user-email"
          required
          placeholder="Enter Your Email"
          className="input"
        />
        {emailErr && <span className="error">Invalid Email</span>}
        <label htmlFor="user-password" className="label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="user-password"
          required
          placeholder="Enter Your Password"
          className="input"
        />
        {passErr && (
          <span className="error">
            Password Should Be At Least 8 Characters
          </span>
        )}
        <button type="submit" className="btn">
          Log In
        </button>
      </form>
      <p className="text-center mt-4">
        Don&apos;t Hanve An Account?{" "}
        <Link to="/sign-in" className="link">
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default Login;
