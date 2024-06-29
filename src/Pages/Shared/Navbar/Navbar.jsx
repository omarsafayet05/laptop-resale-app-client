import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { BsLaptop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const toggle = () => {
    const dropdown = document.querySelector(".dropdown");
    if (open) {
      return setOpen(false);
    }
    const openMenu = dropdown.classList.toggle("top-[100%]");
    setOpen(openMenu);
  };

  const handleLogOut = () => {
    logOut();
  };
  return (
    <header className="text-white">
      <nav className="flex items-center justify-between bg-[#149777]  w-full left-0 top-0 z-[999] fixed md:h-20">
        <div className="">
          <a
            href=""
            className="text-2xl font-bold mx-7 border-t-4 border-b-2 flex justify-center items-center gap-2 "
          >
            R3SALE <BsLaptop className=" font-bold text-4xl" />
          </a>
        </div>

        <div className="dropdown absolute -top-52 left-0  text-[#3f3c37] w-full flex flex-col gap-6 items-center py-2 text-lg backdrop-blur-sm font-boldtransition-all duration-500 lg:static lg:flex-row lg:w-[40%]">
          <ul className="flex flex-col gap-6 items-center lg:flex-row lg:gap-8 font-bold">
            <li className="hover:text-[#AD7800]">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="hover:text-[#AD7800]">Product</li>
            <li className="hover:text-[#AD7800]">About</li>
            <li className="hover:text-[#AD7800]">
              <Link to={"/blog"}>Blog</Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center ">
          <div className=" flex gap-3 mx-2">
            {user ? (
              <button
                className="rounded-sm py-2 px-4  bg-[#FFC800] text-[#AD7800] font-bold "
                onClick={handleLogOut}
              >
                Sign Out
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="rounded-sm py-2 px-4  bg-[#FFC800] text-[#AD7800] font-bold ">
                  Sign In
                </button>
              </Link>
            )}
          </div>
          <div onClick={() => toggle()} className="lg:hidden ">
            <IoMdMenu className="text-4xl" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
