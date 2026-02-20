import { wSkillsPrisma } from "@/lib/db";
import { isSkillAuthor } from "@/lib/user";
import Link from "next/link";
import { forbidden, redirect } from "next/navigation";

export default async function NewSectionPage(
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {

	const { id } = await params;

	if (!isSkillAuthor(parseInt(id))) {
		forbidden();
	}

	return (
		<div>
			<h1>New Section</h1>

			<form
				action={async (formData: FormData) => {
					"use server";
					const sectionName = formData.get("sectionName") as string;
					if (typeof sectionName !== "string" || sectionName.trim() === "") {
						return;
					}
					const section = await wSkillsPrisma.section.create({
						data: {
							name: sectionName,
							skill: {
								connect: {
									id: parseInt(id),
								},
							},
							content: "",
						},
					});
					redirect(`/skills/${id}/sections/${section.id}/edit`);
				}}
			>
				<div>
					<label htmlFor="sectionName">セクション名</label>
					<input type="text" id="sectionName" name="sectionName" required />
				</div>
				<button type="submit">保存</button>
				&nbsp;
				<Link href={`/skills/${id}`}>キャンセル</Link>
			</form>
		</div>
	)

}