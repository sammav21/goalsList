drop database if exists goals_list;
create database goals_list;
use goals_list;

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
