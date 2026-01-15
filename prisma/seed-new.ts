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
  console.log("🌱 Seeding database with new schema...");

  // Clean existing data
  try {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.user.deleteMany();
    console.log("✓ Cleared existing data");
  } catch (e) {
    console.log("Note: Some tables might not exist yet");
  }

  // Create Users
  console.log("📝 Creating users...");
  const admin = await prisma.user.create({
    data: {
      email: "admin@petshop.com",
      name: "Admin User",
      password: "hashed_password_admin",
      role: "ADMIN",
      isActive: true,
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Doe",
      password: "hashed_password_john",
      role: "USER",
      isActive: true,
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      email: "jane@example.com",
      name: "Jane Smith",
      password: "hashed_password_jane",
      role: "USER",
      isActive: true,
    },
  });

  console.log("✓ Created 3 users");

  // Create Brands
  console.log("🏢 Creating brands...");
  const pedigree = await prisma.brand.create({
    data: {
      name: "Pedigree",
      slug: "pedigree",
      country: "USA",
      isActive: true,
    },
  });

  const royalCanin = await prisma.brand.create({
    data: {
      name: "Royal Canin",
      slug: "royal-canin",
      country: "France",
      isActive: true,
    },
  });

  const whiskas = await prisma.brand.create({
    data: {
      name: "Whiskas",
      slug: "whiskas",
      country: "UK",
      isActive: true,
    },
  });

  const iams = await prisma.brand.create({
    data: {
      name: "IAMS",
      slug: "iams",
      country: "USA",
      isActive: true,
    },
  });

  console.log("✓ Created 4 brands");

  // Create Categories
  console.log("🏷️  Creating categories...");
  const dogFood = await prisma.category.create({
    data: {
      name: "Dog Food",
      slug: "dog-food",
      type: "indoor",
      isActive: true,
    },
  });

  const catFood = await prisma.category.create({
    data: {
      name: "Cat Food",
      slug: "cat-food",
      type: "indoor",
      isActive: true,
    },
  });

  const petToys = await prisma.category.create({
    data: {
      name: "Pet Toys",
      slug: "pet-toys",
      type: "indoor",
      isActive: true,
    },
  });

  const petAccessories = await prisma.category.create({
    data: {
      name: "Pet Accessories",
      slug: "pet-accessories",
      type: "indoor",
      isActive: true,
    },
  });

  const outdoorGear = await prisma.category.create({
    data: {
      name: "Outdoor Gear",
      slug: "outdoor-gear",
      type: "outdoor",
      isActive: true,
    },
  });

  console.log("✓ Created 5 categories");

  // Create Products
  console.log("📦 Creating products...");
  const product1 = await prisma.product.create({
    data: {
      name: "Premium Dog Food",
      slug: "premium-dog-food",
      description: "High-quality dog food with real meat and vegetables",
      brandId: pedigree.id,
      categoryId: dogFood.id,
      ageMin: 1,
      ageMax: 10,
      basePrice: "45.99",
      isFeatured: true,
      status: "active",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Cat Wellness Food",
      slug: "cat-wellness-food",
      description: "Balanced nutrition for healthy cats",
      brandId: whiskas.id,
      categoryId: catFood.id,
      ageMin: 1,
      ageMax: 15,
      basePrice: "32.99",
      isFeatured: true,
      status: "active",
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Interactive Pet Toy Ball",
      slug: "interactive-pet-toy-ball",
      description: "Fun and interactive toy for dogs and cats",
      brandId: pedigree.id,
      categoryId: petToys.id,
      basePrice: "12.99",
      isFeatured: false,
      status: "active",
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Premium Leather Dog Collar",
      slug: "premium-leather-dog-collar",
      description: "Durable leather collar with adjustable size",
      brandId: royalCanin.id,
      categoryId: petAccessories.id,
      basePrice: "29.99",
      isFeatured: false,
      status: "active",
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "Outdoor Dog Bed",
      slug: "outdoor-dog-bed",
      description: "Weather-resistant dog bed for outdoor use",
      brandId: iams.id,
      categoryId: outdoorGear.id,
      basePrice: "59.99",
      isFeatured: true,
      status: "active",
    },
  });

  console.log("✓ Created 5 products");

  // Create Product Variants
  console.log("🔄 Creating product variants...");
  const variant1_1 = await prisma.productVariant.create({
    data: {
      productId: product1.id,
      sku: "PDG-DF-1KG",
      variantName: "1kg Pack",
      price: "45.99",
    },
  });

  const variant1_2 = await prisma.productVariant.create({
    data: {
      productId: product1.id,
      sku: "PDG-DF-5KG",
      variantName: "5kg Pack",
      price: "189.99",
    },
  });

  const variant2_1 = await prisma.productVariant.create({
    data: {
      productId: product2.id,
      sku: "WHI-CF-500G",
      variantName: "500g Pack",
      price: "16.99",
    },
  });

  const variant2_2 = await prisma.productVariant.create({
    data: {
      productId: product2.id,
      sku: "WHI-CF-1KG",
      variantName: "1kg Pack",
      price: "32.99",
    },
  });

  const variant3_1 = await prisma.productVariant.create({
    data: {
      productId: product3.id,
      sku: "INT-TOY-001",
      variantName: "Single Ball",
      price: "12.99",
    },
  });

  const variant3_2 = await prisma.productVariant.create({
    data: {
      productId: product3.id,
      sku: "INT-TOY-003",
      variantName: "3-Pack",
      price: "32.99",
    },
  });

  const variant4_1 = await prisma.productVariant.create({
    data: {
      productId: product4.id,
      sku: "COLL-S",
      variantName: "Small",
      price: "24.99",
    },
  });

  const variant4_2 = await prisma.productVariant.create({
    data: {
      productId: product4.id,
      sku: "COLL-L",
      variantName: "Large",
      price: "34.99",
    },
  });

  const variant5_1 = await prisma.productVariant.create({
    data: {
      productId: product5.id,
      sku: "BED-M",
      variantName: "Medium",
      price: "59.99",
    },
  });

  const variant5_2 = await prisma.productVariant.create({
    data: {
      productId: product5.id,
      sku: "BED-L",
      variantName: "Large",
      price: "79.99",
    },
  });

  console.log("✓ Created 10 product variants");

  // Create Inventory
  console.log("📊 Creating inventory...");
  const inventoryData = [
    { variantId: variant1_1.id, stock: 100 },
    { variantId: variant1_2.id, stock: 50 },
    { variantId: variant2_1.id, stock: 200 },
    { variantId: variant2_2.id, stock: 150 },
    { variantId: variant3_1.id, stock: 300 },
    { variantId: variant3_2.id, stock: 75 },
    { variantId: variant4_1.id, stock: 80 },
    { variantId: variant4_2.id, stock: 60 },
    { variantId: variant5_1.id, stock: 40 },
    { variantId: variant5_2.id, stock: 30 },
  ];

  for (const inv of inventoryData) {
    await prisma.inventory.create({
      data: {
        variantId: inv.variantId,
        stockQuantity: inv.stock,
      },
    });
  }

  console.log("✓ Created inventory for all variants");

  // Create Product Images
  console.log("🖼️  Creating product images...");
  await prisma.productImage.create({
    data: {
      productId: product1.id,
      imageUrl: "https://example.com/products/dog-food-1.jpg",
      isPrimary: true,
    },
  });

  await prisma.productImage.create({
    data: {
      productId: product1.id,
      imageUrl: "https://example.com/products/dog-food-2.jpg",
      isPrimary: false,
    },
  });

  await prisma.productImage.create({
    data: {
      productId: product2.id,
      imageUrl: "https://example.com/products/cat-food-1.jpg",
      isPrimary: true,
    },
  });

  await prisma.productImage.create({
    data: {
      productId: product3.id,
      imageUrl: "https://example.com/products/toy-ball-1.jpg",
      isPrimary: true,
    },
  });

  await prisma.productImage.create({
    data: {
      productId: product4.id,
      imageUrl: "https://example.com/products/collar-1.jpg",
      isPrimary: true,
    },
  });

  await prisma.productImage.create({
    data: {
      productId: product5.id,
      imageUrl: "https://example.com/products/bed-1.jpg",
      isPrimary: true,
    },
  });

  console.log("✓ Created product images");

  // Create Orders
  console.log("🛒 Creating orders...");
    const order1 = await prisma.order.create({
    data: {
      userId: customer1.id,
      orderNumber: "ORD-2026-001",
      totalAmount: "91.98",
      status: "delivered",
      shippingName: "John Doe",
      shippingPhone: "+1 (555) 123-4567",
      shippingAddress: "123 Main St, Apt 4B, New York, NY 10001",
    },
  });

    const order2 = await prisma.order.create({
    data: {
      userId: customer2.id,
      orderNumber: "ORD-2026-002",
      totalAmount: "126.97",
      status: "shipped",
      shippingName: "Jane Smith",
      shippingPhone: "+1 (555) 987-6543",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    },
  });

    const order3 = await prisma.order.create({
    data: {
      userId: customer1.id,
      orderNumber: "ORD-2026-003",
      totalAmount: "45.98",
      status: "pending",
      shippingName: "John Doe",
      shippingPhone: "+1 (555) 123-4567",
      shippingAddress: "123 Main St, Apt 4B, New York, NY 10001",
    },
  });

  console.log("✓ Created 3 orders");

  // Create Order Items
  console.log("📋 Creating order items...");
    await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      variantId: variant1_1.id,
      quantity: 2,
      price: "45.99",
    },
  });

    await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      variantId: variant2_1.id,
      quantity: 3,
      price: "16.99",
    },
  });

    await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      variantId: variant3_1.id,
      quantity: 1,
      price: "12.99",
    },
  });

    await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      variantId: variant4_1.id,
      quantity: 1,
      price: "24.99",
    },
  });

    await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      variantId: variant3_2.id,
      quantity: 1,
      price: "32.99",
    },
  });

  console.log("✓ Created 5 order items");

  console.log("\n✅ Database seeded successfully!");
  console.log(
    "📊 Summary: 3 Users | 4 Brands | 5 Categories | 5 Products | 10 Variants | 3 Orders"
  );
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
