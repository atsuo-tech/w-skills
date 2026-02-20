"use client";

import { Suspense, useState } from "react";
import styles from "./page.module.css";
import tagStyles from "@/component/tag.module.css";
import Link from "next/link";

export default function SkillsSearcher(
	{
		tags,
		skills,
	}: {
		tags: { id: number; name: string }[];
		skills: { id: number; name: string; description: string, tags: { id: number; name: string }[] }[];
	},
) {

	const [selected, setSelected] = useState<number>(-1);
	const [searchTerm, setSearchTerm] = useState<string>("");

	return (
		<div>
			<input
				type="search"
				placeholder="スキルを検索..."
				className={styles.searchInput}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<div className={tagStyles.tagList}>
				{
					tags.map((tag, index) => (
						<span
							key={tag.id}
							className={`${tagStyles.tag} ${selected === index ? tagStyles.selected : ''}`}
							onClick={() => {
								setSelected(selected === index ? -1 : index);
								console.log(selected);
							}}
						>
							{tag.name}
						</span>
					))
				}
			</div>

			<Suspense fallback={<div>Loading...</div>}>
				<div className={styles.skillList}>
					{
						skills
							.filter(skill => selected === -1 || skill.tags.some(tag => tag.id === tags[selected].id))
							.filter(skill => skill.name.includes(searchTerm) || skill.description.includes(searchTerm))
							.map((skill) => (
								<div key={skill.id} className={styles.skillCard}>
									<div className={styles.skillImage}></div>
									<div className={styles.skillContent}>
										<h2>
											<Link href={`/skills/${skill.id}`} className={styles.skillLink}>
												{skill.name}
											</Link>
										</h2>
										<div className={tagStyles.tagList}>
											{
												skill.tags.map(tag => (
													<span key={tag.id} className={tagStyles.tag}>
														{tag.name}
													</span>
												))
											}
										</div>
										<p>{skill.description}</p>
									</div>
								</div>
							))
					}
					{
						skills
							.filter(skill => selected === -1 || skill.tags.some(tag => tag.id === tags[selected].id))
							.filter(skill => skill.name.includes(searchTerm) || skill.description.includes(searchTerm))
							.length === 0 && (
							<p>条件を満たすスキルが見つかりませんでした。</p>
						)
					}
				</div>
			</Suspense>
		</div>
	)

}
