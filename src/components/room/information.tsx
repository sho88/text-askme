import Image from "next/image";

export const RoomInformationComponent = ({
  description = "",
  id,
  title,
  handleClick,
  image,
}) => (
  <div>
    <div className="all-messages-article" onClick={() => handleClick(id)}>
      <div className="rooms">
        <div className="room-container">
          <div className="room-image">
            <Image
              src={image || "/images/placeholder.png"}
              width={55}
              height={55}
              alt={title || "Room Image"}
            />
          </div>
          <div className="room-description">
            <h3 className="text-?? text-xs font-oswald font-bold pb-10">
              {title && title.length > 25
                ? title.substring(0, 25) + "..."
                : title}
            </h3>
            <p>
              {description && description.length > 70
                ? description.substring(0, 70) + "..."
                : description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RoomInformationComponent;
