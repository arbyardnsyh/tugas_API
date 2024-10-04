const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Mengambil data dari API JSON Placeholder
app.get('/', async (req, res) => {
    try {
        // Menangkap parameter filter dari URL
        const filter = req.query.filter || '';
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        let data = response.data;

        // Memfilter data berdasarkan Title atau ID
        if (filter) {
            data = data.filter(post => post.title.toLowerCase().includes(filter.toLowerCase()) || post.id == filter);
        }

        let tableHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Data Posts (Node.js)</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <h1>Data Posts dari JSON Placeholder API (Node.js)</h1>

            <!-- Form untuk Filter -->
            <form method="GET">
                <label for="filter">Filter by Title or ID:</label>
                <input type="text" name="filter" id="filter" value="${filter}">
                <button type="submit">Filter</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>`;

        // Membuat baris tabel untuk setiap post
        data.forEach(post => {
            tableHTML += `
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
            </tr>`;
        });

        tableHTML += `
                </tbody>
            </table>
        </body>
        </html>`;

        res.send(tableHTML);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
