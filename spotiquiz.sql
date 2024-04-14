-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 14 2024 г., 19:59
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `spotiquiz`
--
CREATE DATABASE IF NOT EXISTS `spotiquiz` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `spotiquiz`;

-- --------------------------------------------------------

--
-- Структура таблицы `domanda`
--

CREATE TABLE `domanda` (
  `id_domanda` int(11) NOT NULL,
  `testo_domanda` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `domanda`
--

INSERT INTO `domanda` (`id_domanda`, `testo_domanda`) VALUES
(1, 'May 16th of every year is known as __________ Day, named after a punk band prominent in the 1990s.'),
(2, 'According to their 1974 hit, what were Brownsville Station doing &quot;In The Boys&#039; Room&quot;?'),
(3, 'Which European capital city gives its name to a 1981 song by Ultravox?'),
(4, 'What is the last song on the first Panic! At the Disco album?'),
(5, 'A Facebook campaign placed Rage Against The Machine&#039;s &quot;Killing in the Name Of&quot; as the UK Christmas Number 1 in 2009.'),
(6, 'The 1952 musical composition 4&#039;33&quot;, composed by prolific American composer John Cage, is mainly comprised of what sound?'),
(7, 'Which of these is not a song on the album Graduation by Kanye West?'),
(8, 'Which of the following music bands is not from Finland?'),
(9, 'Who is the lead singer of The Lumineers?'),
(10, 'What was Radiohead&#039;s first album?'),
(11, 'The alternative rock band, They Might Be Giants, released their album &#039;Flood&#039; in 1990. '),
(12, 'The Red Hot Chili Pepper song &quot;Give It Away&quot; is from what album?'),
(13, 'Who was featured in the song &quot;Words&quot; by Feint? '),
(14, 'Which 80s band is fronted by singer/guitarist Robert Smith?'),
(15, 'How many members are there in the band Nirvana?'),
(16, '&quot;Some people call me the space cowboy&quot; is the first line from what song?'),
(17, 'Who is the lead singer of Foo Fighters?'),
(18, 'Finish these lyrics from the 2016 song &quot;Panda&quot; by Desiigner: &quot;I got broads in _______&quot;.'),
(19, 'Who was &quot;Kung Fu Fighting&quot; in 1974?'),
(20, '&quot;The Singing Cowboy&quot; Gene Autry is credited with the first recording for all but which classic Christmas jingle?'),
(21, 'Which member of the British pop group &quot;The Spice Girls&quot; was known as Ginger Spice?'),
(22, 'Which one of these people has been in the band &#039;&#039;Metallica&#039;&#039; in the past?'),
(23, '&quot;The Genius&quot; is the original and secondary name of which Wu-Tang Clan member?'),
(24, 'What is Brian May&#039;s guitar called?'),
(25, 'What date is referenced in the 1971 song &quot;September&quot; by Earth, Wind &amp; Fire?'),
(26, 'African-American performer Sammy Davis Jr. was known for losing which part of his body in a car accident?'),
(27, 'In 2015, David Hasselhof released a single called...'),
(28, 'According to the RIAA: Which artist has sold the most albums by the million?'),
(29, 'Musical artist, Future, collaborated with Kendrick Lamar for the song: &quot;Mask Off&quot;.'),
(30, 'The song &quot;Twin Size Mattress&quot; was written by which band?'),
(31, 'What&#039;s the most common time signature for rock songs?'),
(32, 'How many studio albums have the heavy metal band, &#039;Metallica&#039; released in the period between 1983 and 2016?'),
(33, 'EDM label Monstercat signs tracks instead of artists.'),
(34, 'In which year did &quot;Caravan Palace&quot; release their first album?'),
(35, 'What is the opening track on Lorde&#039;s Pure Heroine?'),
(36, 'How many copies have Metallica album &quot;Metallica&quot; (A.K.A The Black Album) sold worldwide (in Millions of Copies)?'),
(37, '&quot;The Division Bell&quot; is the final album of the progressive rock band Pink Floyd.'),
(38, 'Who is the lead singer of Silverchair?'),
(39, 'Ellie Goulding&#039;s earliest album was named?'),
(40, 'Which song by Swedish electronic musician Avicii samples the song &quot;Something&#039;s Got A Hold On Me&quot; by Etta James?'),
(41, 'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'),
(42, 'Which one of these people has been in the band &#039;&#039;Metallica&#039;&#039; in the past?'),
(43, 'What genre of EDM is the Dutch DJ, musician, and remixer Armin van Buuren most well-known for?'),
(44, 'Which of these is NOT the name of an album released by American rapper Viper?'),
(45, 'What year was Red Hot Chill Pepper&#039;s album &quot;Californication&quot; released?'),
(46, 'Which country does the electronic music duo &quot;The Knife&quot; originate from?'),
(47, 'The song &quot;Feel Good Inc.&quot; by British band Gorillaz features which hip hop group?'),
(48, 'Which member of &quot;The Beatles&quot; narrated episodes of &quot;Thomas the Tank Engine&quot;?'),
(49, 'Which band had hits in 1975 with the songs, &#039;One Of These Nights&#039; &amp; &#039;Lyin Eyes&#039;?'),
(50, 'Which alternative rock band released the critically-acclaimed album &quot;OK Computer&quot;?'),
(51, 'Which of these songs is not on the &quot;untitled&quot; album by Led Zeppelin?'),
(52, 'Who is the lead singer of Silverchair?'),
(53, 'What French artist/band is known for playing on the midi instrument &quot;Launchpad&quot;?'),
(54, 'Norwegian producer Kygo released a remix of the song &quot;Sexual Healing&quot; by Marvin Gaye.'),
(55, 'What was The Velvet Underground&#039;s first album called?'),
(56, 'Which of these is NOT a name of an album released by American rapper Pitbull?'),
(57, 'According to the RIAA: Which artist has sold the most albums by the million?'),
(58, 'What was Radiohead&#039;s first album?'),
(59, 'Who is the lead singer of The Lumineers?'),
(60, 'Green Day&#039;s album &#039;American Idiot&#039; is considered a &quot;punk rock opera.&quot;'),
(61, 'The Red Hot Chili Pepper song &quot;Give It Away&quot; is from what album?'),
(62, 'Who had a 1969 top 5 hit with the song,  &#039;A Boy Named Sue&#039;?'),
(63, 'Which of these is NOT the name of an album released by English singer-songwriter Adele?'),
(64, '&quot;Hallelujah&quot; is a song written by which Canadian recording artist?'),
(65, 'The 2016 song &quot;Starboy&quot; by Canadian singer The Weeknd features which prominent electronic artist?'),
(66, 'Michael Jackson wrote The Simpsons song &quot;Do the Bartman&quot;.'),
(67, 'Which band released songs suchs as &quot;Rio&quot;, &quot;Girls on Film&quot;, and &quot;The Reflex&quot;?'),
(68, 'According to the American rapper Nelly, what should you do when its hot in here?'),
(69, 'The music group Daft Punk got their name from a negative review they recieved.'),
(70, 'A Saxophone is a brass instrument.');

-- --------------------------------------------------------

--
-- Структура таблицы `risposta`
--

CREATE TABLE `risposta` (
  `id_risposta` int(11) NOT NULL,
  `testo_risposta` text DEFAULT NULL,
  `mail_utente` varchar(100) DEFAULT NULL,
  `id_domanda` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `risposta`
--

INSERT INTO `risposta` (`id_risposta`, `testo_risposta`, `mail_utente`, `id_domanda`) VALUES
(18, 'Lagwagon', 'antonicanter000@gmail.com', 1),
(19, 'Hangin&#039;', 'antonicanter000@gmail.com', 2),
(20, 'Paris', 'antonicanter000@gmail.com', 3),
(21, 'Nails for Breakfast, Tacks for Snacks', 'antonicanter000@gmail.com', 4),
(22, 'False', 'antonicanter000@gmail.com', 5),
(23, 'People talking', 'antonicanter000@gmail.com', 6),
(24, 'The Glory', 'antonicanter000@gmail.com', 7),
(25, 'Waltari', 'antonicanter000@gmail.com', 8),
(26, 'Jay Van Dyke', 'antonicanter000@gmail.com', 9),
(27, 'Kid A', 'antonicanter000@gmail.com', 10),
(28, 'False', 'antonicanter000@gmail.com', 11),
(29, 'Blood Sugar Sex Magik', 'antonicanter000@gmail.com', 12),
(30, 'Veela', 'antonicanter000@gmail.com', 13),
(31, 'The Cure', 'antonicanter000@gmail.com', 14),
(32, 'Three', 'antonicanter000@gmail.com', 15),
(33, 'The Joker', 'antonicanter000@gmail.com', 16),
(34, 'Dave Grohl', 'antonicanter000@gmail.com', 17),
(35, 'Atlanta', 'antonicanter000@gmail.com', 18),
(36, 'The Bee Gees', 'antonicanter000@gmail.com', 19),
(37, 'Frosty the Snowman', 'antonicanter000@gmail.com', 20),
(38, 'Emma Bunton', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 21),
(39, 'Dave Lombardo', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 22),
(40, 'Ghostface Killah', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 23),
(41, 'Red Special', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 24),
(42, '21st of September', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 25),
(43, 'Right Ear', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 26),
(44, 'True Fighter', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 27),
(45, 'Elvis Presley', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 28),
(46, 'False', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 29),
(47, 'The Front Bottoms', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 30),
(48, '4/4', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 31),
(49, '7', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 32),
(50, 'False', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 33),
(51, '2008', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 34),
(52, 'Team', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 35),
(53, '20.5', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 36),
(54, 'False', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 37),
(55, 'Chris Joannou', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 38),
(56, 'Bright Lights', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 39),
(57, 'Fade Into Darkness', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 40),
(58, 'A Warm Place', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 41),
(59, 'Joey Belladonna', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 22),
(60, 'Trance', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 43),
(61, 'You&#039;ll Cowards Don&#039;t Even Smoke Crack', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 44),
(62, '1997', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 45),
(63, 'Sweden', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 46),
(64, 'OutKast', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 47),
(65, 'Paul McCartney', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 48),
(66, 'Fools Gold', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 49),
(67, 'Nirvana', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 50),
(68, 'Celebration Day', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 51),
(69, 'Daniel Johns', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 38),
(70, 'Madeon', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 53),
(71, 'False', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 54),
(72, 'White Light / White Heat', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 55),
(73, 'Armando', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 56),
(74, 'The Beatles', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 28),
(75, 'Pablo Honey', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 10),
(76, 'Neyla Pekarek', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 9),
(77, 'True', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 60),
(78, 'One Hot Minute', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 12),
(79, 'Kris Kristofferson', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 62),
(80, '25', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 63),
(81, 'Leonard Cohen', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 64),
(82, 'Daft Punk', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 65),
(83, 'True', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 66),
(84, 'New Order', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 67),
(85, 'Drink some water', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 68),
(86, 'False', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 69),
(87, 'False', 'yurii.krainianskyi@polomanettiporciatti.edu.it', 70);

-- --------------------------------------------------------

--
-- Структура таблицы `utente`
--

CREATE TABLE `utente` (
  `nome` varchar(100) DEFAULT NULL,
  `mail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `utente`
--

INSERT INTO `utente` (`nome`, `mail`) VALUES
('yurii', 'antonicanter000@gmail.com'),
('yurii', 'yurii.krainianskyi@polomanettiporciatti.edu.it');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `domanda`
--
ALTER TABLE `domanda`
  ADD PRIMARY KEY (`id_domanda`);

--
-- Индексы таблицы `risposta`
--
ALTER TABLE `risposta`
  ADD PRIMARY KEY (`id_risposta`),
  ADD KEY `mail_utente` (`mail_utente`),
  ADD KEY `id_domanda` (`id_domanda`);

--
-- Индексы таблицы `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`mail`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `domanda`
--
ALTER TABLE `domanda`
  MODIFY `id_domanda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT для таблицы `risposta`
--
ALTER TABLE `risposta`
  MODIFY `id_risposta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `risposta`
--
ALTER TABLE `risposta`
  ADD CONSTRAINT `risposta_ibfk_1` FOREIGN KEY (`mail_utente`) REFERENCES `utente` (`mail`),
  ADD CONSTRAINT `risposta_ibfk_2` FOREIGN KEY (`id_domanda`) REFERENCES `domanda` (`id_domanda`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
