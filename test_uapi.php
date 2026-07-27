<?php
echo "<pre>";
$output = shell_exec('uapi SSL list_certs');
echo "UAPI OUTPUT:\n";
echo htmlspecialchars($output);
echo "</pre>";
?>
