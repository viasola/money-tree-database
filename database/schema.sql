create database moneytree;

create table expenses(
  id serial primary key,
  name varchar(25),
  type varchar(25),
  amount decimal,
  date date
);

create table incomes(
  id serial primary key,
  
  channel varchar(35),
  amount decimal,
  date date
);

create table budget(
  id serial primary key,
  
  budget_amount integer
   
);

select type, SUM(amount) as "total" from expenses group by type order by total desc;

select * from expenses where extract(month from date)=7;
