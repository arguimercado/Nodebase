import { ReactNode } from "react"

const AuthLayout = ({children} : {children: ReactNode}) => {
  return (
    <main className="flex flex-col items-center justify-center gap-6 w-full min-h-screen px-4">
      {children}
    </main>
  )
}
export default AuthLayout