import React from "react";

function Nav() {
  return (
    <nav className="sticky top-0 z-10 flex w-full gap-2 bg-slate-800">
      <img className="ms-8 h-14 w-14" src="/bby_yoda.png" alt="logo" />
      <div className="flex items-center justify-center gap-2">
        <img className="h-6 w-24" src="/starwar.png" alt="star wars logo" />
        <div className="align-baseline text-lg font-bold tracking-wide text-sky-700 antialiased">
          Archive
        </div>
      </div>
    </nav>
  );
}

export default Nav;
