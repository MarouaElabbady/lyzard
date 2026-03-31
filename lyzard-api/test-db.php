<?php
$host = 'aws-1-eu-central-1.pooler.supabase.com';
$ref  = 'ljfgxjysprmfnqyactag';
$pass = 'L.Fs46wGW+Um/3z';
$cert = 'C:/Users/Reda/Music/LAYZARD/prod-ca-2021.crt';

$tests = [
    ['port'=>6543, 'user'=>"postgres.$ref"],
    ['port'=>5432, 'user'=>"postgres.$ref"],
];

foreach ($tests as $i => $t) {
    echo "Test #$i: {$host}:{$t['port']} user={$t['user']}...\n";
    $dsn = "pgsql:host=$host;port={$t['port']};dbname=postgres;sslmode=require;sslrootcert=$cert";
    try {
        $pdo = new PDO($dsn, $t['user'], $pass, [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_TIMEOUT=>5]);
        echo "✅ SUCCESS: " . $pdo->query('SELECT version()')->fetchColumn() . "\n";
        exit(0);
    } catch (PDOException $e) {
        echo "❌ " . $e->getMessage() . "\n\n";
    }
}
exit(1);
