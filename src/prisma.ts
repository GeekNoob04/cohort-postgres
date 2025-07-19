import { PrismaClient } from "@prisma/client";
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
            firstName: true,
            password: true,
        },
    });
    console.log(res);
}
interface updateParams {
    firstName: string;
    lastName: string;
}
async function updateUser(
    username: string,
    { firstName, lastName }: updateParams
) {
    const resUpdate = await prisma.user.update({
        where: { username },
        data: { firstName, lastName },
    });
    console.log(resUpdate);
}
async function geteUser(username: string) {
    const resGet = await prisma.user.findFirst({
        where: { username },
    });
    console.log(resGet);
}

async function main() {
    await insertUser(
        "harshitkhatamhai@gmail.com",
        "harshitdon2",
        "harshit",
        "budhraja"
    );
    await updateUser("harshitkhatam@gmail.com", {
        firstName: "harshitsystem2",
        lastName: "budhrajasystem2",
    });
    geteUser("harshitkhatam@gmail.com");
}
main().catch(console.error);
