import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import { EditEvent } from "./NameInput";
import { readData } from "@/utils/mongo";
import "@/styles/main.css";
import "@/styles/globals.css";
import { notFound } from "next/navigation";

export default function EditPage({ room }) {
  if (!room) return <p className="text-black">Room not found.</p>;

  return (
    <div>
      <HeaderComponent />
      <div className="edit-page-layout">
        <EditEvent initialData={room} />
      </div>
      <DashboardBottomNav />
    </div>
  );
}

// Server-side data fetching function... for pre-populating the edit form in the Edit Page Component
// export async function getServerSideProps(context) {
//   const { id } = context.params;

//   try {
//     const data = await readData("rooms", id);
//     if (!data) return { props: { room: null } };

//     return {
//       props: {
//         room: JSON.parse(JSON.stringify(data)),
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching room:", error);
//     return { props: { room: null } };
//   }
// }

export const getServerSideProps = async (context) => {
  const { params } = context;

  try {
    const dataFromServer = await readData("rooms", params.id);

    if (!dataFromServer)
      return {
        notFound: true,
      };

    return {
      props: {
        room: JSON.parse(JSON.stringify(dataFromServer)),
      },
    };
  } catch (err) {
    console.error(err.message, "error. this is a string type...");
    return {
      props: {
        notFound: true,
      },
    };
  }
};
