import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

// Improved Layout function
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      // If no session or email, redirect to home
      redirect("/");
    }

    const email = session.user.email;
    
    // Fetching the user data based on email
    const res = await fetch(`http://localhost:3001/api/users/email/${email}`);

    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await res.json();

    // Redirecting if the user is not an admin
    if (data.role !== "admin") {
      redirect("/");
    }

    return <>{children}</>;

  } catch (error) {
    // Handle any errors, including fetch failures or session errors
    toast.error("An error occurred while loading your session.");
    redirect("/");
  }
}
