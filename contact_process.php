<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $name    = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : '';
    $email   = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST["message"]) ? trim($_POST["message"]) : '';

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "الرجاء التأكد من تعبئة جميع الحقول بشكل صحيح.";
        exit;
    }

    // طباعة البيانات للتأكد من وصولها بنجاح محلياً
    echo "<h2 style='color: green;'>تم استقبال البيانات بنجاح!</h2>";
    echo "<p><strong>الاسم:</strong> " . $name . "</p>";
    echo "<p><strong>البريد:</strong> " . $email . "</p>";
    echo "<p><strong>الرسالة:</strong> " . $message . "</p>";

} else {
    header("Location: index.html");
    exit;
}
?>