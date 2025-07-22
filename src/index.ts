// querying
// async function createUsersTable(
//     username: string,
//     email: string,
//     password: string
// ) {
//     const client = getClient();
//     try {
//         await client.connect();
//         await client.query(`DROP TABLE IF EXISTS users;`);

//         const res = await client.query(`
//             CREATE TABLE users(
//                 id SERIAL PRIMARY KEY,
//                 username VARCHAR(50) UNIQUE NOT NULL,
//                 email VARCHAR(255) UNIQUE NOT NULL,
//                 password VARCHAR(255) NOT NULL,
//                 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//             );
//         `);
//         console.log(res);
//         //to fix sql injection:
//         const insertQuery =
//             "INSERT INTO users(username,email,password) VALUES($1, $2, $3);";
//         const values = [username, email, password];
//         const res2 = await client.query(insertQuery, values);
//         console.log(res2);
//     } catch (e) {
//         console.log("Error during execution: " + e);
//     } finally {
//         await client.end();
//     }
// }
import { Client } from "pg";

function getClient() {
    return new Client({
        connectionString: process.env.DATABASE_URL,
    });
}
async function relationships() {
    const client = getClient();
    try {
        await client.connect();
        const relationquery = await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(250) UNIQUE NOT NULL,
                email VARCHAR(250) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE addresses(
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                city VARCHAR(50) NOT NULL,
                country VARCHAR(50) NOT NULL,
                street VARCHAR(50) NOT NULL,
                pincode VARCHAR(20),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
        console.log(relationquery);
    } catch (e) {
        console.log("There was an error: " + e);
    } finally {
        await client.end();
    }
}
async function insertUser(username: string, email: string, password: string) {
    const client = getClient();
    try {
        await client.connect();
        const insertQuery = `INSERT INTO users(username,email,password) VALUES($1, $2, $3);`;
        const val = [username, email, password];
        const res = await client.query(insertQuery, val);
        console.log(res);
    } catch (e) {
        console.log("There was an issue: " + e);
    } finally {
        client.end();
    }
}
async function updatetUser(username: string, email: string, password: string) {
    const client = getClient();
    try {
        await client.connect();
        const updateQuery = "UPDATE users SET password = $1 WHERE email = $2;";
        const val = [password, email];
        const res = await client.query(updateQuery, val);
        console.log(res);
    } catch (e) {
        console.log("There was an issue: " + e);
    } finally {
        client.end();
    }
}
async function createEmail(email: string) {
    const client = getClient();
    try {
        await client.connect();
        const query = "SELECT * FROM users WHERE email = $1";
        const value = [email];
        const res = await client.query(query, value);
        console.log(res);
        if (res.rows.length > 0) {
            console.log("user found: ", res.rows[0]);
            return res.rows[0];
        } else {
            console.log("user not found");
            return null;
        }
    } catch (e) {
        console.log("There was an error in the query: " + e);
    } finally {
        await client.end();
    }
}

async function joinsUnderstand(user_id: string) {
    const client = getClient();
    try {
        await client.connect();
        const joinQuery = `
        SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
        FROM users u
        JOIN addresses a ON u.id = a.user_id
        WHERE u.id = $1
        `;
        const uid = [user_id];
        const resJoin = await client.query(joinQuery, uid);
        console.log(resJoin);
    } catch (e) {
        console.log("Error while joining: " + e);
    } finally {
        client.end();
    }
}
async function main() {
    // await createUsersTable(
    //     "harshit",
    //     "harshitbudhraja0@gmail.com",
    //     "System@123"
    // );
    await createEmail("harshitdon@gmail.com");
    await relationships();
    await joinsUnderstand("1");
}
main();
