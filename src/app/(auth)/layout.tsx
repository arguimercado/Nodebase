import { ReactNode } from "react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-8">
      <div className="flex flex-row items-center self-center gap-2">
        <Image src="/images/logo.svg" alt="Logo" width={50} height={50} />
        <p>Node Base</p>
      </div>
      {children}
    </main>
  );
};
export default AuthLayout;
