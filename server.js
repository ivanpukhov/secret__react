const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();

const PORT = process.env.PORT || 3000;
const BUILD_PATH = path.join(__dirname, 'build');
const SW_PATH = path.join(__dirname, 'service-worker.js');

app.use(compression()); // Сжатие ответов для уменьшения времени загрузки
app.use(express.static(BUILD_PATH)); // Сервирование статических файлов из папки build

app.get('/service-worker.js', (req, res) => {
    res.sendFile(SW_PATH); // Обслуживание service-worker.js
});

app.get('*', (req, res) => {
    res.sendFile(path.join(BUILD_PATH, 'index.html')); // Перенаправление всех запросов на index.html
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
