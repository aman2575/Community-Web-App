import Link from "next/link";
import { Auth } from "aws-amplify";
import React from "react";
const Navbar = () => {
  const signOutHandler = () => {};
  return (
    <nav className="navbar w-100 navbar-expand navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="#">
          Profile App
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/user">
                <a className="nav-link">Edit User</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={ `/login`}>
                <a className="nav-link">Login</a>
              </Link>
            </li>
            <button
              className="btn btn-danger"
              type="button"
              onClick={signOutHandler}
            >
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;