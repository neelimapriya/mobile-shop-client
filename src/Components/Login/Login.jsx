import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAuth from "../Hook/useAuth";



const Login = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location", location.state);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Logged In successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="bg-gradient-to-r from-pink-300 to-blue-300">
      <div className=" text-black h-72">
        <h2 className="pt-56 flex justify-center items-center text-4xl font-serif font-semibold">
          My Account
        </h2>
      </div>
      <div className=" min-h-screen  ">
        <div className="hero-content ">
          <div className="card  w-full  shadow-2xl max-w-sm ">
            <form onSubmit={handleLogin} className="card-body text-black font-serif">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-xl">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input text-black input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black text-xl">
                    Password
                  </span>
                </label>
                <input
                  name="password"
                  type="text"
                  placeholder="password"
                  className="input input-bordered text-black"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="text-xl font-semibold bg-gradient-to-r from-pink-700 to-blue-700 text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg"
                />
              </div>
            </form>
            <p className="text-center pb-3 text-white text-lg">
              <small>
                New here ?{" "}
                <Link className="text-yellow-600 font-semibold" to="/register">
                  Create an account.
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;