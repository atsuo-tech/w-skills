import styles from "./page.module.css";
import Link from "next/link";
import SkillsSearcher from "./searcher";
import { wSkillsPrisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";

export default async function SkillsPage() {

	const tags = await wSkillsPrisma.tag.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	const currentUser = await getCurrentUser();
	const skills = await wSkillsPrisma.skill.findMany({
		where: {
			OR: [
				{ published: true },
				{ authorUniqueId: currentUser?.uniqueId || "" },
			],
		},
		select: {
			id: true,
			name: true,
			description: true,
			published: true,
			tags: {
				select: {
					id: true,
					name: true,
				},
			},
		},
		orderBy: {
			updatedAt: "desc",
		},
	});

	return (
		<div>
			<h1>Skills</h1>
			<p>ここにスキルの一覧が表示されます。</p>
			<Link href="/skills/new" className={styles.createSkillLink}>スキルを作成</Link>

			<SkillsSearcher
				tags={tags}
				skills={skills}
			/>
		</div>
	)

}
