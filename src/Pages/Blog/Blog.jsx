import { useState } from "react";
import { data } from "./../../BlogData/BlogData";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  console.log(data);

  return (
    <div>
      {" "}
      <div className="headingBlog">
        {" "}
        <h1>Blog</h1>
      </div>
      <Helmet>
        <title>Resale Laptop | Blog</title>
      </Helmet>
      <div className="wrapper">
        <div className="accordion">
          {data.map((item, i) => (
            <div className="item" key={i}>
              <div className="title" onClick={() => toggle(i)}>
                <h2>{item.question}</h2>
                <span>{selected === i ? "-" : "+"}</span>
              </div>
              <div className={selected === i ? "content show" : "content"}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
