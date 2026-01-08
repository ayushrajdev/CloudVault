import React from "react";
import ShowFiles from "./features/Home/page";

const App = () => {
  return (
    <div className="bg-gray-800">
      <h1 className="text-5xl bold text-center mb-8 pt-8 text-white font-bold capitalize">
        Your files are here
      </h1>
      <ShowFiles />
    </div>
  );
};

export default App;
