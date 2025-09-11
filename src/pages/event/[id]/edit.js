import { readData } from "@/utils/database";
import { useEffect } from "react";

export default function Edit({ params }) {
  const { id } = params || { id: "-O2ExTyg2hihtzTC3bFp" };

  useEffect(() => {
    async function retrieveEvent() {
      try {
        const data = await readData("/rooms/" + id)
        console.log( data );
      } catch (error) {
        console.error(error);
      }
    }

    retrieveEvent()
  }, [id]);

  return <div>this is the edit page</div>;
}
