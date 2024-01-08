import { Link, NavLink } from "react-router-dom";
import { UseAuthContext } from "../utils/auth";

const Header = () => {
  const { user, deleteUser } = UseAuthContext();
  return (
    <div
      className="sticky top-0 left-0 w-full 
    px-6 lg:px-16 py-4 bg-secondary
    flex items-center justify-between gap-6 z-10"
    >
      {user ? (
        <>
          <Link to="/" className="font-bold text-red uppercase text-2xl">
            Blog
          </Link>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4 text-white text-lg font-semibold">
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-red" : ""} hover:text-red transition`
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-red" : ""} hover:text-red transition`
                }
                to={"/posts"}
              >
                Your Posts
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-red" : ""} hover:text-red transition`
                }
                to={"/new-post"}
              >
                Create New Post
              </NavLink>
            </nav>
            <button className="btn mt-0" onClick={deleteUser}>
              Log Out
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-bold text-red uppercase text-2xl cursor-pointer">
            Blog
          </p>
          <Link to="/login" className="btn mt-0 w-[20%] text-center">
            Log In
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
