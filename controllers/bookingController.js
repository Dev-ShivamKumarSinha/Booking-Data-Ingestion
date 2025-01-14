import { getDB } from "../config/db.js";

//1. POST /bookings - Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { bookingId, customerName, bookingDate, amount, vendor } = req.body;
    // Basic validation
    if (!bookingDate || !customerName || !bookingDate || !amount || !vendor) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    //Normalize data (Date)
    const normalizedBookingDate = new Date(bookingDate);
    // Access the 'bookings' collection
    const db = getDB();
    const collection = db.collection(process.env.COLLECTION_NAME);

    //Check existing bookingId to avoid duplicates
    const existing = await collection.findOne({ bookingId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Booking with this id already exists.",
      });
    }

    const newBooking = {
      bookingId,
      customerName,
      bookingDate: normalizedBookingDate,
      amount,
      vendor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newBooking);
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.log("Error creating booking:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//2. GET /bookings - Retrieve list of bookings
export const getAllBookings = async (req, res) => {
  try {
    const { date, vendor } = req.query;

    //Build dynamic query object
    let query = {};

    //Optional date filter : find booking for a given date (YYYY-MM-DD)
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      query.bookingDate = { $gte: start, $lt: end };
    }
    //Optional vendor filter
    if (vendor) {
      query.vendor = vendor;
    }

    // Access the 'bookings' collection
    const db = getDB();
    const collection = db.collection(process.env.COLLECTION_NAME);

    //Sort by booking date descending
    const bookings = await collection
      .find(query)
      .sort({ bookingDate: -1 })
      .toArray();

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.log("Error getting bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//3. GET /bookings/:id - Retrieve booking by id
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Access the 'bookings' collection
    const db = getDB();
    const collection = db.collection(process.env.COLLECTION_NAME);

    //Find the booking with matching bookingId
    const booking = await collection.findOne({ bookingId: id });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.log("Error getting booking:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//4. DELETE /bookings/:id - Delete booking by id
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Access the 'bookings' collection
    const db = getDB();
    const collection = db.collection(process.env.COLLECTION_NAME);
    
    //Delete the booking
    const result = await collection.deleteOne({ bookingId: id });

    if (result.deletedCount == 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting booking:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
