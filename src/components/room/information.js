export const RoomInformationComponent = ({
  description,
  id,
  title,
  handleClick,
}) => (
  <div>
    {" "}
    <div
      className="all-messages-article"
      onClick={() => handleClick(id)}
    >
      <div className="dasboard-article-info-container">
        {/* RESUME WORK HERE */}
        <h3 className="text-?? text-2xl font-oswald font-bold mt-10 mb-5">
          {title}
        </h3>
        <p>{
          description.length && description.length > 200
          ? description.substring(0, 200) + '...'
          : description
        }</p>
      </div>
    </div>
  </div>
);
