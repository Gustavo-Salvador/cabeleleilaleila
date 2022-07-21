create database if not exists cabeleleilaleila
default character set utf8
default collate utf8_general_ci;

use cabeleleilaleila;

create table if not exists cliente (
	id int not null auto_increment,
	email varchar(40) not null unique CHECK (email <> ''),
	nome varchar(40) not null CHECK (nome <> ''),
	sexo enum('M', 'F', 'O') not null,
	telefone varchar(17) not null CHECK (telefone <> ''),
	senha varchar(35) not null CHECK (senha <> ''),
	acesso enum('C', 'A') not null default 'C',
	nascimento date not null CHECK (nascimento <> ''),
	acsKey int not null unique CHECK (acsKey <> ''),
	primary key (id)
)default charset utf8;

create table if not exists agenda (
	id int not null auto_increment,
	cliente int not null CHECK (cliente <> ''),
	servico varchar(20) not null CHECK (servico <> ''),
	horario time not null,
	`data` date not null CHECK (`data` <> ''),
	duracao tinyint not null CHECK (duracao <> ''),
	concluido tinyint(1) not null default 0,
	faltou tinyint(1) not null default 0,
	confirmado tinyint(1) not null default 0,
	foreign key (cliente) references cliente(id),
	primary key (id)
)default charset utf8;

insert into cliente 
(email, nome, sexo, telefone, senha, acesso, nascimento, acsKey) values
('leila@cabeleleila,com', 'Joseane Rosa Dourado', 'F', '+55(70)97070-7070', 'pretoEscuroLoiridaoAmorronado', 'A', '1988-05-14', '2388313942');