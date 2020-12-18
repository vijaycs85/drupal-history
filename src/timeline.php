<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Drupal history</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <style>
        .timeline {
            position: absolute;
            width: 10px;
            height: 100%;
            left: 50%;
            margin-left: -6px;
            z-index:-1;
            background-image:linear-gradient(180deg, #ffc107 0%, #ffc107 100%);
        }
    </style>
</head>
<body>
<header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Drupal 20</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>
</header>
<main role="main">
    <section class="container">
        <?php foreach ($result as $year => $items): ?>
        <div class="year <?php print $year; ?>">
            <div class="timeline"></div>
            <div class="row align-items-center">
                <h4 class="btn btn-warning mx-auto"
                    style="width: 200px;"><?php print $year; ?></h4></div>
            <?php foreach ($items as $delta => $item): ?>
            <?php if ($delta % 2 == 0): ?> <div class="row gx-5 gy-5"><?php endif; ?>
            <div class="col-6 <?php ($delta % 2) ? print 'pt-5' : NULL; ?>">
                <h4><?php print $item['title'] ?><?php if (!empty($item['version'])): ?> <span
                        class="badge bg-primary"><?php print $item['version'] ?></span><?php endif; ?>
                </h4>
                <div class="shadow p-3 mb-5 border bg-light shadow-md"><?php print $item['description']; ?>
                </div>
            </div>
            <?php if ($delta % 2 == 1 || (count($items) % 2 == 1 && $delta == count($items) - 1)): ?></div><?php endif; ?>
            <?php endforeach; ?>
        </div>
        <?php endforeach; ?>
    </section>
</main>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"></script>
</body>
</html>
