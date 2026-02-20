import Markdown from "@/component/markdown";
import { wSkillsPrisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import { Grid } from "@mui/material";
import { notFound, redirect } from "next/navigation";
import Editor from "./editor";

export default async function SectionPage(
	{
		params,
	}: {
		params: Promise<{ id: string; section: string }>;
	},
) {

	const { id, section } = await params;

	const currentUser = await getCurrentUser();

	const skill = await wSkillsPrisma.skill.findUnique({
		where: {
			id: parseInt(id),
			authorUniqueId: currentUser?.uniqueId || "",
		},
		select: {
			name: true,
			sections: {
				where: {
					id: parseInt(section),
				},
				select: {
					name: true,
					content: true,
					createdAt: true,
					updatedAt: true,
					published: true,
				},
			},
		},
	});

	if (!skill) {
		notFound();
	}

	return (
		<div>
			<h1>編集：{skill.name} - {skill.sections[0].name}</h1>
			<form
				action={async (formData: FormData) => {
					"use server";
					const sectionName = formData.get("sectionName") as string;
					const content = formData.get("content") as string;
					if (typeof sectionName !== "string" || sectionName.trim() === "") {
						return;
					}
					await wSkillsPrisma.section.update({
						where: {
							id: parseInt(section),
						},
						data: {
							name: sectionName,
							content: content,
						},
					});
					redirect(`/skills/${id}/sections/${section}`);
				}}
			>
				<div>
					<label htmlFor="sectionName">セクション名</label>
					<input type="text" id="sectionName" name="sectionName" required defaultValue={skill.sections[0].name} />
				</div>
				<div>
					<label htmlFor="content">内容</label>
					<Editor defaultValue={skill.sections[0].content} />
				</div>
				<button type="submit">保存</button>
			</form>
		</div>
	)

}
