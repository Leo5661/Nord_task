import { useMemo, useState } from "react";
import Nav from "../../components/Nav";
import PersonCard from "../../components/PersonCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../../api/FetchPeople";
import PageHandleButton from "../../components/PageHandleButton";
import { fetchSearchQuery } from "../../api/FetchSearchQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";

function Home() {
  const [searchParam, setSearchParm] = useState("");
  let [currentPage, setCurrentPage] = useState(1);
  const peopleList = useQuery(["peoples", currentPage], fetchPeople);
  const searchedList = useQuery(
    ["searchedList", searchParam],
    fetchSearchQuery
  );

  let pagedata = [];
  let isFirst;
  let isLast;

  const count = searchedList?.data?.count ?? 0;

  if (count == 0) {
    pagedata = peopleList?.data?.results ?? [];
    isFirst = peopleList?.data?.previous ? false : true;
    isLast = peopleList?.data?.next ? false : true;
  } else {
    pagedata = searchedList?.data?.results ?? [];
    isFirst = searchedList?.data?.previous ? false : true;
    isLast = searchedList?.data?.next ? false : true;
  }

  const noPeopleFound = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <FontAwesomeIcon
        className="h-10 w-12"
        icon={faAndroid}
        bounce
        style={{ color: "#d35555" }}
      />
      <div className="text-gray-400">No match found try somthing else.</div>
    </div>
  );

  const loadingData = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <FontAwesomeIcon
        className="h-12 w-12"
        icon={faAndroid}
        fade
        style={{ color: "#519a5d" }}
      />
      <div className="text-gray-400">Finding your request in Archive.</div>
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
            value={searchParam}
            placeholder="Search by name"
            onChange={(e) => handleOnSearchParmChange(e)}
          />
        </div>
        <div className="flex h-screen w-full items-start justify-start gap-4 overflow-y-auto overflow-x-hidden">
          <div className="relative flex h-full w-10 items-center justify-around">
            <div className="absolute top-[100px] w-56 rotate-[-90deg] transform-gpu	overflow-hidden text-justify align-baseline text-sm font-normal tracking-wider text-green-500 antialiased">
              {peopleList.isLoading || searchedList.isLoading
                ? "Loading..."
                : `Results of ${searchParam} People's`}
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
              {peopleList.isLoading
                ? loadingData
                : pagedata.length == 0
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
