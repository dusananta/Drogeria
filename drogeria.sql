-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 06, 2021 at 03:50 PM
-- Server version: 8.0.22
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `drogeria`
--

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

DROP TABLE IF EXISTS `korisnici`;
CREATE TABLE IF NOT EXISTS `korisnici` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `prezime` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `broj_telefona` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lozinka` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id`, `ime`, `prezime`, `broj_telefona`, `email`, `lozinka`) VALUES
(1, 'Dusan', 'Antic', '123456789122', 'miroslav@maxi.com', 'dusan123'),
(2, 'Dusan', 'Antic', '0890807789', 'dusan@gmail.com', 'dusan111'),
(3, 'Nikola', 'Nikolic', '0944322324', 'nikola@gmail.com', 'nikola111'),
(5, 'Stefan', 'Stefanovic', '0651231415', 'stefan@gmail.com', 'stefan111'),
(7, 'Nikolina', 'Petrovic', '0667897675', 'nikolina@gmail.com', 'nikolina111'),
(9, 'Mihajlo', 'Stojanovic', '9182391283193', 'mihajlo@gmail.com', 'mihajlo111'),
(10, 'Admin', 'Admin', '123456789101', 'admin@gmail.com', 'admin111');

-- --------------------------------------------------------

--
-- Table structure for table `korpa`
--

DROP TABLE IF EXISTS `korpa`;
CREATE TABLE IF NOT EXISTS `korpa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `korisnik_id` int NOT NULL,
  `proizvod_id` int NOT NULL,
  `ukupna_cena` float NOT NULL,
  `naziv_proizvoda` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `korpa`
--

INSERT INTO `korpa` (`id`, `korisnik_id`, `proizvod_id`, `ukupna_cena`, `naziv_proizvoda`) VALUES
(10, 10, 14, 430, 'rubel'),
(11, 10, 14, 430, 'rubel'),
(12, 10, 11, 395, 'duel'),
(13, 2, 14, 430, 'rubel'),
(14, 2, 11, 395, 'duel'),
(15, 2, 15, 420, 'persil'),
(16, 2, 15, 420, 'persil');

-- --------------------------------------------------------

--
-- Table structure for table `proizvodi`
--

DROP TABLE IF EXISTS `proizvodi`;
CREATE TABLE IF NOT EXISTS `proizvodi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cena` float NOT NULL,
  `sifra` int NOT NULL,
  `img` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `proizvodi`
--

INSERT INTO `proizvodi` (`id`, `naziv`, `cena`, `sifra`, `img`) VALUES
(11, 'duel', 395, 112, 'duel_omeksivac.png'),
(13, 'ornel', 680, 113, 'ornel_omeksivac.png'),
(14, 'rubel', 430, 114, 'rubel.jpg'),
(15, 'persil', 420, 115, 'persil.jpg'),
(16, 'Perwoll omeksivac', 450, 116, 'perwoll_omeksivac.jpg'),
(17, 'Merix', 290, 117, 'merix.png');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
