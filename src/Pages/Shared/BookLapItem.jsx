import useAxiosPublic from "../../Hooks/useAxiosPublic";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { FaSquarePhone } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import Swal from "sweetalert2";
import { Button, Label, TextInput } from "flowbite-react";
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
  justify-content: center;  background-color: white;
  border-radius:5px`;

const BookLapItem = ({ item, i }) => {
  const {
    timestamp,
    location,
    img,
    title,
    price,
    contactNo,
    sellerName,
    condition,
    model,
    Processor,
    yearsOfUsage,
    Brand,
    ram,
    HDD,
    SSD,
    description,
    _id,
  } = item;
  const [isOpen, setIsOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const tel = form.telephone.value;
    const location = form.location.value;
    console.log(tel, location, img, _id, title, price);

    // const buyerInfo = {
    //   email: user?.email,
    //   buy_id: _id,
    //   location: location,
    //   phone: tel,
    //   title,
    //   img,
    //   price,
    // };
    const buyerInfo = {
      email: user.email,
      buyId: _id,
      location: location,
      phone: tel,
      title,
      img,
      price,
    };
    const buyerRes = await axiosPublic.post("/buyerInfo", buyerInfo);
    console.log("buyerInfo", buyerRes.data);
    if (buyerRes.data.insertedId) {
      form.reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Your ${title} laptop has been booked`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      window.location.reload();
    }
  };
  return (
    <>
      <div
        key={i}
        className="flex flex-col w-full  gap-2 mb-3  rounded-md shadow-xl"
      >
        <div className="w-full">
          <div className="flex px-5">
            <p className="">
              <span className="italic text-slate-600">Posted on</span>{" "}
              {new Date(timestamp).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            ,<p>{location}</p>
          </div>
          <PhotoProvider>
            <PhotoView src={img}>
              <img
                src={img}
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
                {title}
              </h5>
              <p className="text-[#ecba04] font-semibold mb-2">
                <span className="">Price:</span>
                {price}
              </p>
              <p className="text-[#149777] font-semibold flex">
                <FaSquarePhone className="text-2xl" /> {contactNo}
              </p>
            </div>
          </div>
          <div className="w-full px-1 mt-2 mb-2 ">
            <div className="flex justify-between ">
              <div>
                <div>Seller:{sellerName}</div> <div>Condition:{condition}</div>
                <div>Model:{model}</div>
                <div>Processor:{Processor}</div>
              </div>

              <div>
                Years Of Usage:{yearsOfUsage} <div>Brand:{Brand}</div>
                <div>Ram:{ram}</div>
                <div>HDD:{HDD}</div>
                <div>SSD:{SSD}</div>
              </div>
            </div>
            <hr className="border-b-1 border-slate-300 " />
            <div className="mt-2 mb-2 h-[10%]">
              {" "}
              <span className="font-bold">Description:</span>
              {description}
            </div>
            <hr className="border-b-1 border-slate-300 " />
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <FcLike className=" text-2xl" />
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
                <p>Product:{title}</p>
                <p>Resale:price:{price}</p>
                <form
                  className="flex max-w-md flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="location1" value="Location" />
                    </div>
                    <TextInput
                      id="location1"
                      type="text"
                      name="location"
                      placeholder="Your location"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="tel1" value="Contact no" />
                    </div>
                    <TextInput
                      id="tel1"
                      type="tel"
                      name="telephone"
                      placeholder="Your phone no"
                      required
                    />
                  </div>

                  <Button type="submit" className="bg-[#149777]">
                    Submit
                  </Button>
                </form>

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
    </>
  );
};

export default BookLapItem;
