import { useContext, useEffect } from "react";
import Provider, { TheFatherContext } from "@/context/app";


// Meh...buttons component
const ButtonsComponent = () => {
  const { dispatch, state } = useContext(TheFatherContext);

  return (
    <div>
      <p>Value: {state}</p>
      <button onClick={() => dispatch("increment")}>Plus 2</button>
      <button onClick={() => dispatch("decrement")}>Minus 3</button>
      <button onClick={() => dispatch("reset")}>Reset</button>
    </div>
  )
}


// Default Index3 component to be exported...
export const Index3 = () => {
  return (
    <Provider>
      <ButtonsComponent />
    </Provider>
  );
};

export default Index3;
