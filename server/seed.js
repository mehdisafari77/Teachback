const db = require('./config/connection');
const { Category, User, Tutorial, Room } = require('./models');

db.once('open', async () => {
    await Category.deleteMany();
    const categories = await Category.insertMany([
        {
            name: "Web Technologies"
        },
        {
            name: "Software Engineering"
        },
        {
            name: "Algorithms"
        },
        {
            name: "Soft Skills"
        },
        {
            name: "Project Tours"
        }
    ]);
    console.log("Categories seeded.");

    await User.deleteMany();
    const users = await User.insertMany([
        {
            username: "JulesDelforge",
            email: "jdelforge@test.com",
            password: "TestP@55w0rd"
        },
        {
            username: "BellaThorn",
            email: "bthorne@test.com",
            password: "vamp1res_RULE!"
        }
    ]);
    console.log("Users seeded.");

    await Tutorial.deleteMany();
    const tutorials = await Tutorial.insertMany([
        {
            steps: [
                "Step 1. Procure 2 slices of bread, peanutbutter, jelly, and a butter knife.",
                "Step 2. Open the Peanut butter, and use the knife to extract peanutbutter and spread that onto one side of one slice of bread. Continue until this side is covered, adding more peanutbutter if necessary.",
                "Step 3. Close the peanut butter, open the jelly, and using the same knife, extract some jelly and spread it onto one side of the other slice of bread. Continue until this side is covered, adding more jelly if necessary.",
                "Step 4. Place the slice of bread with the peanut butter on it, peanut butter side down, onto the other slice of bread.",
                "Step 5. Your sandwich is ready to eat. Enjoy!"
            ],
            name: "How to make a PB&J",
            author: users[0]._id,
            category: categories[3]._id // Soft Skills
        }
    ]);
    console.log("Tutorials seeded.");

    // Clean up old rooms if not deleted correctly.d
    await Room.deleteMany();

    process.exit(0);
});