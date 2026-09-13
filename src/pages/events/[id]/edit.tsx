import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import { EditEventForm } from "../../../components/edit-event-form/edit-event-form";
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
        <EditEventForm initialData={room} />
      </div>
      <DashboardBottomNav />
    </div>
  );
}

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
