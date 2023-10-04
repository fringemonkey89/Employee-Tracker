use employees;

INSERT INTO department
    (name)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Information Technology'),
    ('Accounting');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('HR Manager', 110000, 1),
    ('HR', 60000, 1),
    ('Marketing Director', 140000, 2),
    ('Sales', 75000, 2),
    ('IT Director', 165000, 3),
    ('Desktop Support', 150000, 3),
    ('Account Manager', 120000, 4),
    ('Accountant', 90000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jon', 'Petit', 1, NULL),
    ('Max', 'Green', 2, 1),
    ('Calvin', 'Yee', 3, NULL),
    ('Yunii', 'Mikoltod', 4, 3),
    ('Mort', 'Wood', 4, 3),
    ('Sall', 'Greenleif', 5, NULL),
    ('Nathan', 'Cruney', 6, 5),
    ('Drew', 'Mansoor', 6, 5),
    ('Lius', 'Mason', 7, NULL),
    ('Arisa', 'Lee', 7, 8);