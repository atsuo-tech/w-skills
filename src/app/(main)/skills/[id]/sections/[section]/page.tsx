import Markdown from "@/component/markdown";
import { wSkillsPrisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import Link from "next/link";
import { notFound } from "next/navigation";

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
			OR: [
				{ published: true },
				{ authorUniqueId: currentUser?.uniqueId || "" },
			]
		},
		select: {
			name: true,
			authorUniqueId: true,
			published: true,
			sections: {
				where: {
					id: parseInt(section),
					OR: [
						{ published: true },
						{ skill: { authorUniqueId: currentUser?.uniqueId || "" } },
					],
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
			<h1>{skill.name} - {skill.sections[0].name}</h1>
			<p>
				作成日: {skill.sections[0].createdAt.toLocaleDateString()}<br />
				最終更新日: {skill.sections[0].updatedAt.toLocaleDateString()}
				{!skill.published && " (非公開)"}
			</p>
			{
				currentUser?.uniqueId === skill.authorUniqueId && (
					<Link href={`/skills/${id}/sections/${section}/edit`}>
						セクションを編集
					</Link>
				)
			}
			<Markdown md={skill.sections[0].content} />
		</div>
	)

}
