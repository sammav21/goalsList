drop database if exists goals_list_test;
create database goals_list_test;
use goals_list_test;

create table app_user (
	app_user_id int primary key auto_increment,
    username varchar(150) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_role (
	app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role(
	app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
		primary key (app_user_id, app_role_id),
	constraint fk_app_user_role_user_id
		foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_app_user_role_role_id
		foreign key (app_role_id)
        references app_role(app_role_id)
);
create table goal (
	goal_id int primary key auto_increment,
    `name` varchar(255) not null,
    checked bit not null default(0),
    reason varchar(255),
    realistic_deadline varchar(50),
    ambitious_deadline varchar(50),
    app_user_id int not null,
	constraint fk_goal_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table stepping_stone (
	stepping_stone_id int primary key auto_increment,
    `name` varchar(100) not null,
	checked bit not null default(0),
    goal_id int not null,
    constraint fk_stone_goal_id
		foreign key (goal_id)
        references goal(goal_id)
);

delimiter //
create procedure set_known_good_state()
begin

delete from stepping_stone;
alter table stepping_stone auto_increment = 1;
delete from goal;
alter table goal auto_increment = 1;
delete from app_user_role;
alter table app_user_role auto_increment = 1;
delete from app_role;
alter table app_role auto_increment = 1;
delete from app_user;
alter table app_user auto_increment = 1;

insert into app_role (`name`) values
		('USER'),
		('ADMIN');

	-- passwords are set to "P@ssw0rd!"
	insert into app_user (username, password_hash, disabled)
		values
		('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
		('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);

	insert into app_user_role
		values
		(1, 1),
		(2, 1);
        
	insert into goal (`name`, checked, reason, realistic_deadline, ambitious_deadline, app_user_id) values
		('Vacation', 0, 'Have fun', '2023-07-16', '2023-06-01', 1),
        ('New job', 0, 'Make money', '2023-08-16', '2023-07-01', 2);
        
	insert into stepping_stone(`name`, checked, goal_id) values
		('Book a flight', 0, 1),
        ('Update resume', 0, 2);
	end //
    delimiter ;
    