<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login page</title>
</head>
<style>

body{
    display: flex;
    justify-content: center;
}

    form{
        display: flex;
        flex-direction: column;
        width: 300px;
    }

    form >input{
        margin-bottom: 20px;
    }

    </style>

<body>


<form action="register.php"method="POST" >
    <h2>Registrati </h2>
    <label for="email">Email</label>
    <input type="text" name="email" id="email" required>

    <label for="username">Username</label>
    <input type="text" name="username" id="username" required>

    <label for="password">Password</label>
    <input type="text" name="password" id="password" required>


     <input type="submit" value="invia">
    
</body>
</html>