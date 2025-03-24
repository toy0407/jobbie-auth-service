import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { lambdaHandler } from "@toy0407/jobbie-lib/dist/utils/lambdaWrapper.util";
import { getPrismaClient } from "@toy0407/jobbie-lib/dist/db/client";
import { faker } from "@faker-js/faker";

async function signUp(event: APIGatewayProxyEvent, context: Context) {
  //   createBulkUsers(100000);
  console.log(process.env.DATABASE_URL);
  try {
    await getPrismaClient().user.findMany({
      where: {
        email: "asdf@example.com",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

const BATCH_SIZE = 500; // Optimal for most databases
const CONCURRENCY = 2; // Parallel batches

async function createBulkUsers(totalUsers: number) {
  let inserted = 0;

  // Generate mock data
  const createUserData = async () => ({
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
  });

  // Process in parallel batches
  while (inserted < totalUsers) {
    const batchPromises = Array.from({ length: CONCURRENCY }, async () => {
      const users = await Promise.all(
        Array.from({ length: BATCH_SIZE }, createUserData)
      );

      await getPrismaClient().$transaction([
        getPrismaClient().user.createMany({
          data: users,
          skipDuplicates: true,
        }),
      ]);
    });

    try {
      await Promise.all(batchPromises);
      inserted += BATCH_SIZE * CONCURRENCY;
      console.log(`Inserted ${inserted}/${totalUsers} users`);
    } catch (error) {
      console.error("Batch failed:", error);
    }
  }
}

export const handler = lambdaHandler(signUp);
