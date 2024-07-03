import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { FaSquarePhone } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import Swal from "sweetalert2";
import Modal from "styled-react-modal";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

import { useState } from "react";
const StyledModal = Modal.styled`
  position:relative;
  width: 40rem;
  height: 20rem;
  display: flex;
  flex-direction:column;
  gap:2;
  align-items: center;
  justify-content: center;  background-color: white;`;

const LapItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { brand } = useParams();
  const { user } = useContext(AuthContext);

  //Below this also work and for learning purpose
  //   const location = window.location.pathname;
  //   //useLocation();
  //   const substring = location.substring(10, 18);
  //   console.log(substring);
  console.log(brand);

  const axiosPublic = useAxiosPublic();
  const { data: items = [] } = useQuery({
    queryKey: ["computers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/coms");
      console.log(res.data);
      return res.data;
    },
  });
  const lapItems = items.filter((item) => item.Brand === brand);
  console.log(lapItems);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="min-h-screen">
        <h1 className="m-[8%] text-center text-slate-950 text-3xl text-bold">
          Laptops By Brand
        </h1>

        <div className="grid grid-cols-2">
          {lapItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-col w-full  gap-2 mb-3  rounded-md shadow-xl"
            >
              <div className="w-full">
                <div className="flex px-5">
                  <p className="">
                    <span className="italic text-slate-600">Posted on</span>{" "}
                    {new Date(item.timestamp).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  ,<p>{item.location}</p>
                </div>
                <PhotoProvider>
                  <PhotoView src={item.img}>
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-96 px-5 pt-2  object-cover aspect-auto"
                    />
                  </PhotoView>
                </PhotoProvider>
              </div>
              <div className="w-full px-7">
                <div className=" flex-col ">
                  <div>
                    <h5 className="text-xl font-bold lg:text-2xl text-slate-950 mb-2">
                      {item.title}
                    </h5>
                    <p className="text-[#ecba04] font-semibold mb-2">
                      <span className="">Price:</span>
                      {item.price}
                    </p>
                    <p className="text-[#149777] font-semibold flex">
                      <FaSquarePhone className="text-2xl" /> {item.contactNo}
                    </p>
                  </div>
                </div>
                <div className="w-full px-1 mt-2 mb-2 ">
                  <div className="flex justify-between ">
                    <div>
                      <div>Seller:{item.sellerName}</div>{" "}
                      <div>Condition:{item.condition}</div>
                      <div>Model:{item.model}</div>
                      <div>Processor:{item.Processor}</div>
                    </div>

                    <div>
                      Years Of Usage:{item.yearsOfUsage}{" "}
                      <div>Brand:{item.Brand}</div>
                      <div>Ram:{item.ram}</div>
                      <div>HDD:{item.HDD}</div>
                      <div>SSD:{item.SSD}</div>
                    </div>
                  </div>
                  <hr className="border-b-1 border-slate-300 " />
                  <div className="mt-2 mb-2 h-[10%]">
                    {" "}
                    <span className="font-bold"> Description:</span>
                    {item.description}
                  </div>
                  <hr className="border-b-1 border-slate-300 " />
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-2">
                      <FcLike className=" text-2xl" />{" "}
                      <span className="font-semibold">Like</span>
                    </div>
                    <button
                      className="btn bg-[#149777] text-white p-2 rounded-lg"
                      onClick={toggleModal}
                    >
                      Book now
                    </button>
                    <StyledModal
                      isOpen={isOpen}
                      onBackgroundClick={toggleModal}
                      onEscapeKeydown={toggleModal}
                    >
                      <p>{user?.displayName}</p>
                      <p>{user?.email}</p>
                      <p>Product:{item.title}</p>
                      <p>Resale:price:{item.price}</p>
                      <div className="flex gap-2">
                        <input type="text" />
                        <input type="tel" />
                      </div>

                      <button
                        className="absolute top-5 right-5"
                        onClick={toggleModal}
                      >
                        X
                      </button>
                    </StyledModal>

                    <button className="btn bg-slate-300 p-2 rounded-lg">
                      Report to Items
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LapItems;
