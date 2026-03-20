import { useRouter } from "next/router";

export const MenuOptionTitle = ({ label = "default", id, menLink }) => {
  const router = useRouter();
  const handleClick = () => {
    return router.push(menLink);
  };
  return (
    <button onClick={handleClick} id={id}>
      {label}
    </button>
  );
};
