-- Creación de la base de datos y comprobaciones previas
drop database if exists proyectotfg;
create database proyectotfg;

use proyectotfg;

drop table if exists anime;
drop table if exists genero;
drop table if exists animes_generos;
drop table if exists usuario;

-- creación de tablas
create table anime (
	id varchar(36) not null primary key,
    estudio varchar(200) not null,
    descripcion text not null,
    fecha_inicio date not null,
    titulo_enlace text not null,
    titulo_texto text not null
);

create table genero (
	id varchar(36) not null primary key,
    nombre varchar(255) not null unique
);

create table animes_generos (
	anime_id varchar(36) not null,
    genero_id varchar(36) not null,
    foreign key (anime_id) references anime(id) on delete cascade,
    foreign key (genero_id) references genero(id) on delete cascade,
    primary key (anime_id, genero_id)
);

create table usuario (
	id varchar(36) not null primary key,
    nombre_pila varchar(100) not null,
    apellido varchar(100) not null,
    usuario varchar(100) not null unique,
    email varchar(100) not null unique,
    contrasena varchar(100) not null,
    telefono varchar(100) not null unique,
    genero varchar(100) not null,
    calle_nombre varchar(100) not null,
    calle_numero int not null,
    img_grande text not null,
    img_mediana text not null,
    img_miniatura text not null
);