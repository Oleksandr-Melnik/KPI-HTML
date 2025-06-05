<?php
// Підключення до бази даних
include('db_connection.php');

// Фільтрація за категорією (якщо передано через GET)
$filter = "";
if (isset($_GET['category']) && $_GET['category'] != "") {
    $category = $_GET['category'];
    $filter = "WHERE Category = :category";  // Фільтрація за категорією
}

// Запит до бази даних
$query = "SELECT * FROM Assortment $filter";
$stmt = $db->prepare($query);

if ($filter != "") {
    $stmt->bindParam(':category', $category, PDO::PARAM_STR);
}

$stmt->execute();
?>
