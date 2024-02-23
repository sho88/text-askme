import { useRouter } from 'next/navigation'
import mainStyle from "@/styles/main.css";
import { useEffect, useState } from "react";

import DashboardComponent, { DashboardBody } from "@/components/dashboard";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";

export default function PageDashboardComponent() {

  // states and other properties go here...
  const router = useRouter();

  
  // hooks go here...
  useEffect(() => {
    console.log(`Dashboard component has loaded.`);
  })

  // events go here...
  const handleToggle = (event) => {
    return router.push(`/events/${event.__id}`);
  }


  return (
    <div>

      <div className={mainStyle['entire-dashboard-page']}>
        <DashboardComponent />
        <DashboardSearch />
        <DashboardBottomNav />
        {/* <DashboardImportantMessagesSection /> */}

        <DashboardBody
          title="something-random"
          onHandleToggle={handleToggle} />
      </div>

    </div>
  )
}
