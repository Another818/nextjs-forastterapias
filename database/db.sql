CREATE TABLE product(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL, 
    description VARCHAR(200),
    price DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registro(
    id VARCHAR(50) PRIMARY KEY,
    productId int UNSIGNED NOT NULL,
    nombre_u VARCHAR(100),
    email VARCHAR(200),
    description VARCHAR(200),
    price DECIMAL(10,2),
    pagado TINYINT(1),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES product(id)
);