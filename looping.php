<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tugas 1 - Looping PHP</title>

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(180deg, #f0f7ff, #ffffff);
      color: #2c2c2c;
    }

    /* TRANSISI INTRO */
    .intro {
      position: absolute;
      inset: 0;
      background: #f0f7ff; 
      z-index: 100;
      pointer-events: none;
      animation: fadeOutTransition 1.0s ease-in-out forwards;
      animation-delay: 0.2s;
    }

    @keyframes fadeOutTransition {
      from { opacity: 1; }
      to { opacity: 0; visibility: hidden; }
    }

    /* HEADER */
    header {
      background-color: #1e3a8a;
      padding: 20px 5%;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 900;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      animation: slideDown 0.5s ease-out;
    }

    @keyframes slideDown {
      from { transform: translateY(-100%); }
      to { transform: translateY(0); }
    }

    .logo-title {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .logo {
      width: 70px;
      height: 70px;
      object-fit: contain;
      filter: brightness(0) invert(1); 
      margin-right: -5px;
    }

    header h1 {
      font-size: 22px;
      font-weight: 700;
    }

    /* NAVIGASI */
    nav {
      display: flex;
      gap: 10px;
    }

    nav a {
      text-decoration: none;
      font-weight: 500;
      color: #bfdbfe;
      font-size: 14px;
      transition: 0.3s;
      padding: 8px 12px;
      border-radius: 8px;
    }

    nav a:hover, nav a.active {
      color: white;
      background: rgba(255,255,255,0.1);
    }

    /* MAIN CONTENT */
    main {
      flex: 1;
      max-width: 1000px;
      margin: 40px auto;
      padding: 0 20px;
    }

    .container-biru {
      background-color: #4472C4; /* Warna biru */
      color: white;
      padding: 20px;
      display: block; 
      min-width: 100%;
      max-width: 500px;
      line-height: 1.6;
      border: 1px solid #3b63a8;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .text-list {
      font-weight: bold;
      font-size: 14px;
    }

    /* FOOTER */
    footer {
      background-color: #1e3a8a;
      text-align: center;
      padding: 40px 20px;
      font-size: 14px;
      color: #bfdbfe;
      margin-top: auto;
      width: 100%;
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      header {
        flex-direction: column;
        gap: 15px;
        padding: 20px;
      }
      nav {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  </style>
</head>

<body>


  <header></header>

  <main>
    <h2>Hasil Perulangan 1 - 1000:</h2>
    <div class="container-biru">
        <div class="text-list">
            <?php
            // Menggunakan perulangan FOR
            for ($i = 1; $i <= 1000; $i++) {
                // Menampilkan teks sesuai format nomor
                echo $i . ". Ini adalah hari ke-" . $i . " belajar PHP <br>";
            }
            ?>
        </div>
    </div>

  </main>

  <footer></footer>

  <script src="script.js"></script>

</body>
</html>
