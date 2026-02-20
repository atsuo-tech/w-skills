import { wSkillsPrisma } from "@/lib/db";
import NewSkillForm from "./form";

export default async function NewSkillPage() {

	const tags = await wSkillsPrisma.tag.findMany({
		select: {
			id: true,
			name: true,
		},
	});

	return (
		<div>
			<h1>New Skill</h1>
			<p>ここにスキルの作成フォームが表示されます。</p>
			<NewSkillForm tags={tags} />
		</div>
	)

}
