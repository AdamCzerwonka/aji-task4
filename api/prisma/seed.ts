import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const status = await prisma.orderStatus.createMany({
    data: [
      { id: 1, name: "notApproved" },
      { id: 2, name: "approved" },
      { id: 3, name: "canceled" },
      { id: 4, name: "completed" },
    ],
  });

  console.log({ status });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
