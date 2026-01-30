import Image from "next/image";

export const RoomInformationComponent = ({
  description = "", // Default to empty string
  id,
  title,
  handleClick,
  image,
}) => (
  <div>
    {/* RESTORED: Original class hierarchy */}
    <div className="all-messages-article" onClick={() => handleClick(id)}>
      <div className="rooms">
        <div className="room-container">
          <div className="room-image">
            <Image
              src={image || "/images/placeholder.png"} // Safety fallback
              width={55} // RESTORED: Original dimensions
              height={55}
              alt={title || "Room Image"}
            />
          </div>
          <div className="room-description">
            <h3 className="text-?? text-xs font-oswald font-bold pb-10">
              {title}
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

// Keep this as default export so RoomsList can import it easily
export default RoomInformationComponent;
