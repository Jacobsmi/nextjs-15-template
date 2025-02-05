import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import SidebarUserMenu from "./SidebarUserMenu";

export default async function AppSidebar() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu
          firstName={userData.user?.user_metadata.first_name}
          lastName={userData.user?.user_metadata.last_name}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
