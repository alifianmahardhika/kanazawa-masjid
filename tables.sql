CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);


CREATE TABLE donations (
    donation_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount INT NOT NULL,
    donation_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);


INSERT INTO roles (role_name) VALUES ('admin'), ('user');

INSERT INTO users (email, name, role_id) VALUES
('admin@example.com', 'Admin User', 1),  -- assuming 1 is the role_id for 'admin'
('user1@example.com', 'User One', 2),   -- assuming 2 is the role_id for 'user'
('user2@example.com', 'User Two', 2);


INSERT INTO donations (user_id, amount, donation_date) VALUES
(1, 100.00, '2024-01-01'),  -- assuming 1 is the user_id for 'Admin User'
(2, 50.00, '2024-01-02'),   -- assuming 2 is the user_id for 'User One'
(3, 75.00, '2024-01-03');   -- assuming 3 is the user_id for 'User Two'

INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1),  -- Admin User assigned 'admin' role
(2, 2),  -- User One assigned 'user' role
(3, 2);  -- User Two assigned 'user' role
