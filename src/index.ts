import { Client } from "pg";

const client = new Client({
    connectionString:
        "postgresql://neondb_owner:npg_xT9LsSw4nkVv@ep-wild-night-a1b5rttv-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});
// querying
async function createUsersTable(
    username: string,
    email: string,
    password: string
) {
    try {
        await client.connect();
        await client.query(`DROP TABLE IF EXISTS users;`);

        const res = await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log(res);
        // const res2 = await client.query(`
        //     INSERT INTO users(username,email,password)
        //     VALUES('harshit','harshitbudhraja0@gmail.com','System@123')
        // `);
        // console.log(res2);
        // to fix sql injection:
        const insertQuery =
            "INSERT INTO users(username,email,password) VALUES($1 $2 $3);";
        const values = [username, email, password];
        const res2 = await client.query(insertQuery, values);
        console.log(res2);
    } catch (e) {
        console.log("Error during execution: " + e);
    } finally {
        await client.end();
    }
}
createUsersTable("harshit", "harshitbudhraja0@gmail.com", "System@123");

async function createEmail(email: string) {
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
createEmail("harshitdon@gmail.com");
