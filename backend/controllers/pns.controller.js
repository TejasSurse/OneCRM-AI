const PNS = require("../models/pns.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

// ➤ Add Product/Service
exports.addPNS = asyncHandler(async (req, res) => {
  const { type, name, cost } = req.body;

  if (!type || !name || !cost) {
    throw new ApiError(400, "type, name and cost are required");
  }

  const exists = await PNS.findOne({ name });
  if (exists) {
    throw new ApiError(409, "Product/Service already exists with this name");
  }

  const item = await PNS.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, item, "Product/Service added successfully"));
});

// ➤ Update Product/Service
exports.updatePNS = asyncHandler(async (req, res) => {
  const pnsId = req.params.id;

  const updated = await PNS.findByIdAndUpdate(pnsId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) throw new ApiError(404, "Product/Service not found");

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Product/Service updated successfully"));
});

// ➤ Delete Product/Service
exports.deletePNS = asyncHandler(async (req, res) => {
  const pnsId = req.params.id;

  const deleted = await PNS.findByIdAndDelete(pnsId);

  if (!deleted) throw new ApiError(404, "Product/Service not found");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product/Service deleted successfully"));
});

// ➤ Get Single Product/Service
exports.getPNS = asyncHandler(async (req, res) => {
  const pnsId = req.params.id;

  const item = await PNS.findById(pnsId);

  if (!item) throw new ApiError(404, "Product/Service not found");

  return res
    .status(200)
    .json(new ApiResponse(200, item, "Product/Service fetched successfully"));
});

// ➤ Get All Product/Service
exports.getAllPNS = asyncHandler(async (req, res) => {
  const items = await PNS.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, items, "Products & Services list fetched"));
});
