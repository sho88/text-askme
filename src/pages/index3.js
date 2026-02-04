import { useContext } from "react";
import Provider2 from "@/context/app";
import { theFather } from "@/context/app";

export const notLocal = () => {
  const handlePlus = () => {
    theFather.dispatch("increment");
  };

  const handleMinus = () => {
    dispatch("decrement");
  };

  const handleReset = () => {
    dispatch("reset");
  };

  return (
    <Provider2>
      <button onClick={handlePlus}>Plus 2</button>
      <button onClick={handleMinus}>Minus 3</button>
      <button onClick={handleReset}>Reset</button>
    </Provider2>
  );
};

export default notLocal;
