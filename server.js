const express = require("express");
const path = require("path");
const app = express();

// Статические файлы
app.use(express.static(path.join(__dirname)));

// Все запросы перенаправляем на index.html (важно для SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Порт Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
