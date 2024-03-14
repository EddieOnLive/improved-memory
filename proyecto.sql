-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-03-2024 a las 07:17:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capturas`
--

CREATE TABLE `capturas` (
  `equipoFK` int(11) NOT NULL,
  `capturasFK` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `capturas`
--

INSERT INTO `capturas` (`equipoFK`, `capturasFK`, `cantidad`) VALUES
(3, 6, 1),
(3, 6, 1),
(4, 6, 1),
(4, 7, 2),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(6, 6, 2),
(6, 7, 3),
(12, 6, 1),
(12, 11, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `descripcion`) VALUES
(3, 'Semi-Senior'),
(4, 'Senior'),
(5, 'MenorALGO'),
(9, 'Octagenario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clubs`
--

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `ubicacion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clubs`
--

INSERT INTO `clubs` (`id`, `descripcion`, `ubicacion`) VALUES
(14, 'Pan', '-6.408257082272311,-35.29907226562501'),
(15, 'Club Triunfo', '-26.78772008376737,-55.03146171569825'),
(16, 'Club de Pesca El Dorado', '-26.411252129837276,-54.69459772109985'),
(17, 'Club Aristobulo del Valle', '-26.96156151945767,-55.16527175903321'),
(18, 'Club de Pesca Corpus', '-27.130214376581833,-55.56047916412354'),
(19, 'Mixto', '-27.09598550306109,-55.531178712844856'),
(20, 'club de busqueda de una vida digna', '-30.987442843430017,30.235901176929474'),
(21, 'Club de Pesca Puerto Rico', '-26.936327366732392,-55.12136936187744');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `id` int(11) NOT NULL,
  `nombre_embarcacion` varchar(100) NOT NULL,
  `matricula_embarcacion` varchar(30) NOT NULL,
  `clubsFK` int(11) NOT NULL,
  `torneoFK` int(11) NOT NULL,
  `observacion` varchar(255) NOT NULL,
  `estado` int(11) NOT NULL,
  `puntajeTotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`id`, `nombre_embarcacion`, `matricula_embarcacion`, `clubsFK`, `torneoFK`, `observacion`, `estado`, `puntajeTotal`) VALUES
(3, 'Titanito1', 'Titanito1Matricula', 14, 1, '', 1, 0),
(4, 'Titanito2', 'Titanito2Matricula', 14, 1, 'Si', 1, 0),
(5, 'Titanito3', 'Titanito3Matricula', 14, 1, 'Si', 1, 0),
(6, 'Titaño', 'TitañoMatricula', 15, 1, 'asdasd', 1, 2142),
(7, 'Titanito4', 'Titanito4Matricula22222', 14, 4, '123123', 1, 0),
(8, 'Titanito5', 'Titanito5Matricula', 16, 4, 'asdasd', 1, 0),
(9, 'Titanic II', 'TitanicIIMatricula', 19, 4, '', 1, 0),
(10, 'Quesito', 'Queso', 19, 4, '9pfgbcuñI<WEGBFÑUGH<bfñWEFhef9hfioe7gOAIR7IUASFGIOSGFAISGFAI7GFI8E7WRGFLIGailfghvleirghlsaeioghlse', 1, 0),
(11, 'revoque', '5376647-4', 17, 4, 'no entran furros', 1, 0),
(12, 'Opus', 'Queso', 19, 4, '', 1, 3075);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo_has_pescador`
--

CREATE TABLE `equipo_has_pescador` (
  `equipoFK` int(11) NOT NULL,
  `pescadorFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo_has_pescador`
--

INSERT INTO `equipo_has_pescador` (`equipoFK`, `pescadorFK`) VALUES
(7, 9),
(7, 10),
(3, 11),
(3, 12),
(11, 20),
(11, 21),
(6, 22),
(6, 23),
(12, 24),
(12, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fiscal`
--

CREATE TABLE `fiscal` (
  `id` int(11) NOT NULL,
  `horario_FK` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `documento` varchar(32) NOT NULL,
  `contacto` varchar(32) NOT NULL,
  `Torneo_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fiscal`
--

INSERT INTO `fiscal` (`id`, `horario_FK`, `nombre`, `apellido`, `documento`, `contacto`, `Torneo_FK`) VALUES
(7, 18, 'admin', 'admin', '4697027', '1123123123123', 1),
(8, 18, 'asdasd', 'asdasd', '4697027', 'asdasd', 1),
(9, 18, 'asdasd', 'asdasd', '4697027', 'asdasdasdasd', 1),
(11, 18, 'asdasd', 'asdasd', '4697027', 'asdasdasd', 1),
(13, 18, 'asdasd', 'asdasd', '4697027', 'asdasd', 1),
(14, 29, 'ciruelita', 'ciruelax', '987654321', '74674675', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id` int(11) NOT NULL,
  `horaEntrada` datetime NOT NULL,
  `horaSalida` datetime NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`id`, `horaEntrada`, `horaSalida`, `activo`) VALUES
(18, '2024-02-15 19:12:00', '2024-02-15 19:12:00', 1),
(21, '2024-02-15 20:26:00', '2024-02-15 20:26:00', 1),
(29, '1783-07-03 10:30:00', '2024-02-25 19:05:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalidades`
--

CREATE TABLE `modalidades` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modalidades`
--

INSERT INTO `modalidades` (`id`, `descripcion`) VALUES
(3, 'Embarcación'),
(4, 'Costas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pescador`
--

CREATE TABLE `pescador` (
  `id` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL,
  `apellido` varchar(32) NOT NULL,
  `documento` int(11) NOT NULL,
  `tipo_documentoFK` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `contacto` varchar(32) NOT NULL,
  `genero` varchar(10) NOT NULL,
  `categoriaFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pescador`
--

INSERT INTO `pescador` (`id`, `nombre`, `apellido`, `documento`, `tipo_documentoFK`, `edad`, `contacto`, `genero`, `categoriaFK`) VALUES
(9, 'Pedro', 'Perez', 123123, 1, 21, '123123123123', 'Masculino', 4),
(10, 'Pedrito', 'Perez', 2147483647, 1, 12, '123123123123', 'Masculino', 3),
(11, 'Juan', 'Perez', 123, 1, 60, '123123123123', 'Masculino', 4),
(12, 'Cosme', 'Fulanito', 321, 1, 24, '123123123123', 'Masculino', 3),
(20, 'rosita', 'fresita', -50986316, 3, 90, '098577xxxx ', 'Femenino', 4),
(21, 'limoncita', 'puta', 786468706, 1, 18, '0985 chikibeibi', 'Masculino', 3),
(22, 'popo', 'qweqwe', 2, 1, 2, '123123123123', 'Masculino', 3),
(23, 'Juanito', 'Perez', 1, 2, 3, '123123', 'Femenino', 3),
(24, 'Eduardo', 'Welchen', 3, 1, 23, '+54-000000', 'Masculino', 3),
(25, 'Marcos', 'L', 1, 1, 12, '123123123123', 'Masculino', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piezas`
--

CREATE TABLE `piezas` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `tipo_piezaFK` int(11) NOT NULL,
  `puntaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `piezas`
--

INSERT INTO `piezas` (`id`, `descripcion`, `tipo_piezaFK`, `puntaje`) VALUES
(6, 'Dorado', 12, 75),
(7, 'rape', 11, 1),
(9, 'Bagre', 9, 30),
(10, 'Boga', 11, 75),
(11, 'Monstruo de Rio', 11, 1500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reglas`
--

CREATE TABLE `reglas` (
  `id` int(11) NOT NULL,
  `articulo` varchar(30) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reglas`
--

INSERT INTO `reglas` (`id`, `articulo`, `descripcion`) VALUES
(31, 'Art. 1', 'El torneo se realizará bajo la modalidad de pesca embarcada Variada por especie, la planilla única con devolución, la pesca será con la embarcación anclada y/o a camalote no está permitido el trolling y todas las piezas deberán ser devueltas vivas'),
(32, 'Art. 2', 'Se Iniciará el día # desde las # horas hasta las # horas, el día # desde las # horas hasta las # horas y finalizará en la Fiscalía, es de participación libre con máximo de # personas por equipo'),
(33, 'Art. 3', 'Está permitido el uso de hasta 4 cañas y reel por equipo, un máximo de 2 anzuelos de una sola punta por caña. Se permiten Carnada Artificial con anzuelo de una sola punta, un señuelo sin modificación por caña. '),
(34, 'Art. 4', 'Está permitido el uso de hasta 4 cañas y reel por equipo, un máximo de 2 anzuelos de una sola punta por caña. Se permiten Carnada Artificial con anzuelo de una sola punta, un señuelo sin modificación por caña. Los equipos que sean sorprendidos pescando co'),
(35, 'Art. 5', 'Una vez finalizada la competencia en el lugar de pesca los fiscales recibirán las planillas de los competidores, firmando la conformidad de lo expresado en la misma.'),
(36, 'Art. 6', 'Las distintas especies no deberán ser mutilada, las especies con púa serán presentadas con las mismas (Sin despojar) excepto la RAYA si es izada al bote'),
(37, 'Art. 7', 'En caso de empate de la Pesca Variada se definirá:\n1. Por mayor cantidad de piezas\n2. Mayor cantidad de especies completas\n3. Mayor cantidad de especies\n4. Por mayor cantidad de especies de Ley\n5. Por la pieza más larga entre las medibles\n6. Por SORTEO'),
(38, 'Art. 8', 'Serán motivo de descalificación:\n1. Tener peces vivos del N°1 al N°48 antes de la largada\n2. Pescar con más de 4 cañas por equipo\n3. Ceder o recibir piezas de otros equipos o terceros\n4. Estar amarrado a otra embarcación sin autorización del fiscal\n5. Los'),
(39, 'Art. 9', 'El pescador deberá entregar al final de cada etapa la bolsa ecológica por el cual recibirá un ticket para sorteo'),
(40, 'Art. 5668', 'La categorización de los participantes estará a cargo del Fiscal General, siendo inapelable la decisión segun mis santos huevo'),
(46, 'Art. 80000', 'Algo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`id`, `descripcion`) VALUES
(1, 'Cédula'),
(2, 'DNI'),
(3, 'Pasaporte');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_pieza`
--

CREATE TABLE `tipo_pieza` (
  `id` int(11) NOT NULL,
  `medida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_pieza`
--

INSERT INTO `tipo_pieza` (`id`, `medida`) VALUES
(9, 20),
(10, 50),
(11, 100),
(12, 40),
(13, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneo`
--

CREATE TABLE `torneo` (
  `id` int(11) NOT NULL,
  `modalidadesFK` int(11) NOT NULL,
  `horaInicio` datetime NOT NULL,
  `horaFin` datetime NOT NULL,
  `torneoDescripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `torneo`
--

INSERT INTO `torneo` (`id`, `modalidadesFK`, `horaInicio`, `horaFin`, `torneoDescripcion`) VALUES
(1, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Sin Torneo'),
(4, 3, '2024-03-07 04:45:00', '2024-03-07 04:45:00', 'Quincuagésimoavo concurso de Pesca con devolución');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `tipo_usuario` varchar(24) NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `password`, `tipo_usuario`, `activo`) VALUES
(1, 'admin', 'admin', '1', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capturas`
--
ALTER TABLE `capturas`
  ADD KEY `Equipo` (`equipoFK`),
  ADD KEY `capturasFK` (`capturasFK`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clubsFK` (`clubsFK`),
  ADD KEY `torneoFK` (`torneoFK`);

--
-- Indices de la tabla `equipo_has_pescador`
--
ALTER TABLE `equipo_has_pescador`
  ADD KEY `equipoFK` (`equipoFK`),
  ADD KEY `pescadorFK` (`pescadorFK`);

--
-- Indices de la tabla `fiscal`
--
ALTER TABLE `fiscal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Torneo_FK` (`Torneo_FK`),
  ADD KEY `fiscal_ibfk_2` (`horario_FK`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `modalidades`
--
ALTER TABLE `modalidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pescador`
--
ALTER TABLE `pescador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tipo Documento` (`tipo_documentoFK`),
  ADD KEY `Categoria` (`categoriaFK`);

--
-- Indices de la tabla `piezas`
--
ALTER TABLE `piezas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tipo Pieza` (`tipo_piezaFK`);

--
-- Indices de la tabla `reglas`
--
ALTER TABLE `reglas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_pieza`
--
ALTER TABLE `tipo_pieza`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `torneo`
--
ALTER TABLE `torneo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modalidadesFK` (`modalidadesFK`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `clubs`
--
ALTER TABLE `clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `fiscal`
--
ALTER TABLE `fiscal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `modalidades`
--
ALTER TABLE `modalidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pescador`
--
ALTER TABLE `pescador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `piezas`
--
ALTER TABLE `piezas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `reglas`
--
ALTER TABLE `reglas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_pieza`
--
ALTER TABLE `tipo_pieza`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `torneo`
--
ALTER TABLE `torneo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `capturas`
--
ALTER TABLE `capturas`
  ADD CONSTRAINT `Equipo` FOREIGN KEY (`equipoFK`) REFERENCES `equipo` (`id`),
  ADD CONSTRAINT `capturas_ibfk_1` FOREIGN KEY (`capturasFK`) REFERENCES `piezas` (`id`);

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`clubsFK`) REFERENCES `clubs` (`id`),
  ADD CONSTRAINT `equipo_ibfk_2` FOREIGN KEY (`torneoFK`) REFERENCES `torneo` (`id`);

--
-- Filtros para la tabla `equipo_has_pescador`
--
ALTER TABLE `equipo_has_pescador`
  ADD CONSTRAINT `equipo_has_pescador_ibfk_1` FOREIGN KEY (`equipoFK`) REFERENCES `equipo` (`id`),
  ADD CONSTRAINT `equipo_has_pescador_ibfk_2` FOREIGN KEY (`pescadorFK`) REFERENCES `pescador` (`id`);

--
-- Filtros para la tabla `fiscal`
--
ALTER TABLE `fiscal`
  ADD CONSTRAINT `fiscal_ibfk_1` FOREIGN KEY (`Torneo_FK`) REFERENCES `torneo` (`id`),
  ADD CONSTRAINT `fiscal_ibfk_2` FOREIGN KEY (`horario_FK`) REFERENCES `horario` (`id`);

--
-- Filtros para la tabla `pescador`
--
ALTER TABLE `pescador`
  ADD CONSTRAINT `Categoria` FOREIGN KEY (`categoriaFK`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `Tipo Documento` FOREIGN KEY (`tipo_documentoFK`) REFERENCES `tipo_documento` (`id`);

--
-- Filtros para la tabla `piezas`
--
ALTER TABLE `piezas`
  ADD CONSTRAINT `Tipo Pieza` FOREIGN KEY (`tipo_piezaFK`) REFERENCES `tipo_pieza` (`id`);

--
-- Filtros para la tabla `torneo`
--
ALTER TABLE `torneo`
  ADD CONSTRAINT `torneo_ibfk_1` FOREIGN KEY (`modalidadesFK`) REFERENCES `modalidades` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
