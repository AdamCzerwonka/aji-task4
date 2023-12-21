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

  const status1 = await prisma.category.createMany({
    data: [
      { id: 1, name: "cat1" },
      { id: 2, name: "cat2" },
      { id: 3, name: "cat3" },
      { id: 4, name: "cat4" },
      { id: 5, name: "cat5" },
    ],
  });

  const status2 = await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: "Willowleaf Angelon",
        description: "Scotoma involving central area",
        price: 1,
        weight: 1,
        categoryId: 1,
      },
      {
        id: 2,
        name: "Utah Agave",
        description:
          "Other injury of extensor muscle, fascia and tendon of right ring finger at wrist and hand level",
        price: 1,
        weight: 1,
        categoryId: 1,
      },
      {
        id: 3,
        name: "Small Matweed",
        description:
          "Concussion and edema of sacral spinal cord, initial encounter",
        price: 1.99,
        weight: 10,
        categoryId: 1,
      },
      {
        id: 4,
        name: "Alumroot",
        description: "Left lower quadrant rebound abdominal tenderness",
        price: 54.99,
        weight: 11.5,
        categoryId: 2,
      },
      {
        id: 5,
        name: "Bartram Oak",
        description:
          "Toxic effect of nitroglycerin and other nitric acids and esters, undetermined, subsequent encounter",
        price: 79.99,
        weight: 21.3,
        categoryId: 2,
      },
      {
        id: 6,
        name: "Parry's Rabbitbrush",
        description:
          "Poisoning by unspecified fibrinolysis-affecting drugs, accidental (unintentional), subsequent encounter",
        price: 101.99,
        weight: 42,
        categoryId: 3,
      },
      {
        id: 7,
        name: "Ivey's Twinpod",
        description:
          "Unspecified fracture of second lumbar vertebra, initial encounter for closed fracture",
        price: 123.99,
        weight: 41,
        categoryId: 3,
      },
      {
        id: 8,
        name: "American Burnweed",
        description: "Oligospermia due to extratesticular causes",
        price: 6.99,
        weight: 6,
        categoryId: 3,
      },
      {
        id: 9,
        name: "Compact Prairie Clover",
        description:
          "Jumping or diving into other water striking wall causing drowning and submersion, sequela",
        price: 13.99,
        weight: 5,
        categoryId: 4,
      },
      {
        id: 10,
        name: "Panamint Springparsley",
        description:
          "Underdosing of other general anesthetics, initial encounter",
        price: 21.99,
        weight: 16,
        categoryId: 4,
      },
    ],
  });

  console.log({ status });
  console.log({ status1 }, { status2 });
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
