const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const PNS = require("../models/pns.model");


// 📌 Add User
exports.addUser = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    throw new ApiError(400, "name, email and phone are required");
  }

  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    throw new ApiError(409, "User already exists with this email or phone");
  }

  const user = await User.create({
    ...req.body,
    email2: req.body.email2 || null,
  phone2: req.body.phone2 || null,
    products: Array.isArray(req.body.products) ? req.body.products : [],
    services: Array.isArray(req.body.services) ? req.body.services : []
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User added successfully"));
});
// 📌 Update User
// 📌 Update User
exports.updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const updateData = {
    ...req.body,
    email2: req.body.email2 || null,
  phone2: req.body.phone2 || null,
    products: Array.isArray(req.body.products) ? req.body.products : [],
    services: Array.isArray(req.body.services) ? req.body.services : []
  };

  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully"));
});


// 📌 Delete User
exports.deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByIdAndDelete(userId);

  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});


exports.getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId); // no populate

  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});


exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }); // no populate

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});


exports.getCustomerWithDetails = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findOne({
    _id: userId,
    stage: 2, // only fetch customers
  })
    .populate("products")   // populate PNS
    .populate("services");  // populate PNS

  if (!user) throw new ApiError(404, "Customer not found");

  const totalProductsCost = (user.products || []).reduce(
    (sum, p) => sum + (p.cost || 0),
    0
  );

  const totalServicesCost = (user.services || []).reduce(
    (sum, s) => sum + (s.cost || 0),
    0
  );

  const totalRevenue = totalProductsCost + totalServicesCost;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        customer: user,
        purchasedProducts: user.products,
        purchasedServices: user.services,
        totalProductsCost,
        totalServicesCost,
        totalRevenue,
      },
      "Customer details + products + services fetched successfully"
    )
  );
});


exports.getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ stage: 2 }) // only customers
    .populate("products") // populate PNS model
    .populate("services") // populate PNS model
    .sort({ createdAt: -1 });

  // Add calculated totals
  const enriched = customers.map((c) => {
    const totalProductsCost = (c.products || []).reduce(
      (sum, p) => sum + (p.cost || 0),
      0
    );

    const totalServicesCost = (c.services || []).reduce(
      (sum, s) => sum + (s.cost || 0),
      0
    );

    return {
      ...c.toObject(),
      totalProductsCost,
      totalServicesCost,
      totalRevenue: totalProductsCost + totalServicesCost,
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, enriched, "All customers fetched successfully"));
});