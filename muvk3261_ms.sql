-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 11, 2025 at 06:23 AM
-- Server version: 10.6.22-MariaDB-cll-lve
-- PHP Version: 8.3.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `muvk3261_ms`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('admin@muvausa.com|127.0.0.1', 'i:1;', 1728013271),
('admin@muvausa.com|127.0.0.1:timer', 'i:1728013271;', 1728013271),
('admin|2400:9800:a51:d77a:da16:1ea0:a838:68e', 'i:1;', 1752155299),
('admin|2400:9800:a51:d77a:da16:1ea0:a838:68e:timer', 'i:1752155299;', 1752155299),
('ajeng.kurniawan@jephy-webmail.com|154.90.48.114', 'i:2;', 1733270683),
('ajeng.kurniawan@jephy-webmail.com|154.90.48.114:timer', 'i:1733270683;', 1733270683),
('akumantabbetul30@gmail.com|2400:9800:aa2:650e:e99f:f915:6b92:805c', 'i:1;', 1751086251),
('akumantabbetul30@gmail.com|2400:9800:aa2:650e:e99f:f915:6b92:805c:timer', 'i:1751086251;', 1751086251),
('brandonfarmer75@outlook.com|149.34.248.69', 'i:1;', 1738936378),
('brandonfarmer75@outlook.com|149.34.248.69:timer', 'i:1738936378;', 1738936378),
('brandonfarmer75@outlook.com|154.90.48.114', 'i:1;', 1733269884),
('brandonfarmer75@outlook.com|154.90.48.114:timer', 'i:1733269884;', 1733269884),
('brandonfarmer75@outlook.com|172.111.197.5', 'i:1;', 1738936199),
('brandonfarmer75@outlook.com|172.111.197.5:timer', 'i:1738936199;', 1738936199),
('brandonfarmer75@outlook.com|2a05:91c0:1506:14e::', 'i:1;', 1733270364),
('brandonfarmer75@outlook.com|2a05:91c0:1506:14e:::timer', 'i:1733270364;', 1733270364),
('brandonfarmer75@outlook.com|2a05:f480:3000:259e:5400:4ff:feec:ba90', 'i:1;', 1733270452),
('brandonfarmer75@outlook.com|2a05:f480:3000:259e:5400:4ff:feec:ba90:timer', 'i:1733270452;', 1733270452),
('brandonfarmer75@outlook.com|37.120.233.54', 'i:1;', 1738936107),
('brandonfarmer75@outlook.com|37.120.233.54:timer', 'i:1738936107;', 1738936107),
('cecile.zschunke@banlamail.com|146.70.107.15', 'i:2;', 1738570545),
('cecile.zschunke@banlamail.com|146.70.107.15:timer', 'i:1738570545;', 1738570545),
('danupton1@aol.com|2001:41d0:404:200::2aa', 'i:1;', 1733210375),
('danupton1@aol.com|2001:41d0:404:200::2aa:timer', 'i:1733210375;', 1733210375),
('domingo88@yatdew.com|84.17.59.80', 'i:2;', 1733219049),
('domingo88@yatdew.com|84.17.59.80:timer', 'i:1733219049;', 1733219049),
('donald93@slclogin.com|2a05:f480:3000:259e:5400:4ff:feec:ba90', 'i:2;', 1733270434),
('donald93@slclogin.com|2a05:f480:3000:259e:5400:4ff:feec:ba90:timer', 'i:1733270434;', 1733270434),
('eileen.lowe71@banlamail.com|198.12.64.38', 'i:2;', 1738570634),
('eileen.lowe71@banlamail.com|198.12.64.38:timer', 'i:1738570634;', 1738570634),
('gordonb95@yahoo.com|154.90.48.114', 'i:1;', 1733269865),
('gordonb95@yahoo.com|154.90.48.114:timer', 'i:1733269865;', 1733269865),
('gordonb95@yahoo.com|2a05:91c0:1506:14e::', 'i:1;', 1733270361),
('gordonb95@yahoo.com|2a05:91c0:1506:14e:::timer', 'i:1733270361;', 1733270361),
('gordonb95@yahoo.com|2a05:f480:3000:259e:5400:4ff:feec:ba90', 'i:1;', 1733270448),
('gordonb95@yahoo.com|2a05:f480:3000:259e:5400:4ff:feec:ba90:timer', 'i:1733270448;', 1733270448),
('hugolehmann92@outlook.com|154.90.48.114', 'i:1;', 1733218900),
('hugolehmann92@outlook.com|154.90.48.114:timer', 'i:1733218900;', 1733218900),
('hugolehmann92@outlook.com|2a0c:e300::23', 'i:1;', 1733218977),
('hugolehmann92@outlook.com|2a0c:e300::23:timer', 'i:1733218977;', 1733218977),
('hugolehmann92@outlook.com|84.17.59.80', 'i:1;', 1733219074),
('hugolehmann92@outlook.com|84.17.59.80:timer', 'i:1733219074;', 1733219074),
('isobel72@hotmail.com|146.70.107.15', 'i:1;', 1738570570),
('isobel72@hotmail.com|146.70.107.15:timer', 'i:1738570570;', 1738570570),
('isobel72@hotmail.com|154.90.48.114', 'i:1;', 1733270695),
('isobel72@hotmail.com|154.90.48.114:timer', 'i:1733270695;', 1733270695),
('isobel72@hotmail.com|198.12.64.38', 'i:1;', 1738570645),
('isobel72@hotmail.com|198.12.64.38:timer', 'i:1738570645;', 1738570645),
('isobel72@hotmail.com|2001:41d0:404:200::2aa', 'i:1;', 1733270794),
('isobel72@hotmail.com|2001:41d0:404:200::2aa:timer', 'i:1733270794;', 1733270794),
('jasmin_sitorus@slclogin.com|154.90.48.114', 'i:2;', 1733269851),
('jasmin_sitorus@slclogin.com|154.90.48.114:timer', 'i:1733269851;', 1733269851),
('jules.colin@yatdew.com|2001:bc8:1640:317d:dc00:ff:fe39:7bb3', 'i:1;', 1733218965),
('jules.colin@yatdew.com|2001:bc8:1640:317d:dc00:ff:fe39:7bb3:timer', 'i:1733218965;', 1733218965),
('jules.colin@yatdew.com|2a0c:e300::23', 'i:1;', 1733218985),
('jules.colin@yatdew.com|2a0c:e300::23:timer', 'i:1733218985;', 1733218985),
('lola_denis85@jephy-webmail.com|2001:41d0:404:200::2aa', 'i:2;', 1733270782),
('lola_denis85@jephy-webmail.com|2001:41d0:404:200::2aa:timer', 'i:1733270782;', 1733270782),
('madalyn.stokes57@orimi.co|37.120.233.54', 'i:2;', 1738936077),
('madalyn.stokes57@orimi.co|37.120.233.54:timer', 'i:1738936077;', 1738936077),
('muvausastore1@gmail.com|140.213.169.21', 'i:1;', 1746250615),
('muvausastore1@gmail.com|140.213.169.21:timer', 'i:1746250615;', 1746250615),
('nakia.runolfsdottir@slclogin.com|2a05:91c0:1506:14e::', 'i:2;', 1733270349),
('nakia.runolfsdottir@slclogin.com|2a05:91c0:1506:14e:::timer', 'i:1733270349;', 1733270349),
('otp_087742097918', 'i:463181;', 1752119361),
('parkercatherine622@gmail.com|146.70.107.15', 'i:1;', 1738570556),
('parkercatherine622@gmail.com|146.70.107.15:timer', 'i:1738570556;', 1738570556),
('parkercatherine622@gmail.com|154.90.48.114', 'i:1;', 1733270716),
('parkercatherine622@gmail.com|154.90.48.114:timer', 'i:1733270716;', 1733270716),
('parkercatherine622@gmail.com|198.12.64.38', 'i:1;', 1738570650),
('parkercatherine622@gmail.com|198.12.64.38:timer', 'i:1738570650;', 1738570650),
('parkercatherine622@gmail.com|2001:41d0:404:200::2aa', 'i:1;', 1733270796),
('parkercatherine622@gmail.com|2001:41d0:404:200::2aa:timer', 'i:1733270796;', 1733270796),
('predovicalexandria138@gmail.com|154.90.48.114', 'i:1;', 1733218887),
('predovicalexandria138@gmail.com|154.90.48.114:timer', 'i:1733218887;', 1733218887),
('predovicalexandria138@gmail.com|2a0c:e300::23', 'i:1;', 1733218980),
('predovicalexandria138@gmail.com|2a0c:e300::23:timer', 'i:1733218980;', 1733218980),
('predovicalexandria138@gmail.com|84.17.59.80', 'i:1;', 1733219060),
('predovicalexandria138@gmail.com|84.17.59.80:timer', 'i:1733219060;', 1733219060),
('pusat@pusaka.com|2400:9800:a02:ad98:896b:7d13:bb90:1f31', 'i:1;', 1749693036),
('pusat@pusaka.com|2400:9800:a02:ad98:896b:7d13:bb90:1f31:timer', 'i:1749693036;', 1749693036),
('quentin12@banlamail.com|2001:41d0:404:200::2aa', 'i:2;', 1733210363),
('quentin12@banlamail.com|2001:41d0:404:200::2aa:timer', 'i:1733210363;', 1733210363),
('rickey_barton@orimi.co|149.34.248.69', 'i:2;', 1738936337),
('rickey_barton@orimi.co|149.34.248.69:timer', 'i:1738936337;', 1738936337),
('spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:16:{i:0;a:3:{s:1:\"a\";s:1:\"1\";s:1:\"b\";s:16:\"dashboard-access\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";s:1:\"2\";s:1:\"b\";s:12:\"users-access\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";s:1:\"3\";s:1:\"b\";s:10:\"users-data\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";s:1:\"4\";s:1:\"b\";s:12:\"users-create\";s:1:\"c\";s:3:\"web\";}i:4;a:3:{s:1:\"a\";s:1:\"5\";s:1:\"b\";s:12:\"users-update\";s:1:\"c\";s:3:\"web\";}i:5;a:3:{s:1:\"a\";s:1:\"6\";s:1:\"b\";s:12:\"users-delete\";s:1:\"c\";s:3:\"web\";}i:6;a:4:{s:1:\"a\";s:1:\"7\";s:1:\"b\";s:12:\"roles-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:7;a:3:{s:1:\"a\";s:1:\"8\";s:1:\"b\";s:10:\"roles-data\";s:1:\"c\";s:3:\"web\";}i:8;a:3:{s:1:\"a\";s:1:\"9\";s:1:\"b\";s:12:\"roles-create\";s:1:\"c\";s:3:\"web\";}i:9;a:3:{s:1:\"a\";s:2:\"10\";s:1:\"b\";s:12:\"roles-update\";s:1:\"c\";s:3:\"web\";}i:10;a:3:{s:1:\"a\";s:2:\"11\";s:1:\"b\";s:12:\"roles-delete\";s:1:\"c\";s:3:\"web\";}i:11;a:3:{s:1:\"a\";s:2:\"12\";s:1:\"b\";s:18:\"permissions-access\";s:1:\"c\";s:3:\"web\";}i:12;a:3:{s:1:\"a\";s:2:\"13\";s:1:\"b\";s:16:\"permissions-data\";s:1:\"c\";s:3:\"web\";}i:13;a:3:{s:1:\"a\";s:2:\"14\";s:1:\"b\";s:18:\"permissions-create\";s:1:\"c\";s:3:\"web\";}i:14;a:3:{s:1:\"a\";s:2:\"15\";s:1:\"b\";s:18:\"permissions-update\";s:1:\"c\";s:3:\"web\";}i:15;a:3:{s:1:\"a\";s:2:\"16\";s:1:\"b\";s:18:\"permissions-delete\";s:1:\"c\";s:3:\"web\";}}s:5:\"roles\";a:1:{i:0;a:3:{s:1:\"a\";s:1:\"5\";s:1:\"b\";s:4:\"user\";s:1:\"c\";s:3:\"web\";}}}', 1752200032),
('sstokes81@yahoo.com|172.111.197.5', 'i:1;', 1738936201),
('sstokes81@yahoo.com|172.111.197.5:timer', 'i:1738936201;', 1738936201),
('sstokes81@yahoo.com|37.120.233.54', 'i:1;', 1738936097),
('sstokes81@yahoo.com|37.120.233.54:timer', 'i:1738936097;', 1738936097),
('test12345@gmail.com|127.0.0.1', 'i:1;', 1728013581),
('test12345@gmail.com|127.0.0.1:timer', 'i:1728013581;', 1728013581),
('timbul_pradipta@yatdew.com|154.90.48.114', 'i:2;', 1733218876),
('timbul_pradipta@yatdew.com|154.90.48.114:timer', 'i:1733218876;', 1733218876),
('user@gmai.com|114.10.10.221', 'i:1;', 1752069847),
('user@gmai.com|114.10.10.221:timer', 'i:1752069847;', 1752069847),
('user2@gmail.com|2400:9800:a01:c2a8:606e:9790:4c96:647', 'i:1;', 1750854517),
('user2@gmail.com|2400:9800:a01:c2a8:606e:9790:4c96:647:timer', 'i:1750854517;', 1750854517);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laporan_admin`
--

CREATE TABLE `laporan_admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `periode` date NOT NULL,
  `total_aktivitas_setoran` int(11) NOT NULL,
  `total_poin_didapat_user` int(11) DEFAULT NULL,
  `total_aktivitas_penukaran` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `laporan_admin`
--

INSERT INTO `laporan_admin` (`id`, `periode`, `total_aktivitas_setoran`, `total_poin_didapat_user`, `total_aktivitas_penukaran`, `created_at`, `updated_at`) VALUES
(1, '2024-01-01', 120, 25000, 30, '2025-06-02 04:10:43', '2025-06-03 04:10:43'),
(2, '2024-02-01', 140, 31000, 45, '2025-06-03 04:10:43', '2025-06-03 04:10:43'),
(3, '2024-03-01', 110, 22000, 28, '2025-06-03 04:10:43', '2025-06-03 04:10:43'),
(4, '2024-04-01', 160, 34000, 50, '2025-06-03 04:10:43', '2025-06-03 04:10:43'),
(5, '2024-05-01', 175, 39000, 60, '2025-06-03 04:10:43', '2025-06-03 04:10:43');

-- --------------------------------------------------------

--
-- Table structure for table `laporan_pengguna`
--

CREATE TABLE `laporan_pengguna` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nama_sampah` varchar(100) NOT NULL,
  `total_setoran` decimal(20,3) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `laporan_pengguna`
--

INSERT INTO `laporan_pengguna` (`id`, `user_id`, `nama_sampah`, `total_setoran`, `created_at`, `updated_at`) VALUES
(7, 116, 'Plastik Botol', 12.500, '2025-06-02 03:35:19', '2025-06-03 03:35:19'),
(8, 117, 'Plastik Botol', 7.200, '2025-06-03 03:35:19', '2025-06-03 03:35:19'),
(9, 116, 'Kaleng Aluminium', 5.750, '2025-06-03 03:35:19', '2025-06-03 03:35:19'),
(10, 117, 'Elektronik Rusak', 20.000, '2025-06-03 03:35:19', '2025-06-03 03:35:19'),
(11, 116, 'Kaca Pecah', 3.300, '2025-06-03 03:35:19', '2025-06-03 03:35:19'),
(12, 116, 'Minyak Jelantah', 15.000, '2025-06-03 03:35:19', '2025-06-03 03:35:19');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_04_02_024706_create_permission_tables', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(4, 'App\\Models\\User', 116),
(4, 'App\\Models\\User', 117),
(5, 'App\\Models\\User', 118),
(5, 'App\\Models\\User', 120),
(5, 'App\\Models\\User', 123),
(5, 'App\\Models\\User', 124),
(5, 'App\\Models\\User', 125),
(5, 'App\\Models\\User', 126);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('muvausastore1@gmail.com', '$2y$12$K50floPwku1w0ENvNXe85OysT8GotelSLG.ZohZyi7r2xKUPmbGCW', '2024-10-03 21:39:42');

-- --------------------------------------------------------

--
-- Table structure for table `penukaran`
--

CREATE TABLE `penukaran` (
  `id` char(36) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `voucher_id` bigint(20) UNSIGNED NOT NULL,
  `poin_dipakai` int(11) NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('belum diredeem','sudah diredeem') NOT NULL DEFAULT 'belum diredeem',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penukaran`
--

INSERT INTO `penukaran` (`id`, `user_id`, `voucher_id`, `poin_dipakai`, `tanggal`, `status`, `created_at`, `updated_at`) VALUES
('01JYG3A4S330K1M1C4MXE8WK94', 117, 7, 2000, '2025-06-24 04:32:02', 'belum diredeem', '2025-06-24 04:32:02', '2025-07-10 13:48:01'),
('01JZMDTC48NJSNPR097WE9FYCJ', 118, 11, 1000, '2025-07-08 07:08:19', 'belum diredeem', '2025-07-08 07:08:19', '2025-07-08 07:11:37'),
('01JZT11QZCWCGX93G6TVS8MZ67', 117, 11, 1000, '2025-07-10 11:20:36', 'belum diredeem', '2025-07-10 11:20:36', '2025-07-10 13:47:58'),
('01JZT8SAGMREHNVGX54RHW35G2', 118, 11, 1000, '2025-07-10 13:35:48', 'belum diredeem', '2025-07-10 13:35:48', '2025-07-10 13:35:48'),
('01JZT8SQWMP3TZX7HC7XYMYGBT', 118, 7, 2000, '2025-07-10 13:36:02', 'belum diredeem', '2025-07-10 13:36:02', '2025-07-10 13:36:02'),
('01JZT8VZEK0XQT7ZNZH4YZQFEF', 118, 11, 1000, '2025-07-10 13:37:15', 'belum diredeem', '2025-07-10 13:37:15', '2025-07-10 13:37:15');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'dashboard-access', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(2, 'users-access', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(3, 'users-data', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(4, 'users-create', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(5, 'users-update', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(6, 'users-delete', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(7, 'roles-access', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(8, 'roles-data', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(9, 'roles-create', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(10, 'roles-update', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(11, 'roles-delete', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(12, 'permissions-access', 'web', '2024-10-03 20:35:04', '2024-10-03 20:35:04'),
(13, 'permissions-data', 'web', '2024-10-03 20:35:05', '2024-10-03 20:35:05'),
(14, 'permissions-create', 'web', '2024-10-03 20:35:05', '2024-10-03 20:35:05'),
(15, 'permissions-update', 'web', '2024-10-03 20:35:05', '2024-10-03 20:35:05'),
(16, 'permissions-delete', 'web', '2024-10-03 20:35:05', '2024-10-03 20:35:05');

-- --------------------------------------------------------

--
-- Table structure for table `poin`
--

CREATE TABLE `poin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `total_poin` int(11) NOT NULL DEFAULT 0,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk_olahan`
--

CREATE TABLE `produk_olahan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_produk` varchar(100) NOT NULL,
  `sampah_id` bigint(20) UNSIGNED NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `link_pembelian` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `produk_olahan`
--

INSERT INTO `produk_olahan` (`id`, `nama_produk`, `sampah_id`, `foto`, `link_pembelian`, `created_at`, `updated_at`) VALUES
(1, 'vas', 3, 'produk_olahan/8TBnnKWYMR1m204mLDcYh07graupBtKK1zeOE2Cd.jpg', 'https://muvausa.com', '2025-06-22 02:35:24', '2025-06-22 02:35:37'),
(2, 'eco enzyme', 11, 'produk_olahan/EckSkwjxqF7ULWePa2tmdaRlOWhgS0hGkbk4n2mV.webp', 'https://shopee.com', '2025-06-22 02:35:59', '2025-06-22 02:35:59'),
(4, 'Pupuk Organik Cair', 12, 'produk_olahan/mN7fHKFzvvL9sjyXhIwAFaT2gQzzDRtCoGynBqMY.jpg', 'https://shopee.com/pusaka', '2025-06-27 00:34:25', '2025-06-27 00:34:25');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(4, 'super-admin', 'web', '2024-10-03 20:35:05', '2024-10-03 20:35:05'),
(5, 'user', 'web', '2024-10-03 21:09:08', '2024-10-03 21:09:08'),
(6, 'admin', 'web', '2025-06-12 01:28:58', '2025-06-12 01:28:58');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(7, 5);

-- --------------------------------------------------------

--
-- Table structure for table `sampah`
--

CREATE TABLE `sampah` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_sampah` varchar(100) NOT NULL,
  `harga_per_kg` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sampah`
--

INSERT INTO `sampah` (`id`, `nama_sampah`, `harga_per_kg`, `image`, `created_at`, `updated_at`) VALUES
(3, 'Botol PET', 3000, 'sampah/2M3icQbH7lAwFqWRrB3oBVmfEXEtuZwZNdUD8BTr.jpg', '2025-06-01 07:08:52', '2025-06-13 00:40:29'),
(4, 'Aluminium', 10000, 'sampah/F4vJkpm9IDnt4Na6qiuHhJMPClVhAwoJWgRMcnAF.webp', '2025-06-01 07:14:00', '2025-06-13 00:43:11'),
(7, 'Kardus', 1500, 'sampah/zCRYyJJgMTueAJ5PqsidKYNecvdxiTheC78DTUb8.jpg', '2025-06-13 00:44:43', '2025-06-13 00:44:43'),
(8, 'Kertas', 1000, 'sampah/3sJIboZk47iZgzXJrXSow0zXWAUGilrlBs8R8cRn.webp', '2025-06-13 00:45:56', '2025-06-13 00:45:56'),
(9, 'Besi', 2500, 'sampah/KJ0ISmTNMfDLQ0YTxrpGc4PkJI1hgawxzlJedwl5.jpg', '2025-06-13 00:46:42', '2025-06-13 00:46:42'),
(10, 'Plastik HDPE', 3000, 'sampah/cVnIfmprLEY4HIKAQCMx9hhuexJpKPOW7KMlt3Xg.jpg', '2025-06-13 00:47:23', '2025-06-13 00:47:23'),
(11, 'Sampah Buah', 0, 'sampah/CxIeCEr6jrpxA2wK74932wZiuKWB3WFUuYDflmMc.jpg', '2025-06-13 00:52:19', '2025-06-13 00:52:19'),
(12, 'Sampah Sayur', 0, 'sampah/gIxNtZvMA0gQtIiSudJt0JIyuLS24sti70n1Xexs.jpg', '2025-06-13 00:53:19', '2025-06-13 00:53:19');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2h7fpVmzHa8HMln8fk6hM17xLOEowarjM71sdttE', NULL, '91.184.244.208', 'Mozilla/5.0(compatible;MSIE10.0;WindowsNT6.2;Trident/6.0;.NET4.0E;.NET4.0C;.NETCLR3.5.30729;.NETCLR2.0.50727;.NETCLR3.0.30729;InfoPath.2)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidEcwM0o2WHJyZHNrYUFlVUIwZHdnYWcxc0dIRHlETHhqN1luT2F1QyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly9tYWlsLm11dmF1c2FzdG9yZS5vbmxpbmUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1752166377),
('3rRG9EMuDvmaINOKAWG6P9QLxtAIF8GFZr9UEE01', NULL, '88.210.10.79', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU3ZEY0I0bGgwNmtzcjlLTUJaelpyN3J1RkM3STN6UDlLYUZzSnd6NSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vbXV2YXVzYXN0b3JlLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1752176727),
('6xr9yDWXhuwLUGJyFvh8FJS6r4zPxqAPgfmj7KgR', NULL, '15.204.161.7', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZnk0bHZUUkJSeVUwZDJxWDVKTDFLcnk2TkhZMnE5OGgwcnJhOFhGdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vbXV2YXVzYXN0b3JlLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1752152654),
('b1pnWmRjI6ekVfhMlABvZ3JHKwR4KftBqZtmBe4r', NULL, '17.241.75.80', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVFBHVWc3TU50d09aY2lBRlAwbDRJYTBUSTVBcm1IMm4zenppd0RKMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHBzOi8vbXV2YXVzYXN0b3JlLm9ubGluZS9mb3Jnb3QtcGFzc3dvcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1752189152),
('FQncL63yqwerkEhzHCWEbMQiwFwSKsKXtSLUireT', NULL, '34.85.169.168', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTFQ3dUw1dzY0MWdHd29yQWJCd0JnVVVNNTRhS0tqeDBKem1XdkVlZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly93d3cubXV2YXVzYXN0b3JlLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1752160886),
('gIvsceN46og4K3MCdsNOC0AX0ofzzIj46RXjJLdb', 117, '114.10.10.79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoibU4zUUpmVEZkN0ZLTFEzellVUEJxc01Nb0xjeVNhQmxtdVo5ZGsxVSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjM0OiJodHRwczovL211dmF1c2FzdG9yZS5vbmxpbmUvc2FtcGFoIjt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTE3O30=', 1752157231),
('gNBjsU3z23Muj7Y0bUWcQm0goHvXz774Z7OT8ggZ', NULL, '15.204.161.7', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia3Y5a0lqOXdsYXI3M0tqck0yTnFhNjE3VGs3MlJrN1ZwTVE0M0RlRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHBzOi8vd3d3Lm11dmF1c2FzdG9yZS5vbmxpbmUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1752152654),
('GtUTwBUkOuuP2JYkvLqHNX379CesbozcYUuJuQMa', NULL, '195.211.77.142', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiemdGelNBeDY4eUlnUUlvTWFaSkxmZWVpVGhPSms0d2Y5Y3V0dlphMSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1752152234),
('gyqnZY1eF9XvAKtLXAYsKwuowZdCmmksPMH3hI3G', NULL, '195.211.77.142', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ0xVMXFGN3k0c0xqck5XaktzcmtHTzB0anVLeFR3RWhPdHpQaVpicCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vbXV2YXVzYXN0b3JlLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1752152247),
('h6abe1s5nbW4XLqiojejy21eT2lMsqoXQmz0y3JZ', NULL, '35.231.4.64', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOHBkSUN0bkpBdXdmYVg4cENZYTJ1cWdCQllpdVhXNlAxbkdBVjRoTyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly9tYWlsLm11dmF1c2FzdG9yZS5vbmxpbmUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1752163298),
('Kw2sssbphpamr5HVbG1GjjU4B1g8vKowrHvZoAlC', NULL, '40.160.16.154', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid2dyWW1DRVFXNVYxMGpKVGhRU0FJc3k0dEd4aXQ0NGFRWk10ZURpcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vbXV2YXVzYXN0b3JlLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1752160935),
('LCIO5K51bpzRo7y6cdQLQe5fkAhTHXKGhPz0AnJs', NULL, '43.166.237.57', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVzJqZG43SEt6cHRDdHNYcXpjM0hMZDFPYlkxRGhLVHpmdnFhYzVJMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly9tdXZhdXNhc3RvcmUub25saW5lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1752153189),
('lU08XcXEVdX7z3MM4hSc8XQ9aoMg01Q5AGQ3jIf7', NULL, '91.184.244.208', 'Mozilla/5.0(compatible;MSIE10.0;WindowsNT6.2;Trident/6.0;.NET4.0E;.NET4.0C;.NETCLR3.5.30729;.NETCLR2.0.50727;.NETCLR3.0.30729;InfoPath.2)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQzFob3RJNjJ3OFJta0Q5c3RQVTNkajBsV2M4WTdORndvcGs0d0ZUdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly9tdXZhdXNhc3RvcmUub25saW5lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1752166380),
('NkRD1TbWdykMp0qK8rf87fGlTX37YaTWlHCPkMjg', 117, '2400:9800:a51:d77a:da16:1ea0:a838:68e', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoibXlPN1JJZXphMjM1QzhodVg0TlUzQ3cwR2RoR29SSndQdjV4N01OVSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHBzOi8vbXV2YXVzYXN0b3JlLm9ubGluZS9taW1pbi9kYXNoYm9hcmQiO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxMTc7fQ==', 1752156337),
('RIwD6pjEVoRKJNh9bksu1fUeYmEvl1j2NCjIdS7X', NULL, '35.185.126.54', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQkQwdGhjMnJDMGdQVVBYc2pKSThrbE9JQ1NPTXZLNUhNWVd6dnBjUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly9tdXZhdXNhc3RvcmUub25saW5lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1752161839),
('Tr2hodIlPKWfg1ymsWodrp5ppgRElSdhQMscPsYB', NULL, '40.160.16.154', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN3dpbWdxV05NcWxlWm5tdkJLVmJrRkpJdTVXWTFYNjdEV2VrY1YwMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHBzOi8vd3d3Lm11dmF1c2FzdG9yZS5vbmxpbmUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1752160935),
('XcRObH7J8r6xtwuI1oJKE6Z77Nh2IMTpMXMMEk4K', NULL, '183.197.47.54', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicVFyTDlZTzlhRkIxa1RleG5ZU3NsR01XcW81SVBsMTVGNzVuRzlBbiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly9tdXZhdXNhc3RvcmUub25saW5lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1752181047);

-- --------------------------------------------------------

--
-- Table structure for table `setoran`
--

CREATE TABLE `setoran` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `sampah_id` bigint(20) UNSIGNED NOT NULL,
  `berat_dalam_kg` decimal(10,3) NOT NULL,
  `poin_diperoleh` int(11) NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `setoran`
--

INSERT INTO `setoran` (`id`, `user_id`, `sampah_id`, `berat_dalam_kg`, `poin_diperoleh`, `tanggal`, `created_at`, `updated_at`) VALUES
(1, 117, 3, 0.001, 10, '2025-06-03 14:24:31', '2025-06-03 14:24:31', '2025-06-03 14:24:31'),
(2, 116, 3, 1.000, 1000, '2025-06-04 00:10:24', '2025-06-04 00:10:24', '2025-06-04 06:17:43'),
(120, 118, 4, 1250.000, 6250000, '2025-06-04 06:23:25', '2025-06-04 06:23:25', '2025-06-04 06:56:37'),
(123, 118, 4, 3.500, 17500, '2025-06-06 02:00:00', '2025-06-06 02:00:00', '2025-06-06 02:00:00'),
(124, 118, 4, 0.750, 3750, '2025-06-07 07:30:00', '2025-06-07 07:30:00', '2025-06-07 07:30:00'),
(125, 118, 4, 12.250, 61250, '2025-06-08 04:15:00', '2025-06-08 04:15:00', '2025-06-08 04:15:00'),
(126, 118, 4, 3.500, 17500, '2025-06-06 02:00:00', '2025-06-06 02:00:00', '2025-06-06 02:00:00'),
(127, 118, 4, 0.750, 3750, '2025-06-07 07:30:00', '2025-06-07 07:30:00', '2025-06-07 07:30:00'),
(128, 118, 4, 12.025, 61250, '2025-06-08 04:15:00', '2025-06-08 04:15:00', '2025-06-08 04:15:00'),
(129, 119, 4, 0.200, 2000, '2025-06-16 14:26:35', '2025-06-16 14:26:35', '2025-06-16 14:27:26'),
(130, 117, 4, 5.000, 50000, '2025-06-22 02:38:59', '2025-06-22 02:38:59', '2025-06-22 02:38:59');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ref_id` varchar(255) NOT NULL,
  `buyer_sku_code` varchar(255) NOT NULL,
  `customer_no` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `rc` varchar(255) NOT NULL,
  `sn` varchar(255) DEFAULT NULL,
  `buyer_last_saldo` double DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `profile_image` text DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `rt` char(2) DEFAULT NULL,
  `rw` char(2) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `kontak` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `avatar`, `remember_token`, `created_at`, `updated_at`, `profile_image`, `points`, `rt`, `rw`, `alamat`, `kontak`) VALUES
(116, 'fda', 'pusat@gmail.com', NULL, '$2y$12$0aFK6lLFcDpyY1rrbdc4iuKpJg6YEr7RlO69y4xsJPFru39w.qNIK', NULL, 'PdQjqkko668cGJZzTDC5fhjXFjB7laNYj9Hu1GFOuedcX9LzLDroX5yGKZJB', '2025-06-01 02:59:23', '2025-06-05 05:49:01', NULL, 1800, NULL, NULL, NULL, NULL),
(117, 'Admin Pusaka', 'admin@gmail.com', NULL, '$2y$12$8bH79pDB.fUMFjtSl1clTeagrpODxlLAgjPHlhGaEoOisBbQfftiy', 'avatars/128eac37-e91d-4e9c-8bfe-a91badd92ac4.png', 'UFARUCVqQdzQLWB5gUUxmEzCeSZidB3nwhw9BDbe5igBG1TT55ZqNOO1Frkc', '2025-06-01 05:19:57', '2025-07-10 11:20:36', NULL, 45100, '04', '34', NULL, '08889834'),
(118, 'user', 'user@gmail.com', NULL, '$2y$12$QbGZPTAsQ1j//K0WEtz37.4zZqkyLi.Hh47x6YFGgHXrLie0fAtSi', NULL, 'zygjkl02BxboBF2XGT4zTMloh6tXmHByoxwOneFvVsDmkvCntBWKrz9BCVV5', '2025-06-09 09:57:42', '2025-07-10 13:37:15', NULL, 44000, NULL, NULL, NULL, NULL),
(119, 'Saeful', 'fatoniahmad@gmaill.com', NULL, '$2y$12$frCMYGj3up.wM7s7ta39Zu8uYZtkthMLO0RD1XHpghVqcywn/yXwm', NULL, NULL, '2025-06-16 14:10:58', '2025-06-26 12:28:04', NULL, 2000, '03', '02', 'jalan jalan', '081879122'),
(121, 'Hikma', 'hikma@gmail.com', NULL, '$2y$12$jv6PhXqxY0bHxZctJOAKKOu2Pdn9E9Xu25jMKIHDG6h77ZOkZejcy', NULL, NULL, '2025-06-27 03:57:12', '2025-06-27 03:57:12', NULL, 0, '02', '03', 'Jalan Jawa Tengah Kota', '08123456789'),
(125, 'akua', 'mantabbetul30@gmail.com', NULL, '$2y$12$Lv2qz78o.Kac3wn468xTuuDOoM1HLqiOBgR0HPCxpGO9NTO4b.Xry', NULL, 'VPttIhuaU0kPNbMUXtOxsm4oI9TbBh6vkdYoKInO8489ByG441n6tALyVZtW', '2025-06-27 23:34:51', '2025-06-28 08:41:08', NULL, 0, '01', '32', NULL, '0898'),
(126, 'ayam', 'purdhentoram@gmail.com', NULL, '$2y$12$lYlY9nrmZdl7ZtieERyrdOx6LAM.rvDbcA6kIQbResGUYeLvAYiTO', NULL, 'v6O1qTC4uZJXFhl1OiBVXQ2ioQoOgDZuZtOyKMA1QacuUj8MvWiWnTTD69aC', '2025-07-09 01:30:56', '2025-07-10 04:48:48', NULL, 0, '12', '03', NULL, '08774209791');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(100) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `nilai_poin` int(11) NOT NULL,
  `stok` int(11) NOT NULL DEFAULT 0,
  `status` enum('tersedia','tidak tersedia') NOT NULL DEFAULT 'tersedia',
  `gambar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `nama`, `deskripsi`, `nilai_poin`, `stok`, `status`, `gambar`, `created_at`, `updated_at`) VALUES
(7, 'Potongan Tagihan Air Rp2.000', 'Voucher Tagihan Air', 2000, 98, 'tersedia', 'vouchers/7Z1RhbZBULC8785axCbuh9tU3DFRbqOpS48Ha3yI.png', '2025-06-04 14:43:38', '2025-07-10 13:36:02'),
(8, 'Potongan Tagihan Air Rp5.000', 'Vooucher Tagihan Air', 5000, 100, 'tersedia', 'vouchers/7Z1RhbZBULC8785axCbuh9tU3DFRbqOpS48Ha3yI.png', '2025-06-04 14:44:18', '2025-06-13 03:41:53'),
(10, 'Potongan Tagihan Air Rp10.000', 'Voucher Tagihan Air Rp10.000', 10000, 100, 'tersedia', 'vouchers/7Z1RhbZBULC8785axCbuh9tU3DFRbqOpS48Ha3yI.png', '2025-06-05 01:32:33', '2025-06-13 03:41:40'),
(11, 'voucher air 1k', 'desk', 1000, 218, 'tersedia', 'vouchers/7Z1RhbZBULC8785axCbuh9tU3DFRbqOpS48Ha3yI.png', '2025-06-16 14:18:36', '2025-07-10 13:37:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laporan_admin`
--
ALTER TABLE `laporan_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laporan_pengguna`
--
ALTER TABLE `laporan_pengguna`
  ADD PRIMARY KEY (`id`),
  ADD KEY `laporan_pengguna_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `penukaran`
--
ALTER TABLE `penukaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penukaran_user_id_foreign` (`user_id`),
  ADD KEY `penukaran_voucher_id_foreign` (`voucher_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `poin`
--
ALTER TABLE `poin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poin_user_id_foreign` (`user_id`);

--
-- Indexes for table `produk_olahan`
--
ALTER TABLE `produk_olahan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produk_olahan_sampah_id_foreign` (`sampah_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sampah`
--
ALTER TABLE `sampah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `setoran`
--
ALTER TABLE `setoran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `setoran_user_id_foreign` (`user_id`),
  ADD KEY `setoran_sampah_id_foreign` (`sampah_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transactions_ref_id_unique` (`ref_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `laporan_admin`
--
ALTER TABLE `laporan_admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `laporan_pengguna`
--
ALTER TABLE `laporan_pengguna`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `poin`
--
ALTER TABLE `poin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk_olahan`
--
ALTER TABLE `produk_olahan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sampah`
--
ALTER TABLE `sampah`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `setoran`
--
ALTER TABLE `setoran`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `laporan_pengguna`
--
ALTER TABLE `laporan_pengguna`
  ADD CONSTRAINT `laporan_pengguna_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penukaran`
--
ALTER TABLE `penukaran`
  ADD CONSTRAINT `penukaran_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penukaran_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `poin`
--
ALTER TABLE `poin`
  ADD CONSTRAINT `poin_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `produk_olahan`
--
ALTER TABLE `produk_olahan`
  ADD CONSTRAINT `produk_olahan_sampah_id_foreign` FOREIGN KEY (`sampah_id`) REFERENCES `sampah` (`id`);

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `setoran`
--
ALTER TABLE `setoran`
  ADD CONSTRAINT `setoran_sampah_id_foreign` FOREIGN KEY (`sampah_id`) REFERENCES `sampah` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `setoran_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
