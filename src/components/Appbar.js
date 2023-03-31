import React from "react";
import { useState } from "react";
import User from "./User";

function Appbar({nameTag}) {

    const [currentPage, setCurrentPage] = useState("menu");

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(page);
    };

    

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: 64,
          backgroundColor: "lightblue",
          opacity: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 1,
        }}
      >
        <img
          src="Sailing.png"
          alt="Segelschiff-Icon"
          style={{ height: 74 }}
        />
        <h2>{nameTag}</h2>
        <button onClick={() => handlePageChange("user")}>User</button>
      </div>
      {currentPage === "user" && <User onClick={handlePageChange} />}
    </>
  );
}

export default Appbar;
