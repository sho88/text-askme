import DashboardComponent from "@/components/dashboard";
import { Head, Body, Input, MessageTime, MessageShape, MessageShape2 } from "@/components/live";
import Questions from "@/components/questions";
import Users from "@/components/users";
import { useUsers } from "@/hooks/users";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage";
import { getImgProps } from "next/dist/shared/lib/get-img-props";

export default function Index() {


  return (
    <div>
      <Head />
      <Input />
      <Body />

    </div>
  )
}




