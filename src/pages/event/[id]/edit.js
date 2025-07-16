import { readData } from "@/utils/database";
import { useEffect } from "react";

export default function Edit({ params }) {
  const { id } = params || { id: "-O2ExTyg2hihtzTC3bFp" };
  console.log(params);
  useEffect(() => {
    readData("/events/" + id)
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>this is the edit page</div>;
}
