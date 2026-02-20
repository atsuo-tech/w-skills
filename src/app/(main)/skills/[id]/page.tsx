import { wSkillsPrisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SkillDetailPage(
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {

	const { id } = await params;

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
			tags: {
				select: {
					id: true,
					name: true,
				},
			},
			sections: {
				select: {
					id: true,
					name: true,
				},
			}
		},
	});

	if (!skill) {
		return <p>スキルが見つかりませんでした。</p>;
	}

	const currentUser = await getCurrentUser();

	if (!skill.published && currentUser?.uniqueId !== skill.authorUniqueId) {
		notFound();
	}

	return (
		<div>
			<h1>{skill.name}</h1>
			<p>作成日時: {skill.createdAt.toLocaleString("ja-jp", { timeZone: "Asia/Tokyo" })}, 更新日時: {skill.updatedAt.toLocaleString("ja-jp", { timeZone: "Asia/Tokyo" })}</p>
			{
				currentUser?.uniqueId === skill.authorUniqueId && (
					<div>
						<span>公開設定：{skill.published ? "公開中" : "非公開"}</span>
						&nbsp;|&nbsp;
						<Link href={`/skills/${id}/edit`}>スキルを編集</Link>
					</div>
				)
			}
			<p>{skill.description}</p>
			<h2>タグ</h2>
			<ul>
				{skill.tags.map(tag => (
					<li key={tag.id}>{tag.name}</li>
				))}
			</ul>
			<h2>セクション</h2>
			{
				currentUser?.uniqueId === skill.authorUniqueId && (
					<Link href={`/skills/${id}/sections/new`}>セクションを追加</Link>
				)
			}
			{
				skill.sections.length === 0 ?
					<p>まだセクションがありません。</p> :
					<ul>
						{skill.sections.map(section => (
							<li key={section.id}>
								<Link href={`/skills/${id}/sections/${section.id}`}>
									{section.name}
								</Link>
							</li>
						))}
					</ul>
			}
		</div>
	);

}
