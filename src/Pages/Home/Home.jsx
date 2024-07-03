import { Helmet } from "react-helmet-async";
import banner from "../../assets/Resale Banner.jpg";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import BrandRoutes from "./BrandRoutes";
import { ListGroup } from "flowbite-react";

const Home = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  const { data: coms = [] } = useQuery({
    queryKey: ["computers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/coms");
      console.log(res.data);
      return res.data;
    },
  });
  //return [coms, loading, refetch];

  const brandHP = coms.filter((com) => com.Brand == "Dell");
  console.log(brandHP);

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((userCredentials) => {
        const loggedUser = userCredentials.user;
        console.log(loggedUser);

        const userInfo = {
          name: loggedUser?.displayName,
          email: loggedUser?.email,
          timestamp: new Date(),
        };

        axiosPublic
          .post("/users", userInfo)
          .then((res) => console.log(res.data));
        Swal.fire({
          title: "Sign In With Google",
          text: "You are log in! and save your data",
          icon: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          title: "Error Message",
          text: err.message,
          icon: "failed",
        });
      });
  };
  return (
    <div className="min-h-[100vh] mt-[10%] text-[#3f3c37]">
      <Helmet>
        <title>Resale Laptop | Home</title>
      </Helmet>
      <div className="h-14  bg-[#ffffff] rounded-md w-auto block m-3 lg:hidden">
        hello,I am safayet
      </div>
      <div className="h-14 p-2 bg-[#ffffff] rounded-md w-auto text-center block m-3 lg:hidden ">
        <button
          type="button"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
          onClick={handleGoogleSignIn}
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          className="text-white bg-[#f3cf01] hover:bg-[#f3cf20]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
        >
          <Link to={"/login"}>POST YOUR AD</Link>
        </button>
      </div>
      <div className="h-32  bg-[#ffffff] rounded-md w-auto block lg:hidden m-3">
        <div className="min-h-28 mt-2 rounded-sm border-2 border-cyan-900 text-center">
          <h3 className="text-2xl">Place of Ads</h3>
        </div>
      </div>

      {/* .......................(large display)....................... */}

      <div className="flex flex-row gap-2 justify-center mb-4">
        <div className=" min-h-64 bg-[#ffffff] rounded-md w-52 hidden lg:flex flex-0">
          <div className="mx-auto m-4">
            <h2 className="text-3xl text-slate-950">Categories</h2>
            <div className="mt-4">
              <legend className="mb-4  text-xl text-slate-950">
                Laptops by Brand
              </legend>
              <ListGroup className="w-48">
                <BrandRoutes title={"HP"} />
                <BrandRoutes title={"Dell"} />
                <BrandRoutes title={"Lenovo"} />
              </ListGroup>
            </div>
          </div>
        </div>

        <div className="  bg-[#ffffff] rounded-md p-2 w-auto lg:flex flex-1">
          <div className="grid grid-row-6">
            <div className="">
              <div className=" relative w-full">
                <div>
                  <img src={banner} alt="" className="" />
                </div>
                <div className="absolute flex justify-end top-2/4 left-10">
                  <h1 className="text-4xl font-bold text-slate-950">
                    Second hand <br />
                    <span className="text-[#149777]">Laptops</span>
                  </h1>
                </div>
                <div className="absolute flex justify-end top-3/4 left-10">
                  <p className="text-sm text-[#AD7800] italic">
                    Get the best laptop deals...
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2">
              {coms.map((com, i) => (
                <div
                  key={i}
                  className="flex flex-col lg:flex-row gap-3 mb-3  rounded-md shadow-xl"
                >
                  <div className="w-full lg:w-6/12">
                    <img
                      src={com.img}
                      alt=""
                      className="w-auto p-10 rounded-lg object-cover aspect-auto"
                    />
                  </div>
                  <div className="w-auto p-10 lg:w-6/12">
                    <div className="flex justify-between  lg:flex-col gap-16">
                      <div>
                        <h5 className="text-xl lg:text-2xl text-slate-950">
                          {com.title}
                        </h5>
                        <p className="text-[#ecba04] ">
                          <span className="bold">price:</span>
                          {com.price}
                        </p>
                        <p>{com.location}</p>
                      </div>
                      <p className="-mr-2">
                        <span className="italic text-slate-600">Posted on</span>{" "}
                        {new Date(com.timestamp).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden min-h-64 bg-[#ffffff] rounded-md w-64 lg:flex flex-0">
          <div className="text-center m-4">
            <button
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
              onClick={handleGoogleSignIn}
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
            <Link to={"/login"}>
              <button
                type="button"
                className="text-white bg-[#f3cf01] hover:bg-[#f3cf20]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
              >
                Post your Ad
              </button>
            </Link>
            <div className="min-h-72 mt-2 rounded-sm border-2 border-cyan-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
