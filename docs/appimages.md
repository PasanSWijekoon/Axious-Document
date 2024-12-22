# PHP Scripts


## Script for Receiving and Saving Weight Data

This PHP script listens for an HTTP POST request from the Arduino and stores the received weight value in a MySQL database.

#### **Functional Overview**:
- The script receives the `weight` value sent via POST.
- It validates the received data to ensure it's within an acceptable range.
- The validated weight is inserted into the MySQL database, with a timestamp for when the data was recorded.

### **PHP Code**:

```php
<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection parameters
$servername = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "weight_db";

// Create connection to MySQL
$conn = new mysqli($servername, $dBUsername, $dBPassword, $dBName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if weight data is received via POST request
if (isset($_POST['weight'])) {
    // Convert the weight value to a float
    $weight = floatval($_POST['weight']);

    // Validate that the weight is a positive number
    if ($weight > 0 && $weight <= 1000.00) {
        // Prepare the SQL query using a prepared statement
        $stmt = $conn->prepare("INSERT INTO save_weights (weight_value, timestamp) VALUES (?, NOW())");
        $stmt->bind_param("d", $weight); // 'd' stands for double (floating point)

        // Execute the query
        if ($stmt->execute()) {
            echo "Weight recorded successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "Invalid weight value";
    }
} else {
    echo "No weight data received";
}

// Close the connection
$conn->close();
?>
```

---

### **Explanation**:

1. **Error Reporting**:
   - Error reporting is enabled with `ini_set('display_errors', 1)` for debugging during development.

2. **CORS Headers**:
   - The script allows cross-origin requests from any domain (`Access-Control-Allow-Origin: *`) and accepts POST requests with `Content-Type` headers.

3. **Database Connection**:
   - The script connects to a MySQL database using credentials (`$servername`, `$dBUsername`, `$dBPassword`, `$dBName`).
   - If the connection fails, the script outputs an error and halts.

4. **POST Request Handling**:
   - The script checks if the `weight` value is sent via an HTTP POST request using `isset($_POST['weight'])`.
   - The weight value is converted to a float using `floatval()` to ensure that it can be stored as a floating-point number in the database.

5. **Validation**:
   - The weight is validated to ensure that it is a positive number and within an acceptable range (0 to 1000). This can be adjusted as needed based on your use case.

6. **Prepared Statement**:
   - A prepared statement is used to securely insert the weight value into the `save_weights` table. This prevents SQL injection attacks.
   - The weight is stored alongside a timestamp (`NOW()`) in the database.

7. **Response**:
   - If the weight is successfully recorded, the script returns a success message: "Weight recorded successfully".
   - If an error occurs, the error message from MySQL is output.

8. **Closing Connections**:
   - Both the prepared statement and database connection are closed after use to free up resources.

---

### Example of **Database Table** (`save_weights`):

```sql
CREATE TABLE IF NOT EXISTS `save_weights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `weight_value` FLOAT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
```

- **`id`**: Primary key, auto-incremented.
- **`weight_value`**: The recorded weight of the tea.
- **`timestamp`**: Automatically records the time the weight was saved.

---
This  script is part of the backend server that communicates with the **Arduino-based Tea Weight Scale System**. When the tea plucker presses the button, the weight is sent to this PHP script via an HTTP POST request, which stores the weight and the timestamp in the database for further processing and reporting.

### How It Fits Into the System:
- **Arduino** reads the weight and sends it to this PHP server.
- **PHP** receives the weight and stores it in a database.
- **Supervisor** can later view this stored data via a front-end interface.
