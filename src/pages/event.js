import "@/components/live/style.css";
import {
  Head,
  Body,
  Input,
  ProFilePicture,
} from "@/components/live";
import { useRouter } from "next/navigation";

export default function EventComponent() {
  
  // states and other properties go here...
  const router = useRouter();


  // events go here...
  const handleToggle = () => {
    return router.push('/dashboard');
  }

  return (
    <div>
      <div className="chatPage">
        <Head onHandleToggle={handleToggle} />
        <Input />
        <ProFilePicture />
        <Body />
      </div>
    </div>
  )

}
