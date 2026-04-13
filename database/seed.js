const { sequelize, User, Exercise, Log } = require('./setup');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); // resets DB

    console.log("Database reset complete");

    // -------------------
    // Create Users
    // -------------------
    const users = await User.bulkCreate([
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Smith", email: "bob@example.com" },
      { name: "Charlie Brown", email: "charlie@example.com" }
    ]);

    // -------------------
    // Create Exercises
    // -------------------
    const exercises = await Exercise.bulkCreate([
      { name: "Running", category: "Cardio", difficulty: "Medium" },
      { name: "Push Ups", category: "Strength", difficulty: "Hard" },
      { name: "Yoga", category: "Flexibility", difficulty: "Easy" }
    ]);

    // -------------------
    // Create Logs (IMPORTANT: relationships)
    // -------------------
    await Log.bulkCreate([
      {
        userId: users[0].id,
        exerciseId: exercises[0].id,
        duration: 30,
        repetitions: 0,
        date: new Date(),
        notes: "Morning run in the park"
      },
      {
        userId: users[1].id,
        exerciseId: exercises[1].id,
        duration: 10,
        repetitions: 50,
        date: new Date(),
        notes: "Upper body workout"
      },
      {
        userId: users[2].id,
        exerciseId: exercises[2].id,
        duration: 45,
        repetitions: 0,
        date: new Date(),
        notes: "Relaxing yoga session"
      }
    ]);

    console.log("Database seeded successfully!");

  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();