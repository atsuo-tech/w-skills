"use client";

import { useState } from "react";
import tagStyles from "@/component/tag.module.css";
import { createSkill } from "./action";

export default function NewSkillForm(
	{
		tags,
	}: {
		tags: { id: number; name: string }[];
	},
) {

	const [selectedTags, setSelectedTags] = useState<number[]>([]);

	return (
		<form
			action={createSkill}
		>
			<div>
				<label htmlFor="skillName">スキル名</label>
				<input type="text" id="skillName" name="skillName" required />
			</div>
			<div>
				<label htmlFor="skillDescription">説明</label>
				<textarea id="skillDescription" name="skillDescription" required></textarea>
			</div>
			<div>
				<label htmlFor="tags">タグ</label>
				<div className={tagStyles.tagList}>
					{
						tags.filter(tag => tag.id !== 65535).map((tag, index) => (
							<span
								key={tag.id}
								className={`${tagStyles.tag} ${selectedTags.includes(index) ? tagStyles.selected : ''}`}
								onClick={() => {
									if (selectedTags.includes(index)) {
										setSelectedTags(selectedTags.filter(i => i !== index));
									} else {
										setSelectedTags([...selectedTags, index]);
									}
								}}
							>
								{tag.name}
							</span>
						))
					}
				</div>
				<p>
					ほしいタグがない場合は、Discord で yama_can まで連絡してください。
				</p>
				<input type="hidden" name="selectedTags" value={selectedTags.map(i => tags[i].id).join(",")} />
			</div>
			<button type="submit">作成</button>
		</form>
	)

}
