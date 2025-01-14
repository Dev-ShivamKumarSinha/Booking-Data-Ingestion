import {Router} from 'express';
const router = Router();

import { createBooking, deleteBooking, getAllBookings, getBookingById } from '../controllers/bookingController.js';

// POST /bookings
router.post("/",createBooking);
// GET /bookings
router.get("/",getAllBookings);
// GET /bookings
router.get("/:id",getBookingById);
// DELETE /bookings
router.delete("/:id",deleteBooking);

export default router;