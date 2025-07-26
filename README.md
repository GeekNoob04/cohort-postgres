# Cohort Postgres 🐘

This project demonstrates how to interact with a PostgreSQL database using both the `pg` library for raw SQL queries and Prisma, a modern ORM. It showcases fundamental database operations, including creating tables, managing relationships, performing transactions, and executing CRUD (Create, Read, Update, Delete) operations. The project aims to provide a comprehensive example for developers looking to integrate PostgreSQL into their Node.js applications, offering flexibility through both direct SQL and an ORM approach. It solves the common problem of efficiently managing database interactions and data consistency in a Node.js environment.

## 🚀 Features

- **Database Connection Management:** Establishes and manages connections to a PostgreSQL database using the `pg` library.
- **Raw SQL Queries:** Executes raw SQL queries for creating tables and inserting data, providing fine-grained control over database operations.
- **Parameterized Queries:** Utilizes parameterized queries to prevent SQL injection vulnerabilities.
- **Database Transactions:** Implements database transactions to ensure data consistency and atomicity.
- **ORM with Prisma:** Leverages Prisma for type-safe database access and simplified CRUD operations.
- **Schema Definition:** Defines the database schema using Prisma's data modeling language.
- **User and Todo Management:** Provides functions for creating, updating, retrieving, and deleting users and todos.
- **Relationship Management:** Demonstrates one-to-many relationships between users and addresses (using `pg`) and users and todos (using Prisma).

## 🛠️ Tech Stack

- **Backend:**
    - Node.js
- **Database:**
    - PostgreSQL
- **ORM:**
    - Prisma
- **Libraries:**
    - `pg` (PostgreSQL client)
    - `@prisma/client`
- **Development Tools:**
    - TypeScript
    - `ts-node`
    - Prisma CLI
- **Package Manager:**
    - npm

## 📦 Installation

### Prerequisites

- Node.js (version >= 14)
- PostgreSQL database
- Docker (optional, for running PostgreSQL in a container)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd cohort-postgres
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up the database:**

    - Ensure you have a PostgreSQL database running. You can use Docker for a quick setup:

      ```bash
      docker run --name postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -d postgres
      ```

    - Set the `DATABASE_URL` environment variable.  For local development, this might look like:

      ```bash
      export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
      ```

4.  **Run Prisma migrations:**

    ```bash
    npx prisma migrate dev --name init
    ```

    This will create the necessary tables in your database based on the schema defined in `prisma/schema.prisma`.

5.  **Generate the Prisma client:**

    ```bash
    npx prisma generate
    ```

## 💻 Usage

### Running locally

1.  **Run the `src/index.ts` file (using `pg`):**

    ```bash
    npx ts-node src/index.ts
    ```

    This will execute the code that interacts with the database using the `pg` library, creating tables and performing transactions.

2.  **Run the `src/prisma.ts` file (using Prisma):**

    ```bash
    npx ts-node src/prisma.ts
    ```

    This will execute the code that interacts with the database using Prisma, demonstrating CRUD operations for users and todos.

## 📂 Project Structure

```
cohort-postgres/
├── prisma/
│   ├── schema.prisma       # Prisma schema definition
├── src/
│   ├── index.ts            # Main entry point using pg library
│   ├── prisma.ts           # Prisma ORM example
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request.

## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [harshitbudhraja0@gmail.com](mailto:harshitbudhraja0@gmail.com).

## 💖 Thanks Message

Thank you for checking out this project! I hope it helps you understand how to work with PostgreSQL in Node.js using both raw SQL and Prisma. Your feedback and contributions are highly appreciated!

This README is written by [readme.ai](https://readme-generator-phi.vercel.app/).
