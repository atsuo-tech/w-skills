import { wSkillsPrisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function SkillEditPage(
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {

	const { id } = await params;

	const currentUser = await getCurrentUser();

	const skill = await wSkillsPrisma.skill.findUnique({
		where: {
			id: parseInt(id),
		},
		select: {
			name: true,
			description: true,
			createdAt: true,
			updatedAt: true,
			authorUniqueId: true,
			published: true,
		},
	});

	if (!skill || skill.authorUniqueId !== currentUser?.uniqueId) {
		notFound();
	}

	return (
		<div>
			<h1>スキルを編集</h1>

			<form
				action={async (formData) => {
					"use server";

					const skillName = formData.get("skillName") as string;
					const skillDescription = formData.get("skillDescription") as string;
					const published = formData.get("published") === "true";

					if (typeof skillName !== "string" || typeof skillDescription !== "string") {
						notFound();
					}

					const currentUser = await getCurrentUser();

					const result = await wSkillsPrisma.skill.update({
						where: {
							id: parseInt(id),
							authorUniqueId: currentUser?.uniqueId || "",
						},
						data: {
							name: skillName,
							description: skillDescription,
							published,
						},
					});

					if (!result) {
						notFound();
					}

					redirect(`/skills/${id}`);
				}}
			>
				<div>
					<label htmlFor="skillName">スキル名</label>
					<input type="text" id="skillName" name="skillName" defaultValue={skill.name} required />
				</div>
				<div>
					<label htmlFor="skillDescription">スキルの説明</label>
					<textarea id="skillDescription" name="skillDescription" defaultValue={skill.description} required></textarea>
				</div>
				<div>
					<select name="published" id="published" defaultValue={skill.published ? "true" : "false"}>
						<option value="true">公開</option>
						<option value="false">非公開</option>
					</select>
				</div>
				<button type="submit">保存</button>
				&nbsp;
				<Link href={`/skills/${id}`}>キャンセル</Link>
			</form>
		</div>
	)

}
