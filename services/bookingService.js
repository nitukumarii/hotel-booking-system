const { Table, db } = require("../config/dbconfig");

// Create unique primary id 
const { v4: uuidv4 } = require("uuid");

// Submit booking to dynamoDB
const createBookingService = async (data = {}) => {
  data.bid = uuidv4();
  const params = {
    TableName: Table,
    Item: data,
  };

  try {
    await db.put(params).promise();

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

// Get all bookings details
const getAllTableService = async (data = {}) => {
  const params = {
    TableName: Table,
  };

  try {
    const { Items = [] } = await db.scan(params).promise();
    return { success: true, data: Items };
  } catch (error) {
    return { success: false, data: null };
  }
};

module.exports = { createBookingService, getAllTableService };
