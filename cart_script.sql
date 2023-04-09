create type status as enum ('OPEN', 'ORDERED');

create extension if not exists "uuid-ossp";

create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status status 
);

create table cart_items (
	cart_id uuid references carts(id),
	product_id uuid,
	"count" integer
);

insert into carts (user_id, created_at, updated_at, status) values ('4582a120-f672-41fb-bee4-68daa9f4056e', '2023-01-01', '2023-01-01', 'OPEN');
insert into carts (user_id, created_at, updated_at, status) values ('4582a120-f672-41fb-bee4-68daa9f40561', '2023-01-02', '2023-01-02', 'OPEN');
insert into carts (user_id, created_at, updated_at, status) values ('4582a120-f672-41fb-bee4-68daa9f4056e', '2023-01-01', '2023-01-01', 'ORDERED');

insert into cart_items (cart_id, product_id, "count") values ('296a8c4c-c267-4f81-bd26-c2bb649e15d6', 'd854971e-0824-4ce6-9ddb-063c3db70242', 1);
insert into cart_items (cart_id, product_id, "count") values ('0efcbf3f-c5d6-400b-a702-d353ee6c663a', 'd854971e-0824-4ce6-9ddb-063c3db70242', 2);
insert into cart_items (cart_id, product_id, "count") values ('670d28f8-760e-4150-9eaa-3cf4cfc22dfd', 'd854971e-0824-4ce6-9ddb-063c3db70242', 3);