# Booking Data Ingestion System (PoC)
Hello and welcome to the Booking Data Ingestion System repository! This proof-of-concept (PoC) demonstrates a simple microservice that ingests booking data from various travel vendors (airlines, hotels, etc.) and stores it in a MongoDB database. The system also provides RESTful APIs to create, view, and delete bookings.
## Why This PoC Exists
* **Scalability**: We’re prototyping a backend service that can handle large volumes of booking data.
* **Flexibility**: Bookings can come in different formats, but we normalize and store them consistently.
* **Future-Ready**: While we focus primarily on basic CRUD operations, security and advanced error handling can be added later to make this production-grade.

## 1. Key Features
1. **Create Bookings** – Ingest a new booking (including booking ID, customer details, date, amount, vendor).
2. **Retrieve All Bookings** – Get a list of all bookings, with optional filters (date, vendor).
3. **Retrieve Booking by ID** – Fetch a specific booking using its unique bookingId.
4. **Delete Booking** – Remove a booking from the database by its bookingId.
**Note**: This PoC intentionally leaves out authentication and other security measures so we can focus on data ingestion. We’ll address security in future iterations!

## 2. Quick Start
### 2.1 Prerequisites
* **Node.js** (v14+ recommended)
* **npm** (comes with Node.js)
* **A MongoDB Atlas URI** (or local MongoDB instance)
### 2.2 Clone & Install
1. **Clone** the repository (if you haven’t already):bash
> Copy code
> ```
> git clone https://github.com/Dev-ShivamKumarSinha/Booking-Data-Ingestion.git
> ```
2. **Navigate** into the directory:bash
>Copy code
> ```
> cd booking-data-ingestion
> ```
3. **Install** project dependencies:bash
> Copy code
> ```
> npm install
> ```
### 2.3 Environment Setup
1. Create a .env file in the root directory:bash
> Copy code
> ```
> touch .env
> ```
2. Inside .env, add:bash
> Copy code
>```
>MONGO_URI=mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority
>PORT=3000
>DATABASE_NAME=<databaseName>
>COLLECTION_NAME=<collectionName>
>```  
Replace `<username>, <password>, <clusterName>`, `<databaseName>` and `<collectionName>` with your actual MongoDB Atlas credentials/info.
3. Ensure your **package.json** has "type": "module" if you’re using ES modules:json
> Copy code
> ```
> {
> "name": "booking-data-ingestion",
> "version": "1.0.0",
> "type": "module",
> // ...
> }
> ```  
### 2.4 Run the Service
* Development mode (auto-reloads on file changes):bash
> Copy code
> ```
> npm run dev
> ```
* Production mode:bash
> Copy code
> ```
> npm run start
>```  
By default, the service will listen on http://localhost:3000.

## 3. API Overview
Below is a quick reference for the endpoints we currently support. Each endpoint accepts and returns JSON.
### 3.1 Create a Booking
* **Endpoint**: POST /bookings
* **Payload** (example):json
> Copy code
> ```
> {
>   "bookingId": "B001",
>   "customerName": "Jane Doe",
>   "bookingDate": "2025-01-13",
>   "amount": 4500,
>   "vendor": "XYZ Airlines"
> }```
* **Successful Response**:json
>Copy code
>```
>{
>  "success": true,
>  "message": "Booking created successfully!",
>  "data": {
>        "bookingId": "B001",
>       "customerName": "Jane Doe",
>       "bookingDate": "2025-01-13T00:00:00.000Z",
>       "amount": 4500,
>       "vendor": "XYZ Airlines",
>       "createdAt": "...",
>       "updatedAt": "..."
>  }
>}
>```
### 3.2 Retrieve All Bookings
* **Endpoint**: `GET /bookings`
* **Optional Query Params**:
    * `?date=YYYY-MM-DD` (filter by bookingDate)
    * `?vendor=VendorName`
* **Successful Response**:json
> Copy code
> ```
> {
>  "success": true,
> "data": [
>    {
>      "bookingId": "B001",
>      "customerName": "Jane Doe",
>      "bookingDate": "2025-01-13T00:00:00.000Z",
>      "amount": 4500,
>      "vendor": "XYZ Airlines",
>      "createdAt": "...",
>      "updatedAt": "..."
>    },
>    ...
>  ]
>}
> ```

### 3.3 Retrieve a Booking by ID
* **Endpoint**: `GET /bookings/:id`
* **Path Param**: `id` (e.g., `B001`)
* **Successful Response** (if found):json
> Copy code
> ```
>{
>  "success": true,
>  "data": {
>    "bookingId": "B001",
>    "customerName": "Jane Doe",
>    "bookingDate": "2025-01-13T00:00:00.000Z",
>    "amount": 4500,
>    "vendor": "XYZ Airlines",
>    "createdAt": "...",
>    "updatedAt": "..."
>  }
>}
>```
* **Error Response** (if not found):json
> Copy code
> ```
> {
>  "success": false,
>  "message": "Booking not found"
>}
> ```

### 3.4 Delete a Booking by ID
* **Endpoint**: `DELETE /bookings/:id`
* **Path Param**: `id` (e.g., `B001`)
* **Successful Response**:json
> Copy code
> ```
> {
>   "success": true,
>   "message": "Booking deleted successfully"
> }
> ```
* **Error Response**:json
 > Copy code
  > ```
  >{
  >    "success": false,
  >   "message": "Booking not found"
  > }
  > ```
## 4. Additional Notes
* **Error Handling**: Right now, errors are handled at a minimal level. For a production environment, we need more robust error handling and logging.
* **Data Validation**: Add third party libraries for stricter input validation if needed.
* **Security**: Future enhancements might include HTTPS, JWT-based authentication, or role-based access control.
* **Performance**: For high-volume usage, consider indexing fields (like bookingId or bookingDate) in MongoDB, and possibly implement caching (Redis) for frequently accessed queries.

