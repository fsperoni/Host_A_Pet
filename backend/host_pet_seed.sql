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

INSERT INTO pets (name, type, photo, owner_id) 
VALUES  ('Garfield', 'Cat', 'http://garfield.img', 1),
        ('Snoopy', 'Dog', 'http://snoopy.img', 1),
        ('Felix', 'Cat', 'http://felix.img', 2),
        ('Lassie', 'Dog', 'http://lassie.img', 2);

INSERT INTO roles (name)
VALUES ('Host'), ('Pet Owner');

INSERT INTO availabilities (start_date, end_date, user_id, role_id)
VALUES  ('2022-04-16', '2022-04-30', 1, 1),
        ('2022-05-01', '2022-05-15', 1, 1),
        ('2022-05-16', '2022-05-31', 1, 2),
        ('2022-06-01', '2022-06-30', 1, 2),
        ('2022-04-16', '2022-04-30', 2, 1),
        ('2022-05-01', '2022-05-15', 2, 1),
        ('2022-05-16', '2022-05-31', 2, 2),
        ('2022-06-01', '2022-06-30', 2, 2);

INSERT INTO hostings (start_date, end_date, host_id, owner_id)
VALUES  ('2022-04-01', '2022-04-07', 1, 2),
        ('2022-04-08', '2022-04-15', 2, 1),
        ('2022-04-01', '2022-04-07', 2, 1),
        ('2022-04-08', '2022-04-15', 1, 2);

INSERT INTO reviews (rating, comments, reviewer_id, reviewee_id)
VALUES  (5, 'Definitely recommend', 1, 2),
        (4, 'Good experience', 2, 1);