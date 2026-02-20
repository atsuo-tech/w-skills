import { getCurrentUser } from "@/lib/user";
import { Sidebar } from "./sidebar";
import { redirect } from "next/navigation";

export default async function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("https://auth.w-pcp.dev/");
	}

	return (
		<Sidebar username={currentUser.username}>
			{children}
		</Sidebar>
	);

}
