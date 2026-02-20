import { cookies } from "next/headers";
import { wAuthPrisma, wSkillsPrisma } from "./db";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get("SESSION_TOKEN")?.value;

	if (!sessionToken) {
		return null;
	}

	return wAuthPrisma.loginSession.findUnique({
		where: {
			sessionToken,
			expiresAt: {
				gt: new Date(),
			},
		},
		select: {
			user: {
				select: {
					uniqueId: true,
					username: true,
					realname: true,
					grade: true,
					studentId: true,
				},
			},
		},
	}).then((session) => session?.user || null);

});

export const isSkillAuthor = async (skillId: number) => {
	const user = await getCurrentUser();
	if (!user) {
		return false;
	}
	return wSkillsPrisma.skill.findUnique({
		where: {
			id: skillId,
			authorUniqueId: user.uniqueId,
		},
	}).then((skill) => !!skill);
}
