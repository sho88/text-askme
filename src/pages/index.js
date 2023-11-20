import DashboardComponent, {
  DashboardInput,
  DashboardBody,
  DashboardImportantMessagesSection,
} from "@/components/dashboard";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
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
import { useState } from "react";

export default function Index() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = (state) => {
    console.log(state);
    setToggle(state);
  };

  return (
    <div>
      {toggle ? (
        <div className="chatPage">
          <Head onHandleToggle={handleToggle} />
          <Input />
          <ProFilePicture />
          <Body />
        </div>
      ) : null}

      {!toggle ? (
        <div className="entire-dashboard-page">
          <DashboardComponent />
          <DashboardSearch />
          <DashboardBottomNav />
          {/* <DashboardImportantMessagesSection /> */}
          <DashboardBody
            title="something-random"
            onHandleToggle={handleToggle}
          />
        </div>
      ) : null}
    </div>
  );
}
