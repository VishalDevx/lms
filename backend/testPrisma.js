const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    // Test connection
    await prisma.$connect();
    console.log("Connected to the database.");

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email: "all@gmail.com",
        password: "password", // You might want to hash the password before storing it
      },
    });
    console.log("User created:", user);

    // Read operation: Fetch all users
    const users = await prisma.user.findMany();
    console.log("All users:", users);

    // Update operation: Update a user
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { email: "updatedEmail@gmail.com" },
    });
    console.log("Updated user:", updatedUser);

    // Delete operation: Delete a user
    await prisma.user.delete({
      where: { id: user.id },
    });
    console.log("User deleted.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the connection
    await prisma.$disconnect();
  }
}

main();
