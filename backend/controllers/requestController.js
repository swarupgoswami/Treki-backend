const axios = require("axios");
const { PrismaClient } = require("../../generated/prisma");  // Importing PrismaClient from the generated folder
const prisma = new PrismaClient();  // Prisma client instance

exports.sendRequest = async (req, res) => {
  const { method, url, headers, body, params } = req.body;

  try {
    const start = Date.now();

    // Simulating the request with axios
    const response = await axios({
      method,
      url,
      headers,
      data: body,
      params
    });

    const time = Date.now() - start;

    // Store the request details in NeonDB (via Prisma)
    await prisma.history.create({
      data: {
        method,
        url,
        headers,
        body,
        status: response.status,
        response: response.data,
        time: `${time}ms`
      }
    });

    res.status(200).json({
      status: response.status,
      headers: response.headers,
      body: response.data,
      time: `${time}ms`
    });

  } catch (err) {
    console.error("Request error:", err.message);
    res.status(500).json({
      error: err.message,
      response: err.response?.data || null
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await prisma.history.findMany({
      orderBy: { createdAt: 'desc' }  // Sort by createdAt in descending order
    });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history." });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await prisma.history.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests." });
  }
};

exports.updateRequestById = async (req, res) => {
  const { id } = req.params;
  const { method, url, headers, body, status, response, time } = req.body;

  try {
    const updatedRequest = await prisma.history.update({
      where: { id: parseInt(id) },  // Ensure id is parsed as integer
      data: { method, url, headers, body, status, response, time }
    });
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ error: "Failed to update the request." });
  }
};

exports.getRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await prisma.history.findUnique({
      where: { id: parseInt(id) }  // Ensure id is parsed as integer
    });
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch the request." });
  }
};

exports.deleteRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRequest = await prisma.history.delete({
      where: { id: parseInt(id) }  // Ensure id is parsed as integer
    });
    if (!deletedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the request." });
  }
};


