import { useMemo, useState } from "react";
import Nav from "../../components/Nav";
import PersonCard from "../../components/PersonCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../../api/FetchPeople";
import PageHandleButton from "../../components/PageHandleButton";
import { fetchSearchQuery } from "../../api/FetchSearchQuery";

function Home() {
  const [searchParm, setSearchParm] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  const results = useQuery(["peoples", currentPage], fetchPeople);

  //need to add search feature
  const searchedList = useQuery(["searchedList", searchParm], fetchSearchQuery);

  const pagedata = results?.data?.results ?? [];
  const isFirst = results?.data?.previous ? false : true;
  const isLast = results?.data?.next ? false : true;

  const noPeopleFound = (
    <div className="flex h-full w-full items-center justify-center">
      No people found on archive.
    </div>
  );

  const handleOnSearchParmChange = (e) => {
    e.preventDefault();
    setSearchParm(e.target.value);
  };

  const handleNextClick = () => {
    ++currentPage;
    setCurrentPage(currentPage);
  };

  const handlePreviousClick = () => {
    --currentPage;
    setCurrentPage(currentPage);
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
          <div className="relative flex h-full w-10 items-center justify-around">
            <div className="absolute top-[100px] w-56 rotate-[-90deg] transform-gpu	overflow-hidden text-justify align-baseline text-sm font-normal tracking-wider text-green-500 antialiased">
              {results.isLoading ? "Loading..." : "Results of all People's"}
            </div>
            <div className="absolute right-0 h-full w-1 bg-green-500"></div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex justify-end pr-4">
              <PageHandleButton
                currentPage={currentPage}
                isFirst={isFirst}
                isLast={isLast}
                onNextClick={handleNextClick}
                onPreviousClick={handlePreviousClick}
              />
            </div>
            <div className="flex flex-wrap items-start justify-center">
              {results.isLoading || pagedata.length == 0
                ? noPeopleFound
                : pagedata.map((item) => {
                    return (
                      <PersonCard
                        key={item.name}
                        name={item.name}
                        dob={item.birth_year}
                        gender={item.gender}
                        height={item.height}
                        mass={item.mass}
                        hair_color={item.hair_color}
                        eye_color={item.eye_color}
                        skin_color={item.skin_color}
                        species={item.species}
                        noOfStarship={item.starships.length}
                        noOfVehicles={item.vehicles.length}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
