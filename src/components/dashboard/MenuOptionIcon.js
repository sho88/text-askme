import Image from "next/image";

export const MenuOptionIcon = ({ imageUrl }) => {
  return (
    <div>
      <Image
        src={imageUrl}
        className="menu-open-option-icon"
        alt="Icon of home"
        width={50}
        height={50}
      ></Image>
    </div>
  );
};
