import Image from "next/image";

export const RoomInformationComponent = ({
  description,
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
            {/* <div> {image} </div> */}
            <Image
              src="/images/ryan-young.jpeg"
              width={55}
              height={55}
              alt="Picture of the author"
            />
          </div>
          <div className="room-description">
            <h3 className="text-?? text-xs font-oswald font-bold pb-10">
              {title}
            </h3>
            <p>
              {description.length && description.length > 200
                ? description.substring(0, 70) + "..."
                : description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
