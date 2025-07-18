import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

async function insertUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string
) {
    const res = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName,
        },
        select: {
            id: true,
        },
    });
    console.log(res);
}
async function updateUser() {}
