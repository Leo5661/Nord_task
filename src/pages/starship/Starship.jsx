import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import DetailedStarshipCard from "../../components/DetailedStarshipCard";
import { useQuery, useQueries } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { fetchStarships } from "../../api/FetchStarships";
import { fetchFilms } from "../../api/FetchFilms";
import { fetchPerson } from "../../api/FetchPerson";

function Starship() {
  const { id } = useParams();
  const starship = useQuery(["starship", id], fetchStarships);
  const person = useQueries({
    queries: starship.isSuccess
      ? starship.data.pilots.map((pilotUrl) => {
          return {
            queryKey: ["film", pilotUrl.split("/").slice(-2, -1)[0]],
            queryFn: fetchPerson,
            enabled: !!starship.data,
          };
        })
      : [],
  });

  const films = useQueries({
    queries: starship.isSuccess
      ? starship.data.films.map((filmUrl) => {
          return {
            queryKey: ["film", filmUrl],
            queryFn: fetchFilms,
            enabled: !!starship.data,
          };
        })
      : [],
  });

  const isMultiQueriesSuccess = [films, person].every((queries) =>
  queries.every((query) => query.isSuccess)
);

  const isMultiQueriesError = [films, person].some((queries) =>
  queries.some((query) => query.isError)
);

  const noStarshipFound = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <FontAwesomeIcon
        className="h-10 w-12"
        icon={faAndroid}
        bounce
        style={{ color: "#d35555" }}
      />
      <div className="text-gray-400">No match found try something else.</div>
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

  return (
    <div>
      <Nav />
      <div className="w-100% flex flex-col items-start justify-start gap-4 overflow-hidden overflow-y-auto overflow-x-hidden bg-slate-700 pr-5 pt-16">
        <div className="flex h-screen w-full items-start justify-start gap-4 overflow-y-auto overflow-x-hidden">
          <div className="relative flex h-full w-10 items-center justify-around">
            <div className="absolute top-[150px] w-56 rotate-[-90deg] transform-gpu	overflow-hidden text-justify align-baseline text-sm font-normal tracking-wider text-green-500 antialiased">
              {starship.error || isMultiQueriesError
                ? `No starship found`
                : starship.isLoading || !isMultiQueriesSuccess
                ? "Loading..."
                : `Results of ${starship.data.name}`}
            </div>
            <div className="absolute right-0 h-full w-1 bg-green-500"></div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-start justify-center gap-10">
              {starship.error || isMultiQueriesError ? (
                noStarshipFound
              ) : starship.isLoading ||
                !isMultiQueriesSuccess ? (
                loadingData
              ) : (
                <DetailedStarshipCard
                  key={starship.data.name}
                  name={starship.data.name}
                  model={starship.data.model}
                  starship_class={starship.data.starship_class}
                  manufacturer={starship.data.manufacturer}
                  cost_in_credits={starship.data.cost_in_credits}
                  length={starship.data.length}
                  crew={starship.data.crew}
                  passengers={starship.data.passengers}
                  max_atmosphering_speed={starship.data.max_atmosphering_speed}
                  hyperdrive_rating={starship.data.hyperdrive_rating}
                  MGLT={starship.data.MGLT}
                  cargo_capacity={starship.data.cargo_capacity}
                  consumables={starship.data.consumables}
                  noOfFilms={starship.data.films.length}
                  films={films.map((film) => film.data.title)}
                  noOfPilots={starship.data.pilots.length}
                  pilots={person.map((pilot) => pilot.data.name)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Starship;