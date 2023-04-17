const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const db = new AWS.DynamoDB.DocumentClient();

const Table = "bookings";

module.exports = { db, Table };
