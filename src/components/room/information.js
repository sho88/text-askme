export const RoomInformationComponent = ({
  description,
  id,
  name,
  onRoomClick,
}) => (
  <div>
    {" "}
    <div
      className="all-messages-article"
      // onContextMenu={() => onRoomClick(id)}
      onClick={() => onRoomClick(id)}
    >
      <div className="dasboard-article-info-container">
        {/* RESUME WORK HERE */}
        <h3 className="text-?? text-2xl font-oswald font-bold mt-10 mb-5">
          {name}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
);
