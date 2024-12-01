-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2024 at 02:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myshopdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartdetails`
--

CREATE TABLE `cartdetails` (
  `CartDetailID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL CHECK (`Quantity` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cartdetails`
--

INSERT INTO `cartdetails` (`CartDetailID`, `CustomerID`, `ProductID`, `Quantity`) VALUES
(79, 36, 20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `CustomerID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`CustomerID`, `Username`, `Email`, `Password`) VALUES
(27, 'eeee', 'cobas75212@esterace.com', 'cccc'),
(29, 'rrrrrr', 'rr@rr.rr', 'rrrr'),
(32, 'wwww', 'licedi3865@janfab.com', 'wwww'),
(33, 'kkkk', 'bsdbbs@de.com', 'acsasc'),
(34, 'jony', 'jone234@gmail.com', 'jony46446'),
(35, 'rex', 'rex@gmail.com', 'ffff'),
(36, 'bilal', 'fre@gmail.com', '1111');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `OrderDetailID` int(11) NOT NULL,
  `OrderID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`OrderDetailID`, `OrderID`, `ProductID`, `Quantity`, `Price`) VALUES
(1, 1, 22, 1, 10.90),
(2, 1, 12, 1, 15.00),
(3, 2, 1, 1, 12.90),
(4, 3, 6, 1, 11.90),
(5, 3, 24, 1, 24.90),
(6, 4, 1, 1, 12.90),
(7, 5, 2, 1, 12.90),
(8, 5, 21, 1, 10.90),
(9, 6, 4, 1, 10.90),
(10, 7, 19, 1, 27.90),
(11, 8, 12, 1, 15.00),
(12, 9, 11, 1, 15.00),
(13, 10, 20, 1, 29.90),
(14, 10, 2, 1, 12.90),
(15, 11, 12, 1, 15.00),
(16, 11, 13, 1, 15.00),
(17, 12, 2, 1, 12.90),
(18, 12, 21, 1, 10.90),
(19, 13, 1, 1, 12.90),
(20, 13, 4, 1, 10.90),
(21, 14, 4, 1, 10.90),
(22, 14, 23, 1, 18.90),
(23, 14, 21, 1, 10.90),
(24, 15, 20, 1, 29.90),
(25, 15, 21, 1, 10.90),
(26, 16, 15, 1, 5.00),
(27, 16, 18, 1, 5.00),
(28, 17, 13, 1, 15.00),
(29, 18, 22, 1, 10.90),
(30, 18, 21, 1, 10.90),
(31, 19, 20, 1, 29.90),
(32, 19, 4, 1, 10.90),
(33, 20, 11, 1, 15.00),
(34, 20, 1, 1, 12.90),
(35, 21, 11, 1, 15.00),
(36, 21, 2, 1, 12.90),
(37, 22, 1, 1, 12.90),
(38, 22, 10, 1, 12.90),
(39, 22, 22, 1, 10.90),
(40, 22, 20, 1, 29.90),
(41, 23, 11, 1, 15.00),
(42, 24, 26, 1, 26.90),
(43, 24, 12, 1, 15.00),
(44, 24, 6, 1, 11.90),
(45, 25, 6, 1, 11.90),
(46, 25, 20, 1, 29.90),
(47, 25, 12, 1, 15.00),
(48, 26, 12, 1, 15.00),
(49, 27, 3, 1, 12.90),
(50, 27, 13, 1, 15.00),
(51, 27, 20, 1, 29.90),
(52, 27, 22, 1, 10.90);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  `OrderDate` datetime DEFAULT current_timestamp(),
  `TotalAmount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderID`, `CustomerID`, `OrderDate`, `TotalAmount`) VALUES
(1, 32, '2024-09-03 11:16:39', 25.90),
(2, 32, '2024-09-03 11:32:24', 12.90),
(3, 27, '2024-09-03 14:43:48', 36.80),
(4, 32, '2024-09-03 14:51:18', 12.90),
(5, 32, '2024-09-03 15:11:57', 23.80),
(6, 32, '2024-09-03 15:50:46', 10.90),
(7, 32, '2024-09-03 15:54:25', 27.90),
(8, 32, '2024-09-03 16:22:17', 15.00),
(9, 32, '2024-09-03 16:23:07', 15.00),
(10, 32, '2024-09-03 16:25:09', 42.80),
(11, 32, '2024-09-03 20:19:02', 30.00),
(12, 32, '2024-09-03 20:30:51', 23.80),
(13, 32, '2024-09-03 20:41:59', 23.80),
(14, 27, '2024-09-04 10:55:21', 40.70),
(15, 27, '2024-09-04 11:25:33', 40.80),
(16, 27, '2024-09-04 11:47:18', 10.00),
(17, 27, '2024-09-04 18:28:03', 15.00),
(18, 27, '2024-09-05 19:03:22', 21.80),
(19, 27, '2024-09-05 19:24:18', 40.80),
(20, 27, '2024-09-05 19:28:17', 27.90),
(21, 27, '2024-09-05 19:29:54', 27.90),
(22, 33, '2024-09-06 16:34:35', 66.60),
(23, 33, '2024-09-06 16:41:33', 15.00),
(24, 34, '2024-09-06 16:57:24', 53.80),
(25, 35, '2024-09-06 18:29:12', 56.80),
(26, 35, '2024-09-06 18:37:41', 15.00),
(27, 36, '2024-09-06 19:22:42', 68.70);

-- --------------------------------------------------------

--
-- Table structure for table `passwordresettokens`
--

CREATE TABLE `passwordresettokens` (
  `TokenID` int(11) NOT NULL,
  `Token` varchar(255) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Stock` int(11) NOT NULL,
  `ImageLink` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `Description`, `Price`, `Stock`, `ImageLink`) VALUES
(1, 'Chocolate Banana Cake', 'Cocoa banana sponge layered with fresh caramelized banana slices and coated with dark chocolate.', 12.90, 100, './photos/Chocolate Banana Cake.jpg'),
(2, 'Chocolate Odyssey Cake', 'Chocolate mud cake base with Belgian chocolate praline cream topped with caramelized hazelnuts and cocoa crumbles.', 12.90, 100, './photos/Chocolate Odyssey Cake.jpg'),
(3, 'Chocolate Brulee Cake', 'Silky smooth vanilla brulée and Swiss dark chocolate on chocolate mud cake over a crispy croquantine base.', 12.90, 100, './photos/Chocolate Brulee cake.png'),
(4, 'Chocolate Indulgence Cake', 'Cocoa sponge with layers of Belgian white and dark chocolate, coated with melted chocolate.', 10.90, 100, './photos/Chocolate indulgence.png'),
(5, 'Moist Chocolate Cake', 'Moist chocolate cake baked with smooth coffee filling, topped with melted chocolate.', 11.90, 100, './photos/moist chocolate cake.jpg'),
(6, 'Decadent Tiramisu Cake', 'A unique twist of the classic tiramisu dessert with coffee sponge, layered with mascarpone cheese and espresso cream', 11.90, 100, './photos/Decadent Tiramisu Cake.jpg'),
(7, 'Chocolat Au Lait Cake', 'Layers of moist cocoa sponge and Swiss milk chocolate mousse coated with melted Belgian and Swiss milk chocolate.', 10.90, 100, './photos/Chocolat Au Lait Cake.jpg'),
(8, 'Choc Cheese Berries Cake', 'An ultimate fusion of cream cheese, Belgian dark chocolate and summer berries.', 11.90, 100, './photos/Choc Cheese Berries Cake.jpg'),
(9, 'Lotus Biscoff Cheese', 'Creamy chilled cheese combined with a ganache and cookie base made with Biscoff.', 12.90, 100, './photos/Lotus Biscoff Cheese.jpg'),
(10, 'Marble Cheesecake', 'Perfect mix of white chocolate and rich cream cheese over an oat and nut base.', 12.90, 100, './photos/Marble Cheesecake.jpg'),
(11, 'Chocolate Ice Cream Plate', 'Decadent chocolate ice cream made with real cocoa.', 15.00, 100, './photos/Chocolate plate.jpg'),
(12, 'Strawberry Ice Cream Plate', 'Fresh and fruity strawberry ice cream with real fruit pieces.', 15.00, 100, './photos/Strawberry plate.jpg'),
(13, 'Vanila Ice Cream Plate', 'Vanilia ice cream made with fresh milk.', 15.00, 100, './photos/vanila plate.jpg'),
(14, 'Mango Ice Cream Plate', 'Fresh and fruity Mango ice cream with real fruit pieces.', 15.00, 100, './photos/mango plate2.jpg'),
(15, 'Chocolate Ice Cream Cone', 'Decadent chocolate ice cream cone made with real cocoa.', 5.00, 100, './photos/chocolate-cone.jpg'),
(16, 'Strawberry Ice Cream Cone', 'Fresh and fruity strawberry ice cream cone with real fruit pieces.', 5.00, 100, './photos/Strawberry cone.jpg'),
(17, 'Vanila Ice Cream Cone', 'Vanilia ice cream cone made with fresh milk.', 5.00, 100, './photos/Vanila cone.jpg'),
(18, 'Mango Ice Cream Cone', 'Fresh and fruity Mango ice cream cone with real fruit pieces.', 5.00, 100, './photos/Mango cone.jpg'),
(19, 'Country Fried Chicken', 'A golden crispy chicken served with a side of fries and garden salad, topped with rich creamy mushroom sauce.', 27.90, 100, './photos/Country Fried Chicken.jpg'),
(20, 'Chicken Cordon Bleu', 'Boneless chicken chop stuffed with chicken square and cheese', 29.90, 100, './photos/Chicken Cordon Bleu.jpg'),
(21, 'French Fries', 'French Fries', 10.90, 100, './photos/Frensh fries.jpg'),
(22, 'Citrus Salad', 'A refreshing and colourful mix of fruits, vegetables and silvered almonds, drizzled with citrus sauce.', 10.90, 100, './photos/Citrus Salad.jpg'),
(23, 'Chicken Satay', 'Skewers of chicken marinated in our special sauce and grilled to perfection. Served with slices of sweet onions,', 18.90, 100, './photos/Chicken Satay.jpg'),
(24, 'Chicken Parmigiana', 'Tender chicken thigh topped with mozzarella cheese and tomato basil sauce, served with potato wedges and garden salad.', 24.90, 100, './photos/Chicken Parmigiana.jpg'),
(25, 'Golden Crispy Chicken', 'Golden crumbed crispy chicken thigh topped with a swirl of Japanese mayonnaise. Served with french fries and garden salad.', 25.90, 100, './photos/Golden Crispy Chicken.jpg'),
(26, 'Grilled Mushroom Chicken', 'Grilled chicken with special mushroom sauce. Served with herb rice and garden salad.', 26.90, 100, './photos/Grilled Mushroom Chicken.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartdetails`
--
ALTER TABLE `cartdetails`
  ADD PRIMARY KEY (`CartDetailID`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`OrderDetailID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `passwordresettokens`
--
ALTER TABLE `passwordresettokens`
  ADD PRIMARY KEY (`TokenID`),
  ADD UNIQUE KEY `Token` (`Token`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartdetails`
--
ALTER TABLE `cartdetails`
  MODIFY `CartDetailID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `OrderDetailID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `passwordresettokens`
--
ALTER TABLE `passwordresettokens`
  MODIFY `TokenID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartdetails`
--
ALTER TABLE `cartdetails`
  ADD CONSTRAINT `cartdetails_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `cartdetails_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`);

--
-- Constraints for table `passwordresettokens`
--
ALTER TABLE `passwordresettokens`
  ADD CONSTRAINT `passwordresettokens_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
