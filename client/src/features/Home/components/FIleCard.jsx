import React from "react";

const FIleCard = ({ item }) => {
  const handleDelete = async (file) => {
    const res = await fetch("http://localhost:3000", {
      method: "DELETE",
      body: file,
    });
    const data = await res.text()
    console.log(data);
  };
  return (
    <div className="bg-black text-white my-4 rounded-3xl p-4 w-4/5 mx-auto  ">
      <p className="text-red-800 text-2xl">{item}</p>
      <div className="my-2">
        <a
          to={"/hello.txt"}
          className="bg-green-500 p-1 rounded-2xl px-2 mr-4 "
        >
          download
        </a>
        <a className="bg-purple-500 p-1 rounded-2xl px-2 mr-4 ">Preview</a>
        <a
          onClick={() => handleDelete(item)}
          className="bg-red-500 p-1 rounded-2xl px-2 mr-4 "
        >
          Delete
        </a>
        <a className="bg-emerald-500 p-1 rounded-2xl px-2 mr-4 ">Rename</a>
      </div>
    </div>
  );
};

export default FIleCard;
