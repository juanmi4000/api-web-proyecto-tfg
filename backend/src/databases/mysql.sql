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

-- solución Cristina
SELECT * FROM anime, animes_generos, (SELECT id, nombre FROM genero WHERE nombre = 'Drama') AS g 
WHERE anime.id = animes_generos.anime_id AND animes_generos.genero_id = g.id;

-- optimizado JuanMa
SELECT a.id, estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto, g.id as id_generos, g.nombre FROM anime as a, animes_generos as ag, (SELECT id, nombre FROM genero WHERE nombre = 'Drama') AS g 
WHERE a.id = ag.anime_id AND ag.genero_id = g.id;

-- consulta para saber los diferentes animes que tienen un género
SELECT a.id, a.descripcion, a.estudio, a.estudio, a.fecha_inicio, a.titulo_texto FROM anime AS a INNER JOIN animes_generos as ag ON a.id = ag.anime_id INNER JOIN genero as g ON ag.genero_id = g.id WHERE LOWER(g.nombre) = LOWER(?);

-- consulta para saber los diferentes generos que tienen un anime
SELECT nombre FROM anime as a INNER JOIN animes_generos as ag on anime_id = a.id INNER JOIN genero as g ON genero_id = g.id WHERE a.id = '01a80f3a-138d-4774-a30f-6b5229858587'



