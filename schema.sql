DROP DATABASE IF EXISTS employees;
create database employees;

use employees;

create table employee(
    id int auto_increment primary key,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int NOT NULL,
    manager_id int
);

create table role(
    role_id int NOT NULL,
    title varchar(30) NOT NULL,
    salary decimal(10, 2),
    department_id int NOT NULL
);

create table department(
    department_id int NOT NULL,
    name varchar(30) NOT NULL
);