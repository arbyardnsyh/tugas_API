<?php
// URL API
$urI  =  'https://jsonplaceholder.typicode.com/posts';

// Mengambil data dari API
$response = file_get_contents($urI);

// Mengubah data JSON menjadi array asosiatif
$data = json_decode($response, true);

// Memproses filter berdasarkan Title atau ID
$filter = isset($_GET['filter']) ? $_GET['filter'] : '';
$filteredData = array_filter($data, function($post) use ($filter) {
    return strpos(strtolower($post['title']), strtolower($filter)) !== false || $post['id'] == $filter;
});
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Posts (PHP)</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Data Posts dari JSONPlaceholder API (PHP)</h1>

    <!-- Form untuk Filter -->
    <form method="GET">
        <label for="filter">Filter by Title or ID:</label>
        <input type="text" name="filter" id="filter" value="<?php echo htmlspecialchars($filter); ?>">
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
        <tbody>
            <?php foreach ($filteredData as $post): ?>
            <tr>
                <td><?php echo $post['id']; ?></td>
                <td><?php echo htmlspecialchars($post['title']); ?></td>
                <td><?php echo htmlspecialchars($post['body']); ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
