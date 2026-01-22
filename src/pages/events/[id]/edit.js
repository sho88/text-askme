import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import NameInput from "./NameInput"; // Correct for being in the same folder
import { readData } from "@/utils/mongo"; // Use @ alias to avoid path issues
import "@/styles/main.css";
import "@/styles/globals.css";

export default function EditPage({ room }) {
  if (!room) return <p className="text-black">Room not found.</p>;

  return (
    <div>
      <HeaderComponent />
      <div className="edit-page-layout">
        <NameInput initialData={room} />
      </div>
      <DashboardBottomNav />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const data = await readData("rooms", id);
    if (!data) return { props: { room: null } };

    return {
      props: {
        room: JSON.parse(JSON.stringify(data)),
      },
    };
  } catch (error) {
    console.error("Error fetching room:", error);
    return { props: { room: null } };
  }
}
