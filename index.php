
<?php
// Підключення до бази даних
include('db_connection.php');

// Далі твій PHP-код для отримання даних з бази даних і їх виведення
?>
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Тисяча Зірок - Ювелірні Вироби</title>
  <link rel="stylesheet" href="./styles.css">
  <link rel="stylesheet" href="./modal.css">
</head>
<body>
  <div class="grid-container">
    <header>
        <div id="logo-container">
            <img id="logo-image" src="IMG/лого.png" alt="Тисяча Зірок">
        </div>
        <div id="logo-text">Тисяча Зірок - Елегантні Ювелірні Вироби</div>
    </header>

    <nav>
      <ul>
        <li><a href="./index.php">Головна</a></li>
        <li><a href="./about.html">Про нас</a></li>
        <li><a href="./contacts.html">Контактна інформація</a></li>
        <li><button id="open-cart">Кошик (<span id="cart-count">0</span>)</button></li>
      </ul>
    </nav>

    <!-- Форма фільтрації -->
    <section>
      <form method="GET" action="index.php">
        <label for="category">Категорія:</label>
        <select name="category" id="category">
            <option value="">Усі</option>
            <option value="Каблучки" <?php if (isset($category) && $category == 'Каблучки') echo 'selected'; ?>>Каблучки</option>
            <option value="Сережки" <?php if (isset($category) && $category == 'Сережки') echo 'selected'; ?>>Сережки</option>
            <option value="Браслети" <?php if (isset($category) && $category == 'Браслети') echo 'selected'; ?>>Браслети</option>
        </select>
        <button type="submit">Фільтрувати</button>
      </form>
    </section>

    <main>
        <h1>Ласкаво просимо до "Тисяча Зірок"!</h1>
        <p class="intro-text">
          Ми пропонуємо вам найкращі ювелірні вироби: від елегантних кольє до витончених каблучок. Відкрийте для себе незабутній блиск нашого асортименту.
        </p>

        <!-- Секція товарів -->
        <div id="products">
          <?php
            // Запит до бази даних
            $filter = "";
            if (isset($_GET['category']) && $_GET['category'] != "") {
                $category = $_GET['category'];
                $filter = "WHERE Category = :category";
            }

            $query = "SELECT * FROM Assortment $filter";
            $stmt = $db->prepare($query);

            if ($filter != "") {
                $stmt->bindParam(':category', $category, PDO::PARAM_STR);
            }

            $stmt->execute();

            // Виведення результатів
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "<div class='item'>
                        <img src='" . $row['Image'] . "' alt='" . $row['Name'] . "' height='200'>
                        <div class='item-info'>
                            <div class='item-title'>" . $row['Name'] . "</div>
                            <div class='item-price'>Ціна: <span>" . $row['Price'] . " грн</span></div>
                            <button class='add-to-cart' data-id='" . $row['Id'] . "' data-name='" . $row['Name'] . "' data-price='" . $row['Price'] . "'>🛒</button>
                        </div>
                      </div>";
            }
          ?>
        </div>
    </main>

    <footer>
      <p>© 2025 Тисяча Зірок</p>
    </footer>
  </div>

  <!-- Модальне вікно кошика -->
  <div id="cart-modal" class="modal">
    <div class="modal-content">
      <h2>Ваш Кошик</h2>
      <div id="cart-items"><p>Ваш кошик порожній</p></div>
      <p>Загальна сума: <span id="total-price">0 грн</span></p>
      <button id="close-cart">Закрити</button>
    </div>
  </div>

  <script src="./cart.js"></script>
</body>
</html>
