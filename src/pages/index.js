import DashboardComponent from "@/components/dashboard";
import Users from "@/components/users";
import { useUsers } from "@/hooks/users";

export default function Index() {
  const [, users] = useUsers();

  return (
    <div>
      {/* <DashboardComponent /> */}
      <hr />
      <Users data={users} />
    </div>
  )
}
