import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import DetailedPersonCard from "../../components/DetailedPersonCard";
import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchPerson } from "../../api/FetchPerson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { fetchStarships } from "../../api/FetchStarships";
import { fetchHomeworld } from "../../api/FetchHomeworld";
import { fetchFilms } from "../../api/FetchFilms";
import { fetchVehicles } from "../../api/FetchVehicles";

function Person() {
  const { id } = useParams();
  const person = useQuery(["person", id], fetchPerson);
  const homeworld = useQuery({
    queryKey: ["homeworld", person?.data?.homeworld],
    queryFn: fetchHomeworld,
    enabled: !!person.data,
  });

  const starships = useQueries({
    queries: person.isSuccess
      ? person.data.starships.map((starshipUrl) => {
          return {
            queryKey: ["starship", starshipUrl],
            queryFn: fetchStarships,
            enabled: !!person.data,
          };
        })
      : [],
  });
  const films = useQueries({
    queries: person.isSuccess
      ? person.data.films.map((filmUrl) => {
          return {
            queryKey: ["film", filmUrl],
            queryFn: fetchFilms,
            enabled: !!person.data,
          };
        })
      : [],
  });
  const vehicles = useQueries({
    queries: person.isSuccess
      ? person.data.vehicles.map((vehicleUrl) => {
          return {
            queryKey: ["vehicle", vehicleUrl],
            queryFn: fetchVehicles,
            enabled: !!person.data,
          };
        })
      : [],
  });

  const isMultiQueriesSuccess = [starships, vehicles, films].every((queries) =>
    queries.every((query) => query.isSuccess)
  );

  const isMultiQueriesError = [starships, vehicles, films].some((queries) =>
    queries.some((query) => query.isError)
  );

  const noPersonFound = (
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
              {person.error || isMultiQueriesError
                ? `No person found`
                : person.isLoading || !isMultiQueriesSuccess
                ? "Loading..."
                : `Results of ${person.data.name}`}
            </div>
            <div className="absolute right-0 h-full w-1 bg-green-500"></div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-start justify-center gap-10">
              {person.error || isMultiQueriesError ? (
                noPersonFound
              ) : person.isLoading ||
                !isMultiQueriesSuccess ||
                homeworld.isLoading ? (
                loadingData
              ) : (
                <DetailedPersonCard
                  key={person.data.name}
                  name={person.data.name}
                  dob={person.data.birth_year}
                  gender={person.data.gender}
                  height={person.data.height}
                  mass={person.data.mass}
                  hair_color={person.data.hair_color}
                  eye_color={person.data.eye_color}
                  skin_color={person.data.skin_color}
                  species={person.data.species}
                  noOfStarship={person.data.starships.length}
                  starships={starships.map((starship) => starship.data.name)}
                  noOfVehicles={person.data.vehicles.length}
                  vehicles={vehicles.map((vehicle) => vehicle.data.name)}
                  noOfFilms={person.data.films.length}
                  films={films.map((film) => film.data.title)}
                  homeworld={homeworld.isSuccess ? homeworld.data.name : ""}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Person;