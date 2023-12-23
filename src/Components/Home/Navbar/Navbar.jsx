import { Link, NavLink } from "react-router-dom";
import logo from '../../../assets/mobileLogo-removebg-preview.png'
import useAuth from "../../Hook/useAuth";
import useCart from "../../Hook/useCart";
const Navbar = () => {
  const [cart]=useCart()

  const {user, logOut}=useAuth()
  const handleLogout = () => {
    logOut().then().catch();
  };

    const navlink = (
        <>
          <li className="text-xl font-serif hover:text-red-700">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="text-xl font-serif  hover:text-red-700">
            <NavLink to="/cart">Cart {cart?.length}</NavLink>
          </li>
        
        </>
      );

    return (
        <div className="">
      <div className="navbar fixed  z-10 bg-opacity-30  text-black  max-w-screen-xl mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-xl font-semibold  rounded-box w-52"
            >
              {navlink}
            </ul>
          </div>
          <div className="flex justify-center items-center  p-1">
            <img src={logo} className="w-16 md:w-24" alt="" />
           
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlink}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
              <p
              onClick={handleLogout}
              className="bg-gradient-to-r from-pink-700 to-blue-700 text-white hover:from-green-700 hover:to-yellow-500 p-3 rounded-lg font-serif text-base lg:text-lg flex justify-center cursor-pointer items-center"
            >
              LogOut
            </p>
          ) : (
            <Link to="/login">
              <div className="flex flex-col justify-center items-center ">
                <h2 className="text-base md:text-xl font-semibold font-serif">LogIn </h2>
                <p className="text-sm md:text-lg">Or,Create an account</p>
              </div>
            </Link>
          )} 
         
        </div>
      </div>
        </div>
    );
};

export default Navbar;