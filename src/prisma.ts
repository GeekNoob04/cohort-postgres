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

async function deletUser(id: number) {
    const userDelete = await prisma.user.delete({
        where: {
            id,
        },
    });
    console.log(userDelete);
}
async function createTodos(title: string, description: string, userId: number) {
    const createTodosRes = await prisma.todos.create({
        data: {
            title,
            description,
            userId,
        },
    });
    console.log(createTodosRes);
}
async function getTodos(userId: number) {
    const getTodosRes = await prisma.todos.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            title: true,
            description: true,
            user: true, // user and todos are related
            // user: {
            //     select: {
            //         firstName: true,
            //         lastName: true,
            //     },
            // },
        },
    });
    console.log(getTodosRes);
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
    deletUser(1);
    createTodos("TODO 1", "first todo", 1);
    getTodos(1);
}
main().catch(console.error);

async function pracInsert(
    username: string,
    password: string,
    firstName: string,
    lastName: string
) {
    const pracInsert = await prisma.user.create({
        data: { username, password, firstName, lastName },
    });
    console.log(pracInsert);
}

interface updatePractice {
    username: string;
    firstName: string;
    lastName: string;
}

async function practUpdate(
    username: string,
    { firstName, lastName }: updateParams
) {
    const pracUpd = await prisma.user.update({
        where: {
            username,
        },
        data: {
            firstName,
            lastName,
        },
    });
    console.log(pracUpd);
}
async function practDetails(username: string) {
    const getUserPrac = await prisma.user.findFirst({
        where: { username },
    });
    console.log(getUserPrac);
}
async function pracDelete(username: string) {
    const pracDelete = await prisma.user.delete({
        where: {
            username,
        },
    });
    console.log(pracDelete);
}
