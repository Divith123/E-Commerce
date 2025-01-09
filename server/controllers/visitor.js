const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Log a new visitor
const logVisitor = async (request, response) => {
  try {
    const ipAddress = request.body.ipAddress || "Unknown IP";
    const userAgent = request.headers["user-agent"] || "Unknown User Agent";

    // Check if the visitor already exists
    const existingVisitor = await prisma.visitor.findFirst({
      where: {
        ipAddress,
        userAgent,
      },
    });

    if (existingVisitor) {
      return response
        .status(200)
        .json({ message: "Visitor already logged", visitor: existingVisitor });
    }

    // If not, create a new visitor
    const visitor = await prisma.visitor.create({
      data: {
        ipAddress,
        userAgent,
      },
    });

    return response.status(201).json(visitor);
  } catch (error) {
    console.error("Error logging visitor:", error);
    return response.status(500).json({ error: "Error logging visitor" });
  }
};


// Get all visitors (paginated)
const getAllVisitors = async (request, response) => {
  try {
    const { page = 1, limit = 10 } = request.query;
    const visitors = await prisma.visitor.findMany({
      skip: (page - 1) * limit,
      take: parseInt(limit, 10),
    });

    return response.status(200).json(visitors);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return response.status(500).json({ error: "Error fetching visitors" });
  }
};

// Count all visitors
const countAllVisitors = async (request, response) => {
  try {
    const count = await prisma.visitor.count();
    return response.status(200).json({ totalVisitors: count });
  } catch (error) {
    console.error("Error counting visitors:", error);
    return response.status(500).json({ error: "Error counting visitors" });
  }
};

const getVisitorsByDate = async (request, response) => {
  try {
    const { date } = request.params;
    const { page = 1, limit = 10 } = request.query;

    const [visitors, totalCount] = await Promise.all([
      prisma.visitor.findMany({
        where: {
          visitDate: {
            gte: new Date(`${date}T00:00:00Z`),
            lt: new Date(`${date}T23:59:59Z`),
          },
        },
        skip: (page - 1) * limit,
        take: parseInt(limit, 10),
      }),
      prisma.visitor.count({
        where: {
          visitDate: {
            gte: new Date(`${date}T00:00:00Z`),
            lt: new Date(`${date}T23:59:59Z`),
          },
        },
      }),
    ]);

    return response.status(200).json({ visitors, total: totalCount });
  } catch (error) {
    console.error("Error fetching visitors by date:", error);
    return response.status(500).json({ error: "Error fetching visitors by date" });
  }
};

// Count visitors for a custom date
const countVisitorsByDate = async (request, response) => {
  try {
    const { date } = request.params;

    const count = await prisma.visitor.count({
      where: {
        visitDate: {
          gte: new Date(`${date}T00:00:00Z`),
          lt: new Date(`${date}T23:59:59Z`),
        },
      },
    });

    return response.status(200).json({ visitorsOnDate: count });
  } catch (error) {
    console.error("Error counting visitors by date:", error);
    return response.status(500).json({ error: "Error counting visitors by date" });
  }
};

// Get visitor by ID
const getVisitorById = async (request, response) => {
  try {
    const { id } = request.params;

    const visitor = await prisma.visitor.findUnique({
      where: { id },
    });

    if (!visitor) {
      return response.status(404).json({ error: "Visitor not found" });
    }

    return response.status(200).json(visitor);
  } catch (error) {
    console.error("Error fetching visitor:", error);
    return response.status(500).json({ error: "Error fetching visitor" });
  }
};

// Delete a visitor by ID
const deleteVisitor = async (request, response) => {
  try {
    const { id } = request.params;

    await prisma.visitor.delete({
      where: { id },
    });

    return response.status(204).send();
  } catch (error) {
    console.error("Error deleting visitor:", error);
    return response.status(500).json({ error: "Error deleting visitor" });
  }
};

module.exports = {
  logVisitor,
  getAllVisitors,
  getVisitorById,
  deleteVisitor,
  getVisitorsByDate,
  countVisitorsByDate,
  countAllVisitors,
};
