function PersonCard({
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
  noOfVehicles,
}) {
  return (
    <div className="m-4 flex min-h-[350px] w-[300px] flex-col items-start justify-start gap-2 rounded border-y border-lime-900 p-4 shadow">
      <div className="flex items-center gap-4 self-stretch">
        <img className="h-16 w-16 rounded-full" src="" alt="person pic" />
        <div className="flex flex-grow flex-col justify-start">
          <div className="text-lg	font-medium	tracking-wide text-green-500">
            {name}
          </div>
          <div className="flex w-full justify-between">
            <div className="text-xs	font-light text-white">{`DOB: ${dob}`}</div>
            <div className="text-sm	font-medium text-gray-300">{gender}</div>
          </div>
        </div>
      </div>

      <div className="h-px w-full self-stretch bg-green-400 opacity-25"></div>

      <div className="w-full border-b border-l border-green-900 p-2 text-xs font-light text-gray-400">
        Body Type
      </div>
      <div className="flex w-4/5 flex-col items-start justify-center gap-2">
        <div className="flex flex-grow text-xs font-light text-gray-400">
          Height: <span className="ms-2 text-white">{height}</span>
        </div>
        <div className="flex flex-grow text-xs font-light text-gray-400">
          Mass: <span className="ms-2 text-white">{mass}</span>
        </div>
        <div className="flex flex-grow text-xs font-light text-gray-400">
          Hair color: <span className="ms-2 text-white">{hair_color}</span>
        </div>

        <div className="flex flex-grow text-xs font-light text-gray-400">
          Eye color: <span className="ms-2 text-white">{eye_color}</span>
        </div>
        <div className="flex flex-grow text-xs font-light text-gray-400">
          Skin color: <span className="ms-2 text-white">{skin_color}</span>
        </div>
      </div>
      <div className="w-full border-b border-l border-green-900 p-2 text-xs font-light text-gray-400">
        Species
      </div>
      <div className="flex w-full justify-between border-b border-l border-green-900 p-2 text-xs font-light text-gray-400">
        <div className="text-xs font-light text-gray-400">Starship</div>
        <div className="text-sm font-normal text-green-500">{noOfStarship}</div>
      </div>
      <div className="flex w-full justify-between border-b border-l border-green-900 p-2 text-xs font-light text-gray-400">
        <div className="text-xs font-light text-gray-400">Vehicles</div>
        <div className="text-sm font-normal text-green-500">{noOfVehicles}</div>
      </div>
    </div>
  );
}

export default PersonCard;
