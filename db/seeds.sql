USE employees_systemDB;

INSERT INTO department(name)
VALUES
    ('Sales'),
    ('Accounting'),
    ('Marketing'),
    ('Production'),
    ('Humarn Resources');

INSERT INTO role(title, salary, department_id)
VALUES
    ('Junior Salesperson', 35000.00, 1),
    ('Salesperson', 50000.00, 1),
    ('Accountant', 75000.00, 2),
    ('Junior Marketer', 40000.00, 3),
    ('Marketing Assistant', 60000.00, 3),
    ('Marketing Lead', 90000.00, 3),
    ('Engineer', 100000.00, 4),
    ('HR Representative', 70000.00, 5);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
    ('Allen', 'Iverson', 2),
    ('Gandalf', 'The Grey', 7),
    ('Trevor', 'Wiegand', 5),
    ('Chipper', 'Jones', 4),
    ('Landon', 'Donovan', 1),
    ('George', 'Feeney', 6),
    ('The', 'Joker', 8),
    ('Shelley', 'Frankenstein', 3);