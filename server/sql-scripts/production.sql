drop database if exists goals_list;
create database goals_list;
use goals_list;

create table goal (
	goal_id int primary key auto_increment,
    checked boolean not null default(false),
    reason varchar(255),
    realistic_deadline varchar(50),
    wishful_deadline varchar(50)
);

create table stepping_stone (
	stepping_stone_id int primary key auto_increment,
	checked boolean not null default(false),
    `name` varchar(100) not null,
    goal_id int not null,
    constraint fk_stone_goal_id
		foreign key (goal_id)
        references goal(goal_id)
);
