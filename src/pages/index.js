import DashboardComponent, {
  DashboardBottomNav,
  DashboardInput,
  DashboardSearch,
  DashboardBody,
  DashboardImportantMessagesSection,
} from "@/components/dashboard";
import {
  Head,
  Body,
  Input,
  MessageTime,
  MessageShape,
  MessageShape2,
  TextAreaInput,
  ProFilePicture,
} from "@/components/live";
import Questions from "@/components/questions";
import Users from "@/components/users";
import { useUsers } from "@/hooks/users";
import App from "next/app";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage";
import { getImgProps } from "next/dist/shared/lib/get-img-props";

export default function Index() {
  return (
    <div>
      <div className="chatPage">
        <Head />
        <Input />
        <ProFilePicture />
        <Body />
      </div>

      <div className="entire-dashboard-page">
        <DashboardComponent />
        <DashboardSearch />
        <DashboardBottomNav />
        <DashboardImportantMessagesSection />
        <DashboardBody />
      </div>
    </div>
  );
}
