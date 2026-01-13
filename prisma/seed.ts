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
  await prisma.product.deleteMany();
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

  console.log("Creating products...");

  // Get subcategories for products
  const dogsSubCat = await prisma.subCategory.findUnique({
    where: { slug: "dogs" },
  });
  const dryFoodSubCat = await prisma.subCategory.findUnique({
    where: { slug: "dry-food" },
  });
  const wetFoodSubCat = await prisma.subCategory.findUnique({
    where: { slug: "wet-food" },
  });
  const treatsSubCat = await prisma.subCategory.findUnique({
    where: { slug: "treats" },
  });
  const collarsSubCat = await prisma.subCategory.findUnique({
    where: { slug: "collars-leashes" },
  });
  const groomingSubCat = await prisma.subCategory.findUnique({
    where: { slug: "grooming-tools" },
  });
  const plushToysSubCat = await prisma.subCategory.findUnique({
    where: { slug: "plush-toys" },
  });
  const chewToysSubCat = await prisma.subCategory.findUnique({
    where: { slug: "chew-toys" },
  });
  const fishTanksSubCat = await prisma.subCategory.findUnique({
    where: { slug: "fish-tanks" },
  });
  const tropicalFoodSubCat = await prisma.subCategory.findUnique({
    where: { slug: "tropical-fish-food" },
  });
  const parrotsSubCat = await prisma.subCategory.findUnique({
    where: { slug: "parrots" },
  });

  // Pet Shop Products
  await prisma.product.create({
    data: {
      name: "Premium Dog Food Dry",
      slug: "premium-dog-food-dry",
      description: "High-quality dry dog food with all essential nutrients",
      price: 1499,
      discountPrice: 1299,
      stock: 50,
      sku: "PDFOOD001",
      categoryId: petShop.id,
      subCategoryId: dogsSubCat!.id,
    },
  });

  // Pet Food Store Products
  await prisma.product.create({
    data: {
      name: "Dry Kibble Mix 5kg",
      slug: "dry-kibble-mix-5kg",
      description: "Nutritious dry pet food mix",
      price: 3499,
      discountPrice: 2999,
      stock: 40,
      sku: "DRYF001",
      categoryId: petFoodStore.id,
      subCategoryId: dryFoodSubCat!.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Wet Food Chicken 400g",
      slug: "wet-food-chicken-400g",
      description: "Delicious wet food with chicken",
      price: 299,
      stock: 100,
      sku: "WETF001",
      categoryId: petFoodStore.id,
      subCategoryId: wetFoodSubCat!.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Pet Treats Assorted Pack",
      slug: "pet-treats-assorted-pack",
      description: "Variety pack of tasty treats",
      price: 599,
      discountPrice: 449,
      stock: 75,
      sku: "TREAT001",
      categoryId: petFoodStore.id,
      subCategoryId: treatsSubCat!.id,
    },
  });

  // Pet Supplies Products
  await prisma.product.create({
    data: {
      name: "Leather Dog Collar M",
      slug: "leather-dog-collar-m",
      description: "Premium leather collar for medium dogs",
      price: 1299,
      stock: 35,
      sku: "COLLAR001",
      categoryId: petSuppliesStore.id,
      subCategoryId: collarsSubCat!.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Professional Grooming Brush",
      slug: "professional-grooming-brush",
      description: "High-quality grooming brush",
      price: 899,
      discountPrice: 749,
      stock: 20,
      sku: "GROOM001",
      categoryId: petSuppliesStore.id,
      subCategoryId: groomingSubCat!.id,
    },
  });

  // Pet Toy Store Products
  await prisma.product.create({
    data: {
      name: "Plush Bunny Toy",
      slug: "plush-bunny-toy",
      description: "Soft plush toy for pets",
      price: 399,
      stock: 60,
      sku: "PLUSH001",
      categoryId: petToyStore.id,
      subCategoryId: plushToysSubCat!.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "Rubber Chew Toy",
      slug: "rubber-chew-toy",
      description: "Durable chew toy",
      price: 599,
      discountPrice: 499,
      stock: 45,
      sku: "CHEW001",
      categoryId: petToyStore.id,
      subCategoryId: chewToysSubCat!.id,
    },
  });

  // Aquarium Products
  await prisma.product.create({
    data: {
      name: "20L Glass Fish Tank",
      slug: "20l-glass-fish-tank",
      description: "Clear glass aquarium tank 20 liters",
      price: 4999,
      stock: 15,
      sku: "TANK001",
      categoryId: aquariumShop.id,
      subCategoryId: fishTanksSubCat!.id,
    },
  });

  // Fish Food Products
  await prisma.product.create({
    data: {
      name: "Tropical Fish Flakes 100g",
      slug: "tropical-fish-flakes-100g",
      description: "Premium tropical fish food",
      price: 399,
      stock: 80,
      sku: "TFISH001",
      categoryId: fishFoodStore.id,
      subCategoryId: tropicalFoodSubCat!.id,
    },
  });

  // Bird Shop Products
  await prisma.product.create({
    data: {
      name: "Parrot Mix Seeds 1kg",
      slug: "parrot-mix-seeds-1kg",
      description: "Nutritious seed mix for parrots",
      price: 899,
      discountPrice: 799,
      stock: 35,
      sku: "PARROT001",
      categoryId: birdShop.id,
      subCategoryId: parrotsSubCat!.id,
    },
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
