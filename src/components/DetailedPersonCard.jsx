import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { fetchSpecie } from "../api/FetchSpecies";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

function DetailedPersonCard({
  name,
  dob,
  gender,
  height,
  mass,
  hair_color,
  eye_color,
  skin_color,
  species,
  noOfStarship,
  starships,
  noOfVehicles,
  vehicles,
  noOfFilms,
  films,
  homeworld,
}) {
  let specieName = null;
  if (species.length != 0) {
    const result = useQuery(["specie", species[0]], fetchSpecie);
    specieName = result?.data?.name;
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 rounded p-4 shadow-lg shadow-slate-800">
      <div className="flex items-center gap-4 self-stretch border-b-4 border-green-500 p-4">
        {(() => {
          switch (specieName) {
            case "Droid":
              return (
                <FontAwesomeIcon
                  className="h-20 w-20"
                  icon={faAndroid}
                  bounce
                  style={{ color: "#9bd7e4" }}
                />
              );
            case "Human":
              return (
                <FontAwesomeIcon
                  className="h-20 w-20"
                  icon={faCircleUser}
                  beat
                  style={{ color: "#5bb39d" }}
                />
              );
            default:
              return (
                <FontAwesomeIcon
                  className="h-20 w-20"
                  icon={faQuestion}
                  beatFade
                  style={{ color: "#b95941" }}
                />
              );
          }
        })()}
        <div className="flex flex-grow flex-col justify-start">
          <div className="text-4xl	font-bold	tracking-wide text-green-500">
            {name}
          </div>
        </div>
      </div>

      <div className="flex text-2xl text-green-300">Personal Details</div>

      <div className="flex flex-col justify-between text-lg">
        <div className="flex text-lg">
          <span className="font-light text-gray-400">DOB:</span>{" "}
          <span className="text-white">{dob}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Gender:</span>{" "}
          <span className="capitalize text-white">{gender}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Homeworld:</span>{" "}
          <span className="capitalize text-white">{homeworld}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Specie:</span>{" "}
          <span className="capitalize text-white">
            {specieName ? specieName : "Unknown"}
          </span>
        </div>
      </div>

      <div className="flex text-2xl text-green-300">Physical Traits</div>

      <div className="flex flex-col justify-between text-lg">
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Height:</span>{" "}
          <span className="text-white">{height}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Mass:</span>{" "}
          <span className="capitalize text-white">{mass}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Hair color:</span>{" "}
          <span className="capitalize text-white">{hair_color}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Eye color:</span>{" "}
          <span className="capitalize text-white">{eye_color}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Skin color:</span>{" "}
          <span className="capitalize text-white">{skin_color}</span>
        </div>
      </div>

      {noOfStarship > 0 && (
        <div>
          <div className="flex text-2xl text-green-300">
            Starships ({noOfStarship})
          </div>
          <div className="flex flex-col justify-between text-lg">
            {starships.map((starship) => (
              <div className="flex text-lg text-white" key={starship}>{starship}</div>
            ))}
          </div>
        </div>
      )}

      {noOfVehicles > 0 && (
        <div>
          <div className="flex text-2xl text-green-300">
            Vehicles ({noOfVehicles})
          </div>
          <div className="flex flex-col justify-between text-lg">
            {vehicles.map((vehicle) => (
              <div className="flex text-lg text-white" key={vehicle}>{vehicle}</div>
            ))}
          </div>
        </div>
      )}

      {noOfFilms > 0 && (
        <div>
          <div className="flex text-2xl text-green-300">
            Films ({noOfFilms})
          </div>
          <div className="flex flex-col justify-between text-lg">
            {films.map((film) => {
              return <div className="flex text-lg text-white" key={film}>{film}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailedPersonCard;
