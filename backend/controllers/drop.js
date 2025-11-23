// dropIndexes.js
const mongoose = require("mongoose");
const User = require("../models/user.model"); // ⭐ MODEL IMPORT IMPORTANT

// ===============
// 1️⃣ DB CONNECTION
// ===============
mongoose
  .connect("mongodb+srv://tejastech2004:Wnvpril4fQyaL6HH@cluster0.wvkjr.mongodb.net/onecrmAi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🚀 DB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ===============
// 2️⃣ DROP INDEX FUNCTION
// ===============
async function dropUserIndexes() {
  try {
    // ⭐ Mongoose automatically binds model to correct collection
    const collection = mongoose.connection.collection("users");

    console.log("📌 Fetching user indexes...");
    const indexes = await collection.getIndexes();
    console.log("📄 Existing Indexes:", indexes);

    // 🌟 email2_1
    if (indexes.email2_1) {
      console.log("🗑 Dropping: email2_1");
      await collection.dropIndex("email2_1");
      console.log("✔ Dropped email2_1");
    } else {
      console.log("⚠ email2_1 not found");
    }

    // 🌟 phone2_1
    if (indexes.phone2_1) {
      console.log("🗑 Dropping: phone2_1");
      await collection.dropIndex("phone2_1");
      console.log("✔ Dropped phone2_1");
    } else {
      console.log("⚠ phone2_1 not found");
    }

    console.log("🎉 All cleanup done successfully!");
  } catch (error) {
    console.error("❌ ERROR dropping indexes:", error);
  } finally {
    mongoose.connection.close();
  }
}

// RUN
dropUserIndexes();
