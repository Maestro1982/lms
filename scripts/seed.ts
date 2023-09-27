//@ts-nocheck
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const database = new PrismaClient();

const categoriesToAdd = [
  'Computer Science',
  'Music',
  'Fitness',
  'Photography',
  'Accounting',
  'Engineering',
  'Filming',
  'Strapi',
  'Biology',
  'Mathematics',
  'Astronomy',
  'Cooking',
];

async function categoryExists(name) {
  const category = await database.category.findUnique({
    where: { name },
  });
  return Boolean(category);
}

async function addCategories() {
  for (const name of categoriesToAdd) {
    if (await categoryExists(name)) {
      console.log(`⚠️  ${name} already exists, skipping...`);
      continue;
    }

    try {
      await database.category.create({ data: { name } });
      console.log(`✅ ${name} added successfully.`);
    } catch (error) {
      console.log(`🔥 Error adding ${name}: ${error.message}`);
    }
  }
}

async function fetchDadJoke() {
  try {
    const response = await axios.get('https://icanhazdadjoke.com', {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data.joke;
  } catch (error) {
    console.log('🔥 Error fetching dad joke:', error.message);
    return "Couldn't fetch a dad joke right now.";
  }
}

async function main() {
  try {
    await addCategories();
    const joke = await fetchDadJoke();
    console.log(`🎉 Finshed - ${joke}`);
  } catch (error) {
    console.log('❌ Error seeding the database categories', error);
  } finally {
    await database.$disconnect();
  }
}

main();
