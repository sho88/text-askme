import { useRouter } from "next/router";

export const MenuOptionTitle = ({ label = "default", id }) => {
  const router = useRouter();
  const handleClick = () => {
    return router.push("/");
  };
  return (
    <button onClick={handleClick} id={id}>
      {label}
    </button>
  );
};
