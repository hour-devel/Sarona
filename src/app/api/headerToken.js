import { getServerSession } from "next-auth";
import { authOption } from "./auth/[...nextauth]/route";

export const headerToken = async () => {
  const session = await getServerSession(authOption);
  return {
    Authorization: `Bearer ${session?.user?.accessToken}`,
    "Content-Type": "application/json",
  };
};
