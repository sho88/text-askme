// import the NextJS modules and custom util files you need...
import { useRouter } from "next/navigation";
import * as database from "@/utils/database";

// import the components you need...
import RoomMessagesComponent from "@/components/room/messages";
import { LayoutComponent } from "@/components/layout";

// import the custom hooks you need...
import useRoom from "@/hooks/room";

// import the necessary css/scss files you need...
import "@/components/live/style.css";

// retrieve server side props (that come from the url etc)
export async function getServerSideProps({ params }) {
  const room = await database.readData(`rooms/${params.id}`);

  return {
    props: {
      room: { id: params.id, ...room },
    },
  };
}

// the component for this page goes here...
export default function EventComponent({ room }) {
  // states and other properties go here...
  const router = useRouter();
  const { messages } = useRoom(room.id);

  // events...
  function handleToggle() {
    return router.push("/dashboard");
  }

  return (
    <div>
      <div className="chatPage">
        <LayoutComponent handleToggle={handleToggle} title={room.name}>
          <RoomMessagesComponent
            messages={messages}
            handleToggle={handleToggle}
          />
        </LayoutComponent>
      </div>
    </div>
  );
}
