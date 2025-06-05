<?php
// Параметри для підключення до MySQL
$host = 'localhost';  // або IP-адреса сервера
$dbname = 'asort'; // Назва твоєї бази даних
$username = 'root'; // Ім'я користувача для підключення до БД
$password = ''; // Пароль для підключення до БД

// Підключення до MySQL через PDO
try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Увімкнення режиму помилок
} catch (PDOException $e) {
    echo "Помилка підключення до бази даних: " . $e->getMessage();
}
?>

