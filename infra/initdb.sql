CREATE DATABASE IF NOT EXISTS tasks DEFAULT CHARACTER SET = utf8;

USE tasks;

create table users
(
    id          int auto_increment
        primary key,
    ulid        char(26)      not null unique,
    first_name  varchar(100)  not null,
    last_name   varchar(100)  not null,
    email       varchar(100)  not null,
    avatar_ulid char(26)      null,
    created_on  timestamp(6)  not null,
    created_by  int           not null,
    modified_on timestamp(6)  not null,
    modified_by int           not null,
    status_id   int default 1 null,
    constraint users_email_uindex
        unique (email, status_id)
);



