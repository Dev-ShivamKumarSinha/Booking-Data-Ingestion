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
## 4. Sequence Diagram
### 4.1 Overview
* A microservice built with **Node.js** + **Express** and the **official MongoDB Node.js driver** for database operations.
* **Core Components**:
   1. **Express Server** – Handles incoming requests, routes them to controllers.
   2. **Controllers** – Contain the business logic (create, retrieve, delete bookings).
   3. **Database Connection** – Established via MongoDB client, providing a reference to the bookings collection.
   4. **.env / Config** – Stores sensitive or environment-specific details (e.g., MONGO_URI).
      
### 4.2 Data Flow Summary
1. **Client** sends an HTTP request (e.g., `POST /bookings`).
2. **Express** routes it to the appropriate controller function (`createBooking, getAllBookings, getBookingById, deleteBooking`).
3. The **controller** performs:
   * Validation and normalization (e.g., ensure `bookingDate` is valid).
   * Database operation (insert, query, delete).
4. **MongoDB** executes the operation and returns the result (success or error).
5. **Controller** constructs a JSON response with relevant status codes and messages.
6. **Express** returns the response to the **client**.
This design is both **scalable** (each microservice can be independently deployed) and **extensible** (we can add more endpoints or integrate more data sources).

### 4.3 Sample Sequence Diagram
![image](https://github.com/user-attachments/assets/2fbc93a2-ac4c-4a09-850f-8fcd135c4302)

## 5. Roadmap

1. **Multiple Data Sources**  
   - Support ingestion from CSV/Excel, XML, or external REST APIs.  

2. **Scalability**  
   - Containerize the microservice with Docker.  
   - Use Kubernetes to handle higher traffic and failover.  
   - Consider MongoDB sharding for very large data volumes.

3. **Enhanced Error Handling**  
   - Implement custom error classes, robust validation with third party libraries.  
   - Introduce retry logic for transient network/DB issues.  
   - Implement logging and monitoring.

4. **Security**  
   - For production, implement HTTPS (TLS) and authentication (JWT, OAuth2).  
   - Add role-based access control (RBAC) if different user roles are needed.  
   - Encrypt sensitive data at rest and in transit.

5. **Caching & Performance**  
   - Use Redis for caching frequently accessed booking records.  
   - Introduce request rate-limiting or circuit breakers if needed.

6. **Observability & Tracing**  
   - Collect metrics (e.g., request count, DB latency) for dashboards.

By tackling these steps, the PoC can evolve into a **production-grade** booking ingestion service.

## 6. Additional Notes
* **CORS Handling**: Right now, CORS is not currently implemented for specific frontend origins, which may lead to CORS errors when accessing the API from different domains. This should be modified to allow requests from the appropriate frontend origin(s) to ensure smooth communication between the frontend and backend.
* **Error Handling**: Right now, errors are handled at a minimal level. For a production environment, we need more robust error handling and logging.
* **Data Validation**: Add third party libraries for stricter input validation if needed.
* **Security**: Future enhancements might include HTTPS, JWT-based authentication, or role-based access control.
* **Performance**: For high-volume usage, consider indexing fields (like bookingId or bookingDate) in MongoDB, and possibly implement caching (Redis) for frequently accessed queries.

