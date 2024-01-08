import { useRef, useState } from "react";
import { UseAuthContext } from "../utils/auth";
import { Link } from "react-router-dom";
const SignIn = () => {
  const { signInUser } = UseAuthContext();
  const formRef = useRef(null);
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [confirmErr, setConfirmErr] = useState(false);
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
    const rePassword = formRef.current.confirm.value;
    const username = formRef.current.name.value;
    const userPassword =
      passwordValidation() && formRef.current.password.value === rePassword
        ? formRef.current.password.value
        : setConfirmErr(true);
    if (email && userPassword && username) {
      signInUser({ email, userPassword, username });
    }
  };
  return (
    <section className="section">
      <h1 className="header">Sign In</h1>
      <p className="sub-head">Create A New Account</p>
      <form className="form" onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="user-name" className="label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="user-name"
          required
          placeholder="Enter Your Name"
          className="input"
        />
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
        <label htmlFor="repassword" className="label">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm"
          id="repassword"
          required
          placeholder="Enter Your Password Again"
          className="input"
        />
        {confirmErr && (
          <span className="error">
            Confirm Password And Password Do No Match
          </span>
        )}
        <button type="submit" className="btn">
          Sign In
        </button>
      </form>
      <p className="text-center mt-4">
        Already Have An Account?{" "}
        <Link to="/login" className="link">
          Log In
        </Link>
      </p>
    </section>
  );
};

export default SignIn;
