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

insert into expenses 
(name,type,amount,date)
values 
('mcdonald','food','345','07-07-2022');

insert into expenses 
(name,type,amount,date)
values 
('uniqlo','personal expenses','78','10-07-2022');

insert into expenses 
(name,type,amount,date)
values 
('shell','petrol','88','04-07-2022');

insert into expenses 
(name,type,amount,date)
values 
('citibank','bank debt','345','07-07-2022');

insert into incomes 
(channel,amount,date)
values 
('rental','1888','17-07-2022');

insert into incomes 
(channel,amount,date)
values 
('bonus','10000','01-07-2022');

insert into incomes 
(channel,amount,date)
values 
('dividend','388','12-07-2022');


select type, SUM(amount) as "total" from expenses group by type order by total desc;

select * from expenses where extract(month from date)=7;