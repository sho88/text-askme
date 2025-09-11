import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import HeaderComponent from "@/components/header";
import { readData } from "@/utils/database";
import { useEffect } from "react";
import { NameInput } from "./NameInput";
import "@/styles/main.css";
import "@/styles/globals.css";

export default function Edit({ params }) {
  const { id } = params || { id: "-O2ExTyg2hihtzTC3bFp" };
  console.log(params);
  useEffect(() => {
    readData("/events/" + id)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <HeaderComponent />
      <DashboardBottomNav />
      <NameInput />
    </div>
  );
}
