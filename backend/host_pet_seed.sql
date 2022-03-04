-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, phone, postal_code, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'johndoe@gmail.com',
        '555-123-4567',
        'T2Y 3X8',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'janedoe@gmail.com',
        '555-987-1234',
        'T2Y 4M2',
        TRUE);