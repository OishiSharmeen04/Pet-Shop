import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();

  console.log("Creating categories...");

  const petShop = await prisma.category.create({
    data: { name: "Pet Shop", slug: "pet-shop" },
  });

  const petFoodStore = await prisma.category.create({
    data: { name: "Pet Food Store", slug: "pet-food-store" },
  });

  const petSuppliesStore = await prisma.category.create({
    data: { name: "Pet Supplies Store", slug: "pet-supplies-store" },
  });

  const petToyStore = await prisma.category.create({
    data: { name: "Pet Toy Store", slug: "pet-toy-store" },
  });

  const aquariumShop = await prisma.category.create({
    data: { name: "Aquarium Shop", slug: "aquarium-shop" },
  });

  const fishFoodStore = await prisma.category.create({
    data: { name: "Fish Food Store", slug: "fish-food-store" },
  });

  const birdShop = await prisma.category.create({
    data: { name: "Bird Shop", slug: "bird-shop" },
  });

  console.log("Creating sub-categories...");

  await prisma.subCategory.create({
    data: { name: "Dogs", slug: "dogs", categoryId: petShop.id },
  });
  await prisma.subCategory.create({
    data: { name: "Cats", slug: "cats", categoryId: petShop.id },
  });
  await prisma.subCategory.create({
    data: { name: "Rabbits", slug: "rabbits", categoryId: petShop.id },
  });

  await prisma.subCategory.create({
    data: { name: "Dry Food", slug: "dry-food", categoryId: petFoodStore.id },
  });
  await prisma.subCategory.create({
    data: { name: "Wet Food", slug: "wet-food", categoryId: petFoodStore.id },
  });
  await prisma.subCategory.create({
    data: { name: "Treats", slug: "treats", categoryId: petFoodStore.id },
  });

  await prisma.subCategory.create({
    data: {
      name: "Collars & Leashes",
      slug: "collars-leashes",
      categoryId: petSuppliesStore.id,
    },
  });
  await prisma.subCategory.create({
    data: {
      name: "Grooming Tools",
      slug: "grooming-tools",
      categoryId: petSuppliesStore.id,
    },
  });
  await prisma.subCategory.create({
    data: { name: "Bedding", slug: "bedding", categoryId: petSuppliesStore.id },
  });

  await prisma.subCategory.create({
    data: {
      name: "Plush Toys",
      slug: "plush-toys",
      categoryId: petToyStore.id,
    },
  });
  await prisma.subCategory.create({
    data: { name: "Chew Toys", slug: "chew-toys", categoryId: petToyStore.id },
  });
  await prisma.subCategory.create({
    data: {
      name: "Interactive Toys",
      slug: "interactive-toys",
      categoryId: petToyStore.id,
    },
  });

  await prisma.subCategory.create({
    data: {
      name: "Fish Tanks",
      slug: "fish-tanks",
      categoryId: aquariumShop.id,
    },
  });
  await prisma.subCategory.create({
    data: {
      name: "Filters & Pumps",
      slug: "filters-pumps",
      categoryId: aquariumShop.id,
    },
  });
  await prisma.subCategory.create({
    data: {
      name: "Aquarium Decorations",
      slug: "aquarium-decorations",
      categoryId: aquariumShop.id,
    },
  });

  await prisma.subCategory.create({
    data: {
      name: "Tropical Fish Food",
      slug: "tropical-fish-food",
      categoryId: fishFoodStore.id,
    },
  });
  await prisma.subCategory.create({
    data: {
      name: "Goldfish Food",
      slug: "goldfish-food",
      categoryId: fishFoodStore.id,
    },
  });
  await prisma.subCategory.create({
    data: {
      name: "Supplements",
      slug: "supplements",
      categoryId: fishFoodStore.id,
    },
  });

  await prisma.subCategory.create({
    data: { name: "Parrots", slug: "parrots", categoryId: birdShop.id },
  });
  await prisma.subCategory.create({
    data: { name: "Canaries", slug: "canaries", categoryId: birdShop.id },
  });
  await prisma.subCategory.create({
    data: { name: "Budgies", slug: "budgies", categoryId: birdShop.id },
  });

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
