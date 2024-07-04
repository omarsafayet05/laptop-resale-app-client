import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import "react-photo-view/dist/react-photo-view.css";

import Modal from "styled-react-modal";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

import { useState } from "react";

import BookLapItem from "../Shared/BookLapItem";
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

  return (
    <>
      <div className="min-h-screen">
        <h1 className="m-[8%] text-center text-slate-950 text-3xl text-bold">
          Laptops By Brand
        </h1>

        <div className="grid grid-cols-2">
          {lapItems.map((item, i) => (
            <BookLapItem key={i} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LapItems;
