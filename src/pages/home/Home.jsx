import { useState } from "react";
import Nav from "../../components/Nav";
import PersonCard from "../../components/PersonCard";

function Home() {
  const [searchParm, setSearchParm] = useState(null);

  const handleOnSearchParmChange = (e) => {
    e.preventDefault();
    setSearchParm(e.target.value);
  };

  return (
    <div>
      <Nav />
      <div className="w-100% flex flex-col items-start justify-start gap-4 overflow-hidden overflow-y-auto overflow-x-hidden bg-slate-700">
        <div className="mt-2 flex w-full justify-center">
          <input
            className="focus:shadow-outline w-3/5 appearance-none rounded-lg border-b border-t border-b-rose-400 border-t-blue-700 bg-transparent p-2 text-base text-green-400 placeholder-green-500 shadow-lg focus:outline-none"
            type="text"
            name="name"
            value={searchParm}
            placeholder="Search by name"
            onChange={(e) => handleOnSearchParmChange(e)}
          />
        </div>
        <div className="flex h-screen w-full items-start justify-start gap-4 overflow-y-auto overflow-x-hidden">
          <div className="flex h-full w-10 items-center justify-around">
            <div className="w-5	rotate-[270deg] transform-gpu text-justify text-sm font-normal tracking-wider text-green-500 antialiased">
              Loading...
            </div>
            <div className="h-full w-1 bg-green-500"></div>
          </div>
          <PersonCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
