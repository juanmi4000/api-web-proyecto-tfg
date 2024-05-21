-- Creación de la base de datos y comprobaciones previas
drop database if exists proyectotfg;
create database proyectotfg;

use proyectotfg;

drop table if exists anime;
drop table if exists genero;
drop table if exists animes_generos;
drop table if exists usuarios;

-- creación de tablas
create table anime (
	id binary(16) primary key default (UUID_TO_BIN(UUID())),
    estudio varchar(200) not null,
    descripcion text not null,
    fecha_inicio date not null,
    titulo_enlace text not null,
    titulo_texto text not null
);

create table genero (
	id binary(16) primary key default (UUID_TO_BIN(UUID())),
    nombre varchar(255) not null unique
);

create table animes_generos (
	anime_id binary(16) references animes(id),
    genero_id binary(16) references generos(id),
    primary key (anime_id, genero_id)
);