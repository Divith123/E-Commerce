const express = require("express");

const router = express.Router();

const {
  logVisitor,
  getAllVisitors,
  getVisitorById,
  deleteVisitor,
  getVisitorsByDate,
  countVisitorsByDate,
  countAllVisitors,
} = require("../controllers/visitor");

router.route("/").get(getAllVisitors).post(logVisitor);
router.route("/count").get(countAllVisitors);
router.route("/:id").get(getVisitorById).delete(deleteVisitor);
router.route("/date/:date").get(getVisitorsByDate);
router.route("/count/date/:date").get(countVisitorsByDate);

module.exports = router;
