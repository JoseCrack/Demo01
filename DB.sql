-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2021 a las 07:35:58
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prototipo01`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadousuario`
--

CREATE TABLE `estadousuario` (
  `Id` int(11) NOT NULL,
  `Codigo` int(11) NOT NULL,
  `Descripcion` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estadousuario`
--

INSERT INTO `estadousuario` (`Id`, `Codigo`, `Descripcion`) VALUES
(1, 0, 'Suspendido'),
(2, 1, 'Pendiente correo de confirmación'),
(3, 2, 'Validado'),
(4, 0, 'Suspendido'),
(5, 1, 'Pendiente correo de confirmación'),
(6, 2, 'Validado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(64) NOT NULL,
  `Apellidos` varchar(64) NOT NULL,
  `DNI` varchar(15) NOT NULL,
  `TelFijo` varchar(16) NOT NULL,
  `TelMovil` varchar(16) NOT NULL,
  `Email` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE `tipousuario` (
  `Id` int(11) NOT NULL,
  `Descripcion` varchar(64) NOT NULL,
  `NivelAcceso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`Id`, `Descripcion`, `NivelAcceso`) VALUES
(1, 'Invitado', 0),
(2, 'Cliente', 1),
(3, 'Transportista', 3),
(4, 'Administrador de Negocio', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Usuario` varchar(64) NOT NULL,
  `Contrasena` varchar(64) NOT NULL,
  `IdPersona` int(11) NOT NULL,
  `IdTipoUsuario` int(11) NOT NULL,
  `IdEstadoUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariotoken`
--

CREATE TABLE `usuariotoken` (
  `Id` int(11) NOT NULL,
  `Token` varchar(64) NOT NULL,
  `Etado` varchar(64) NOT NULL,
  `IdUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estadousuario`
--
ALTER TABLE `estadousuario`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdPersona` (`IdPersona`),
  ADD KEY `IdTipoUsuario` (`IdTipoUsuario`),
  ADD KEY `IdEstadoUsuario` (`IdEstadoUsuario`);

--
-- Indices de la tabla `usuariotoken`
--
ALTER TABLE `usuariotoken`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdUsuario` (`IdUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estadousuario`
--
ALTER TABLE `estadousuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`IdPersona`) REFERENCES `personas` (`Id`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`IdTipoUsuario`) REFERENCES `tipousuario` (`Id`),
  ADD CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`IdEstadoUsuario`) REFERENCES `estadousuario` (`Id`);

--
-- Filtros para la tabla `usuariotoken`
--
ALTER TABLE `usuariotoken`
  ADD CONSTRAINT `usuariotoken_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`Id`);
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `registerNewUser`(
IN _usuario varchar(64),
In _password varchar(64),
IN _nombre varchar(64),
IN _apellidos varchar(64),
IN _dni int(15),
IN _telfi int(16),
IN _telmov int(16),
IN _email varchar(64)
)
BEGIN
     DECLARE _lastId  INT ;
     INSERT INTO personas (Nombre,Apellidos,DNI,TelFijo,TelMovil,Email) VALUE (_nombre,_apellidos,_dni,_telfi,_telmov,_email);
	 SET _lastId = last_insert_id();
     INSERT INTO usuarios (usuario,contrasena,IdPersona,IdTipoUsuario,IdEstadoUsuario) VALUE (_usuario,_password,_lastId,1,2);
     Select "Saved" as result;
END$$
DELIMITER ;
 
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
