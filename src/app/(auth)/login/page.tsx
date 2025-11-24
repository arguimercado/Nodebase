import LoginForm from "./_features/components/login-form";
import { requireUnAuth } from "@/lib/auth-util"


const LoginPage = async () => {
  await requireUnAuth();
  return (
    <LoginForm />
  )
}
export default LoginPage