// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAuth from "../Hook/useAuth";

const Register = () => {
  const { createUser } = useAuth()
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("register");
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    console.log(
      name,
      email,
      password
    );

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Your password at least have 6 characters",
      });
    } else if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Your Password Should have at least one uppercase character",
      });
      return;
    } else if (!/[!@#$%^&*()_+]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Your Password Should have at least one special character",
      });
      return;
    }

    createUser(email, password).then((result) => {
      console.log(result.user);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Account created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();
      navigate("/");
    });
  };

  return (
    <div className="pb-20 bg-gradient-to-r from-pink-300 to-blue-300">
      <div className="hero min-h-screen  ">
        <div className=" max-w-xl flex-shrink-0 w-full">
          <h2 className="text-center font-serif text-3xl mt-32">
            {" "}
            Create Your account
          </h2>
          <form onSubmit={handleRegister} className="card-body w-4/5 mx-auto">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-serif text-xl">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="rounded-lg w-full p-2 border focus border-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-serif text-xl">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder=" Email Address*"
                className="rounded-lg w-full p-2 border focus border-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-serif text-xl">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-2 rounded-lg border border-black"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="text-xl font-semibold bg-gradient-to-r from-pink-700 to-blue-700 text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg">
                Register
              </button>
            </div>
          </form>

          <div className="text-center mb-5 ">
            <p className="text-md text-center  font-serif flex flex-col md:flex-row justify-center items-center">
              Already Have an Account ?
              <Link className="underline ml-2 text-blue-700 " to="/login">
                Please Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
