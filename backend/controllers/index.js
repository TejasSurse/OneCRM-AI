const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://tejastech2004:Wnvpril4fQyaL6HH@cluster0.wvkjr.mongodb.net/onecrmAi"
)
  .then(() => console.log("🚀 DB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

async function dropUserIndexes() {
  try {
    const collection = mongoose.connection.collection("users");

    console.log("📌 Fetching current indexes...");
    const indexes = await collection.indexes();
    console.log(indexes);

    for (const idx of indexes) {
      if (idx.name.includes("email2") || idx.name.includes("phone2")) {
        console.log("🗑 Dropping index:", idx.name);
        await collection.dropIndex(idx.name);
      }
    }

    console.log("🎉 All problematic indexes removed!");
  } catch (err) {
    console.log("❌ ERROR:", err);
  } finally {
    mongoose.connection.close();
  }
}

dropUserIndexes();
