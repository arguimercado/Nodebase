import { ReactNode } from "react";

const AppLayout = async ({ children }: { children: ReactNode }) => {


   return <main className="min-h-screen flex flex-col">{children}</main>;
};
export default AppLayout;
