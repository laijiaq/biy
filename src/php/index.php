<?php
// 假设这里已经进行了适当的安全过滤和验证，确保 $_POST['user'] 和 $_POST['password'] 是安全的

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['user'];
    $password = $_POST['password'];

    $servername = "localhost";
    $dbname = "news";
    $username_db = "root";  // 替换为实际的 MySQL 用户名
    $password_db = "123456";  // 替换为实际的 MySQL 密码
    $post = 3307;

    // 创建 MySQL 连接
    $conn = new mysqli($servername, $username_db, $password_db, $dbname,$post);

    // 检查连接是否成功
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // 准备 SQL 查询语句，使用预处理语句来防止 SQL 注入,其中？代表占位符，表示在执行查询之前，需要将 ? 替换为实际的参数
    $sql = "SELECT * FROM user WHERE username = ? AND password = ?";

    // 预处理
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $user, $password);

    // 执行查询
    $stmt->execute();
    // 获取查询后的结果
    $result = $stmt->get_result();

    // 检查是否有匹配的用户，其中num_rows 属性返回匹配的行数
    if ($result->num_rows == 1) {
        // 用户验证成功
        $response = array("status" => "success", "message" => "Login successful!");
        echo json_encode($response);
    } else {
        // 用户验证失败
        $response = array("status" => "error", "message" => "Login failed. Invalid username or password.");
        echo json_encode($response);
    }

    // 关闭数据库连接
    $stmt->close();
    $conn->close();
} else {
    // 如果不是 POST 请求，返回错误信息
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("status" => "error", "message" => "Only POST requests are allowed."));
}
?>