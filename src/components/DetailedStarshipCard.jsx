import { faSpaceAwesome } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DetailedStarshipCard({
  name,
  model,
  starship_class,
  manufacturer,
  cost_in_credits,
  length,
  crew,
  passengers,
  max_atmosphering_speed,
  hyperdrive_rating,
  MGLT,
  cargo_capacity,
  consumables,
  noOfFilms,
  films,
  noOfPilots,
  pilots,
}) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 rounded p-4 shadow-lg shadow-slate-800">
      <div className="flex items-center gap-4 self-stretch border-b-4 border-green-500 p-4">
        {
          <FontAwesomeIcon
            className="h-20 w-20"
            icon={faSpaceAwesome}
            beatFade
            style={{ color: "#f7eded" }}
          />
        }
        <div className="flex flex-grow flex-col justify-start">
          <div className="text-4xl font-bold tracking-wide text-green-500">
            {name}
          </div>
        </div>
      </div>

      <div className="flex text-2xl text-green-300">General Details</div>

      <div className="flex flex-col justify-between text-lg">
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Model:</span>{" "}
          <span className="text-white">{model}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Starship Class:</span>{" "}
          <span className="capitalize text-white">{starship_class}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Manufacturer:</span>{" "}
          <span className="capitalize text-white">{manufacturer}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Cost:</span>{" "}
          <span className="capitalize text-white">{`${cost_in_credits} credits`}</span>
        </div>
      </div>

      <div className="flex text-2xl text-green-300">Capacity</div>

      <div className="flex flex-col justify-between text-lg">
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Crew:</span>{" "}
          <span className="text-white">{`${crew} minimum required`}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Passengers:</span>{" "}
          <span className="capitalize text-white">{`${passengers} maximum`}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Cargo Capacity:</span>{" "}
          <span className="capitalize text-white">{`${cargo_capacity} kilograms`}</span>
        </div>
      </div>

      <div className="flex text-2xl text-green-300">Specs</div>

      <div className="flex flex-col justify-between text-lg">
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Length:</span>{" "}
          <span className="capitalize text-white">{`${length} meters`}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Hyperdrive Rating:</span>{" "}
          <span className="capitalize text-white">{hyperdrive_rating}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">
            Max Atmosphering Speed:
          </span>{" "}
          <span className="capitalize text-white">
            {max_atmosphering_speed}
          </span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">Consumables:</span>{" "}
          <span className="capitalize text-white">{consumables}</span>
        </div>
        <div className="flex text-lg">
          <span className="font-light text-gray-400">MGLT:</span>{" "}
          <span className="capitalize text-white">{MGLT}</span>
        </div>
      </div>

      {noOfFilms > 0 && (
        <div>
          <div className="flex text-2xl text-green-300">
            Films ({noOfFilms})
          </div>
          <div className="flex flex-col justify-between text-lg">
            {films.map((film) => {
              return (
                <div className="flex text-lg text-white" key={film}>
                  {film}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {noOfPilots > 0 && (
        <div>
          <div className="flex text-2xl text-green-300">
            Pilots ({noOfPilots})
          </div>
          <div className="flex flex-col justify-between text-lg">
            {pilots.map((pilot) => {
              return (
                <div className="flex text-lg text-white" key={pilot}>
                  {pilot}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailedStarshipCard;
