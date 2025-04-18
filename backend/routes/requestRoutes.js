const express = require("express");
const router = express.Router();
const { sendRequest, getHistory,getAllRequests,getRequestById,updateRequestById,deleteRequestById } = require("../controllers/requestController");

router.post("/send", sendRequest);  
router.get("/", getAllRequests);  // To fetch all requests
router.get("/:id", getRequestById);  // To fetch a specific request by ID
router.put("/:id", updateRequestById);  // To update a request by ID
router.delete("/:id", deleteRequestById);  // To delete a request by ID




router.get("/history", getHistory);      

module.exports = router;
