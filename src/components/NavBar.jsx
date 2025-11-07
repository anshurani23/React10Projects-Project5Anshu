import React from "react";

const NavBar = () => {
  return (
    <div className="my-2 flex h-[60px] items-center justify-center gap-2 rounded-lg bg-white text-xl font-medium">
      <img src="/logos_firebase.svg" alt="fire-logo" />
      <h1>Firebase Contact App</h1>
    </div>
  );
};

export default NavBar;
