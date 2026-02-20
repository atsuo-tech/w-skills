import { PrismaClient as WAuthPrismaClient } from '@atsuo-tech/w-auth-v2-prisma';
import { PrismaClient as WSkillsPrismaClient } from '@atsuo-tech/w-skills-prisma';

export const wAuthPrisma = new WAuthPrismaClient({
	accelerateUrl: process.env.W_AUTH_ACCELERATE_URL!,
});

export const wSkillsPrisma = new WSkillsPrismaClient({
	accelerateUrl: process.env.W_SKILLS_ACCELERATE_URL!,
});
