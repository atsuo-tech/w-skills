"use server";

import { wSkillsPrisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import { redirect, unauthorized } from "next/navigation";

export async function createSkill(formData: FormData) {

	const currentUser = await getCurrentUser();

	if (!currentUser) {
		unauthorized();
	}

	const skillName = formData.get("skillName");
	const skillDescription = formData.get("skillDescription");
	const selectedTags = formData.get("selectedTags");

	if (typeof skillName !== "string" || typeof skillDescription !== "string" || typeof selectedTags !== "string") {
		unauthorized();
	}

	const tags = selectedTags.split(",");

	if (tags.length === 0) {
		tags.push("65535"); // その他
	}

	const existingTags = await wSkillsPrisma.tag.findMany({
		where: {
			id: {
				in: tags.map(tag => parseInt(tag)),
			},
		},
	});

	if (existingTags.length !== tags.length) {
		unauthorized();
	}

	const skill = await wSkillsPrisma.skill.create({
		data: {
			name: skillName,
			description: skillDescription,
			tags: {
				connect: existingTags.map(tag => ({ id: tag.id })),
			},
			authorUniqueId: currentUser.uniqueId,
		},
	});

	redirect(`/skills/${skill.id}`);

}
