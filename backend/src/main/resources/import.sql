INSERT INTO admin (id, username, password)
VALUES (1, 'admin1', '1234')
    ON CONFLICT DO NOTHING;

INSERT INTO book (id, title, author, genre, isbn, available)
VALUES
    (1, 'Clean Code', 'Robert C. Martin', 'Programming', '97801', true),
    (2, 'The Pragmatic Programmer', 'Andrew Hunt', 'Programming', '97802', true)
    ON CONFLICT DO NOTHING;
