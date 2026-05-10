--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Homebrew)
-- Dumped by pg_dump version 15.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: PasswordReset; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."PasswordReset" (id, email, otp, "resetToken", "expiredAt", "createdAt") VALUES (12, 'vyuser002@yopmail.com', '311899', NULL, '2026-04-14 16:15:33.819', '2026-04-14 16:10:33.823');
INSERT INTO public."PasswordReset" (id, email, otp, "resetToken", "expiredAt", "createdAt") VALUES (13, 'vyuser002@yopmail.com', '993495', NULL, '2026-04-14 16:20:48.599', '2026-04-14 16:15:48.6');
INSERT INTO public."PasswordReset" (id, email, otp, "resetToken", "expiredAt", "createdAt") VALUES (14, 'vyuser002@yopmail.com', '989792', NULL, '2026-04-14 16:21:49.12', '2026-04-14 16:16:49.12');
INSERT INTO public."PasswordReset" (id, email, otp, "resetToken", "expiredAt", "createdAt") VALUES (15, 'vyuser002@yopmail.com', '980907', NULL, '2026-04-14 16:23:26.343', '2026-04-14 16:18:26.344');
INSERT INTO public."PasswordReset" (id, email, otp, "resetToken", "expiredAt", "createdAt") VALUES (16, 'vyuser002@yopmail.com', '402192', NULL, '2026-04-14 16:38:35.97', '2026-04-14 16:33:35.97');
INSERT INTO public."PasswordReset" (id, email, otp, "resetToken", "expiredAt", "createdAt") VALUES (19, 'vyuser001@yopmail.com', '337568', NULL, '2026-04-25 06:08:25.498', '2026-04-25 06:03:25.503');


--
-- Data for Name: Voucher; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Voucher" (id, code, type, value, "maxDiscount", "usageLimit", "usedCount", "startDate", "endDate", status, "createdAt") VALUES (2, 'FLASH20', 'PERCENT', 20, 50000, 22, 0, '2026-04-30 11:20:42.432', '2026-05-30 11:20:57', 'ACTIVE', '2026-04-30 11:21:04.381');
INSERT INTO public."Voucher" (id, code, type, value, "maxDiscount", "usageLimit", "usedCount", "startDate", "endDate", status, "createdAt") VALUES (4, 'SUMMER70', 'FIXED', 70000, NULL, 2, 0, '2026-05-03 09:43:36', '2026-05-16 09:43:39', 'ACTIVE', '2026-05-01 09:43:45.846');
INSERT INTO public."Voucher" (id, code, type, value, "maxDiscount", "usageLimit", "usedCount", "startDate", "endDate", status, "createdAt") VALUES (7, 'VIP200', 'FIXED', 20000, 5, 20, 0, '2026-06-01 09:46:37', '2026-06-30 09:46:40', 'ACTIVE', '2026-05-01 09:46:49.013');
INSERT INTO public."Voucher" (id, code, type, value, "maxDiscount", "usageLimit", "usedCount", "startDate", "endDate", status, "createdAt") VALUES (5, 'EXPIRED10', 'FIXED', 10000, NULL, 5, 0, '2026-04-30 17:00:00', '2026-05-01 16:59:59.999', 'ACTIVE', '2026-05-01 09:45:01.204');
INSERT INTO public."Voucher" (id, code, type, value, "maxDiscount", "usageLimit", "usedCount", "startDate", "endDate", status, "createdAt") VALUES (6, 'EXPIRED50', 'FIXED', 50000, NULL, 50, 0, '2026-04-30 17:00:00', '2026-05-02 16:59:59.999', 'ACTIVE', '2026-05-01 09:45:36.147');
INSERT INTO public."Voucher" (id, code, type, value, "maxDiscount", "usageLimit", "usedCount", "startDate", "endDate", status, "createdAt") VALUES (1, 'SUMMER50', 'FIXED', 50000, NULL, 100, 0, '2026-04-29 17:00:00', '2026-05-01 16:59:59.999', 'ACTIVE', '2026-04-30 10:58:31.441');
INSERT INTO public."Voucher" (id, code, type, value, "maxDiscount", "usageLimit", "usedCount", "startDate", "endDate", status, "createdAt") VALUES (3, 'WELCOME10', 'FIXED', 10000, NULL, 1, 1, '2026-04-30 17:00:00', '2026-05-02 16:59:59.999', 'INACTIVE', '2026-04-30 17:23:30.164');


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.services (id, name, description, price, duration, "imageUrl", "createdAt", status) VALUES (4, 'Body Massage', 'Massage toàn thân thư giãn, giảm stress', 300000.000000000000000000000000000000, 90, 'https://res.cloudinary.com/dtilquvpk/image/upload/v1774589398/nestjs_uploads/sqfq6o94zfm2uwdye81x.png', '2026-03-26 04:42:50.639', 'ACTIVE');
INSERT INTO public.services (id, name, description, price, duration, "imageUrl", "createdAt", status) VALUES (1, 'Hair Spa', 'Dưỡng tóc chuyên sâu, phục hồi tóc hư tổn', 150000.000000000000000000000000000000, 45, 'https://res.cloudinary.com/dtilquvpk/image/upload/v1774589434/nestjs_uploads/ueavl3ypisws8epgodra.png', '2026-03-12 07:20:17.159', 'ACTIVE');
INSERT INTO public.services (id, name, description, price, duration, "imageUrl", "createdAt", status) VALUES (5, 'Nail Care', 'Chăm sóc móng tay, móng chân chuyên nghiệp', 100000.000000000000000000000000000000, 30, 'https://res.cloudinary.com/dtilquvpk/image/upload/v1774501263/nestjs_uploads/tvqpzssj5ap0cnmetcsq.png', '2026-03-26 05:01:04.836', 'ACTIVE');
INSERT INTO public.services (id, name, description, price, duration, "imageUrl", "createdAt", status) VALUES (2, 'Skin Whitening', 'Liệu trình làm trắng da an toàn và hiệu quả', 400000.000000000000000000000000000000, 75, 'https://res.cloudinary.com/dtilquvpk/image/upload/v1774589823/nestjs_uploads/winthgbjpselyp2tick3.png', '2026-03-12 07:21:32.503', 'ACTIVE');
INSERT INTO public.services (id, name, description, price, duration, "imageUrl", "createdAt", status) VALUES (3, 'Facial Treatment', 'Chăm sóc da mặt chuyên sâu, giúp da sáng và mịn hơn', 200000.000000000000000000000000000000, 60, 'https://res.cloudinary.com/dtilquvpk/image/upload/v1774589356/nestjs_uploads/qgum8ndrn3mxarnlq7d5.png', '2026-03-26 04:41:56.452', 'ACTIVE');
INSERT INTO public.services (id, name, description, price, duration, "imageUrl", "createdAt", status) VALUES (7, '1241241241', '124124124124124124124124', 12431241.000000000000000000000000000000, 60, 'https://res.cloudinary.com/dtilquvpk/image/upload/v1777199379/nestjs_uploads/oafhiyajni9hsya0lgkq.jpg', '2026-04-26 10:29:39.937', 'INACTIVE');
INSERT INTO public.services (id, name, description, price, duration, "imageUrl", "createdAt", status) VALUES (6, '123abca5555', 'Asfasfasfasf Asfasfasfasf asf', 1200000.000000000000000000000000000000, 50, 'https://res.cloudinary.com/dtilquvpk/image/upload/v1777200463/nestjs_uploads/rbnt6lavcw97kuacuwxe.jpg', '2026-04-26 10:22:15.529', 'INACTIVE');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (4, 'User001', 'user001@gmail.com', '$2b$10$9sRiONuFOjvWksiK9.LlQuUM9lJ6nUIePmxRaHaBahfm1UekcwJX.', NULL, '2026-03-27 06:07:17.225', 'USER', 'ACTIVE', NULL);
INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (8, 'VyUser002', 'vyuser002@yopmail.com', '$2b$10$yV41zi.lCskz9g/C7FKtbu9uqp4kFKk8GkTLlA9iDaG9wJA8Zj9le', '09125124124', '2026-04-07 13:03:24.909', 'USER', 'ACTIVE', NULL);
INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (11, 'Staff 003', 'staff003@yopmail.com', '$2b$10$rJR55v7f7R3.cKCuHVPGBuCh62cypccdte96c5uEs3msTxDt4vsfK', NULL, '2026-04-28 09:15:51.467', 'STAFF', 'ACTIVE', NULL);
INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (6, 'Staff 002', 'staff002@yopmail.com', '$2b$10$Yw6yt.7T2CWfw.rdNATyF.maInZUpa3jnarfLSVnRG6RBM3R0hEpG', NULL, '2026-03-30 18:29:24.356', 'STAFF', 'ACTIVE', NULL);
INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (1, 'Vy', 'test@gmail.com', '$2b$10$J7WfDqRmNjFRJAQYmGQSKeuzlUDTX7lyvg92xAI29fW1lJQJhT/Ie', NULL, '2026-03-11 09:05:12.916', 'USER', 'INACTIVE', NULL);
INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (3, 'Admin', 'admin@gmail.com', '$2b$10$XMgM74M9csPKYJfEnAUApO5rHF96LNq4qjWK7U3jXBoNfArjOz4T6', '1234567890', '2026-03-11 09:15:05.022', 'ADMIN', 'ACTIVE', '80cf5d55becae2c284692e1bdaf9e0eebb213181aaa303864ad746ef74184a73cde72578066795f982e0b98f34bf8523d7fd5672135cc1e57b3184de96336b183db1d401ba30a8c5f4116acab4f3487e');
INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (5, 'Staff 001', 'staff001@yopmail.com', '$2b$10$rPmZvKuBgwR3j4scec7oWevc9SRNXNS1RO/QSd1rcfOF6gdyI4p8q', NULL, '2026-03-30 18:28:09.071', 'STAFF', 'ACTIVE', NULL);
INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (7, 'VyUser001', 'vyuser001@yopmail.com', '$2b$10$np2o0GF3Yd2FZa2twXrZHeSR2OKjot6q/rjP2EBJZkRrjSn/7uyP.', NULL, '2026-04-07 13:01:36.381', 'USER', 'ACTIVE', NULL);
INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (9, 'Vyuser004', 'vyuser004@yopmail.com', '$2b$10$Ce6Mfv/lgm3OjPSeSBijKe4BP4JIItdwPUT3xrD3yyXn2UDyVcZZu', NULL, '2026-04-11 14:20:43.43', 'USER', 'ACTIVE', NULL);
INSERT INTO public.users (id, name, email, password, phone, "createdAt", role, status, "deviceToken") VALUES (10, 'vyuser005', 'vyuser005@yopmail.com', '$2b$10$l3E9afbvjXKw5Zsi6rVgi.r3LVMlZ.qySYAlWG258wJAP89zqsLgi', NULL, '2026-04-11 14:50:41.719', 'USER', 'ACTIVE', NULL);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (51, 8, 5, '2026-04-28 09:00:00', '2026-04-28 09:00:00', 'DONE', '2026-04-27 19:44:51.694', 11, 0, 100000, 100000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (39, 8, 4, '2026-04-23 12:00:00', '2026-04-23 12:00:00', 'DONE', '2026-04-23 08:48:08.281', 6, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (50, 8, 4, '2026-04-26 10:00:00', '2026-04-26 10:00:00', 'PENDING', '2026-04-26 09:08:29.121', NULL, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (4, 4, 2, '2026-03-30 12:00:00', '2026-03-30 12:00:00', 'CANCELLED', '2026-03-30 07:21:28.371', NULL, 0, 400000, 400000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (38, 8, 3, '2026-04-23 11:00:00', '2026-04-23 11:00:00', 'CANCELLED', '2026-04-23 08:47:38.242', NULL, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (49, 8, 3, '2026-04-26 11:00:00', '2026-04-26 11:00:00', 'PENDING', '2026-04-26 09:07:16.888', NULL, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (48, 8, 5, '2026-04-26 13:00:00', '2026-04-26 13:00:00', 'PENDING', '2026-04-26 08:57:55.438', NULL, 0, 100000, 100000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (28, 8, 4, '2026-04-18 11:00:00', '2026-04-18 11:00:00', 'CONFIRMED', '2026-04-18 07:13:50.563', 5, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (16, 10, 4, '2026-04-12 04:00:00', '2026-04-12 04:00:00', 'DONE', '2026-04-11 14:51:35.923', 5, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (27, 8, 4, '2026-04-17 13:00:00', '2026-04-17 13:00:00', 'PENDING', '2026-04-17 09:59:25.255', NULL, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (15, 10, 4, '2026-04-14 05:00:00', '2026-04-14 05:00:00', 'DONE', '2026-04-11 14:51:20.12', 6, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (14, 10, 1, '2026-04-12 08:00:00', '2026-04-12 08:00:00', 'DONE', '2026-04-11 14:51:06.755', 6, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (47, 7, 4, '2026-04-26 12:00:00', '2026-04-26 12:00:00', 'PENDING', '2026-04-26 08:45:12.598', NULL, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (46, 7, 5, '2026-04-26 11:00:00', '2026-04-26 11:00:00', 'PENDING', '2026-04-26 08:44:26.534', NULL, 0, 100000, 100000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (26, 8, 4, '2026-04-17 12:00:00', '2026-04-17 12:00:00', 'CONFIRMED', '2026-04-17 09:58:13.461', 6, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (25, 8, 1, '2026-04-17 13:00:00', '2026-04-17 13:00:00', 'PENDING', '2026-04-17 09:57:14.089', NULL, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (55, 7, 4, '2026-05-01 09:00:00', '2026-05-01 09:00:00', 'DONE', '2026-04-30 17:23:56.917', 6, 10000, 290000, 300000, 'WELCOME10');
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (45, 7, 5, '2026-04-26 09:00:00', '2026-04-26 09:00:00', 'CANCELLED', '2026-04-26 08:32:54.248', NULL, 0, 100000, 100000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (13, 9, 1, '2026-04-13 08:00:00', '2026-04-13 08:00:00', 'DONE', '2026-04-11 14:34:49.168', 5, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (36, 8, 4, '2026-04-23 10:00:00', '2026-04-23 10:00:00', 'CONFIRMED', '2026-04-23 08:44:00.269', 5, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (35, 7, 5, '2026-04-23 10:00:00', '2026-04-23 10:00:00', 'DONE', '2026-04-23 08:40:24.308', 5, 0, 100000, 100000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (12, 9, 3, '2026-04-12 05:00:00', '2026-04-12 05:00:00', 'DONE', '2026-04-11 14:34:32.246', 5, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (3, 4, 5, '2026-03-31 07:00:00', '2026-03-31 07:00:00', 'DONE', '2026-03-30 07:18:58.726', 5, 0, 100000, 100000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (34, 8, 4, '2026-04-19 11:00:00', '2026-04-19 11:00:00', 'CONFIRMED', '2026-04-19 07:50:52.349', 5, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (33, 8, 1, '2026-04-19 07:00:00', '2026-04-19 07:00:00', 'DONE', '2026-04-18 18:31:20.621', 5, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (32, 8, 1, '2026-04-18 12:00:00', '2026-04-18 12:00:00', 'DONE', '2026-04-18 07:59:18.924', 5, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (24, 8, 1, '2026-04-17 12:00:00', '2026-04-17 12:00:00', 'PENDING', '2026-04-17 09:56:03.745', NULL, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (2, 4, 1, '2026-03-29 11:00:00', '2026-03-29 11:00:00', 'DONE', '2026-03-29 10:01:24.166', 5, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (1, 4, 4, '2026-03-29 11:00:00', '2026-03-29 11:00:00', 'CANCELLED', '2026-03-29 10:00:52.794', NULL, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (23, 8, 2, '2026-04-17 11:00:00', '2026-04-17 11:00:00', 'CANCELLED', '2026-04-17 09:54:36.265', NULL, 0, 400000, 400000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (52, 7, 4, '2026-05-01 02:00:00', '2026-05-01 02:00:00', 'CANCELLED', '2026-04-30 16:55:39.238', NULL, 50000, 250000, 300000, 'SUMMER50');
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (22, 8, 3, '2026-04-17 10:00:00', '2026-04-17 10:00:00', 'CANCELLED', '2026-04-17 09:54:03.657', NULL, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (21, 4, 3, '2026-04-15 13:00:00', '2026-04-15 13:00:00', 'PENDING', '2026-04-15 09:20:16.945', NULL, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (31, 8, 3, '2026-04-18 10:00:00', '2026-04-18 10:00:00', 'CONFIRMED', '2026-04-18 07:19:06.676', 5, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (20, 4, 3, '2026-04-15 12:00:00', '2026-04-15 12:00:00', 'PENDING', '2026-04-15 09:20:09.396', NULL, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (30, 8, 2, '2026-04-18 08:00:00', '2026-04-18 08:00:00', 'CANCELLED', '2026-04-18 07:15:07.262', NULL, 0, 400000, 400000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (29, 8, 1, '2026-04-18 11:00:00', '2026-04-18 11:00:00', 'CONFIRMED', '2026-04-18 07:14:50.26', 6, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (19, 4, 3, '2026-04-15 10:00:00', '2026-04-15 10:00:00', 'PENDING', '2026-04-15 09:20:03.1', NULL, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (18, 8, 4, '2026-04-15 06:00:00', '2026-04-15 06:00:00', 'PENDING', '2026-04-14 16:52:45.685', NULL, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (11, 8, 2, '2026-04-08 12:00:00', '2026-04-08 12:00:00', 'DONE', '2026-04-07 13:04:17.896', 6, 0, 400000, 400000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (10, 8, 5, '2026-04-08 05:00:00', '2026-04-08 05:00:00', 'DONE', '2026-04-07 13:03:56.349', 5, 0, 100000, 100000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (9, 4, 4, '2026-04-05 13:00:00', '2026-04-05 13:00:00', 'DONE', '2026-04-05 09:18:07.993', 5, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (54, 7, 1, '2026-05-01 04:00:00', '2026-05-01 04:00:00', 'DONE', '2026-04-30 17:22:54.464', 11, 30000, 120000, 150000, 'FLASH20');
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (8, 4, 2, '2026-04-05 12:00:00', '2026-04-05 12:00:00', 'CANCELLED', '2026-04-05 09:08:10.328', NULL, 0, 400000, 400000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (53, 7, 2, '2026-05-01 03:00:00', '2026-05-01 03:00:00', 'CANCELLED', '2026-04-30 17:19:42.547', NULL, 50000, 350000, 400000, 'FLASH20');
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (7, 4, 4, '2026-04-02 08:00:00', '2026-04-02 08:00:00', 'DONE', '2026-04-01 12:09:55.481', 5, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (6, 4, 3, '2026-04-01 13:00:00', '2026-04-01 13:00:00', 'DONE', '2026-04-01 12:09:24.218', 6, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (57, 8, 4, '2026-05-06 09:00:00', '2026-05-06 09:00:00', 'PENDING', '2026-05-06 08:14:08.96', NULL, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (5, 4, 4, '2026-03-30 12:00:00', '2026-03-30 12:00:00', 'DONE', '2026-03-30 09:01:24.764', NULL, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (56, 7, 2, '2026-05-01 13:00:00', '2026-05-01 13:00:00', 'DONE', '2026-04-30 17:35:42.415', 11, 0, 400000, 400000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (40, 8, 4, '2026-04-23 13:00:00', '2026-04-23 13:00:00', 'DONE', '2026-04-23 08:48:37.003', 5, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (37, 8, 4, '2026-04-23 11:00:00', '2026-04-23 11:00:00', 'DONE', '2026-04-23 08:46:34.848', 6, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (44, 7, 4, '2026-04-26 13:00:00', '2026-04-26 13:00:00', 'PENDING', '2026-04-26 08:32:36.157', NULL, 0, 300000, 300000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (43, 7, 1, '2026-04-25 11:00:00', '2026-04-25 11:00:00', 'PENDING', '2026-04-25 07:31:48.839', NULL, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (42, 8, 1, '2026-04-24 11:00:00', '2026-04-24 11:00:00', 'PENDING', '2026-04-24 10:01:18.298', NULL, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (41, 8, 3, '2026-04-23 12:00:00', '2026-04-23 12:00:00', 'PENDING', '2026-04-23 11:53:27.641', NULL, 0, 200000, 200000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (58, 8, 5, '2026-05-06 13:00:00', '2026-05-06 13:00:00', 'PENDING', '2026-05-06 08:15:40.973', NULL, 0, 100000, 100000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (17, 8, 1, '2026-04-14 11:00:00', '2026-04-14 11:00:00', 'CANCELLED', '2026-04-14 09:56:39.131', NULL, 0, 150000, 150000, NULL);
INSERT INTO public.appointments (id, "userId", "serviceId", "appointmentDate", "appointmentTime", status, "createdAt", "staffId", discount, "finalPrice", "originalPrice", "voucherCode") VALUES (59, 8, 2, '2026-05-06 12:00:00', '2026-05-06 12:00:00', 'CONFIRMED', '2026-05-06 08:15:51.637', NULL, 0, 400000, 400000, NULL);


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (12, 3, 'Booking Cancelled', true, '2026-04-18 07:17:12.71', 'VyUser002 cancelled Skin Whitening at 15:00', '{"appointmentId": 30}', 'BOOKING_CANCELLED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (11, 3, 'New Appointment', true, '2026-04-18 07:15:07.284', 'VyUser002 booked Skin Whitening on 18/04 at 15:00', '{"appointmentId": 30}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (10, 3, 'New Appointment', true, '2026-04-18 07:14:50.275', 'VyUser002 booked Hair Spa on 18/04 at 18:00', '{"appointmentId": 29}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (9, 3, 'New Appointment', true, '2026-04-18 07:13:50.584', 'VyUser002 booked Body Massage on 18/04 at 18:00', '{"appointmentId": 28}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (14, 3, 'New Appointment', true, '2026-04-18 07:59:19.061', 'VyUser002 booked Hair Spa on 18/04 at 19:00', '{"appointmentId": 32}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (22, 5, 'New Assignment', true, '2026-04-18 19:00:55.13', 'You have a Hair Spa appointment at 19:00', '{"appointmentId": 32}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (13, 3, 'New Appointment', true, '2026-04-18 07:19:06.709', 'VyUser002 booked Facial Treatment on 18/04 at 17:00', '{"appointmentId": 31}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (2, 3, '📅 New Appointment', true, '2026-04-17 09:54:03.691', 'VyUser002 booked Facial Treatment on 17/04 at 17:00', '{"appointmentId": 22}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (3, 3, '📅 New Appointment', true, '2026-04-17 09:54:36.283', 'VyUser002 booked Skin Whitening on 17/04 at 18:00', '{"appointmentId": 23}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (4, 3, '📅 New Appointment', true, '2026-04-17 09:56:03.758', 'VyUser002 booked Hair Spa on 17/04 at 19:00', '{"appointmentId": 24}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (5, 3, '📅 New Appointment', true, '2026-04-17 09:57:14.114', 'VyUser002 booked Hair Spa on 17/04 at 20:00', '{"appointmentId": 25}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (6, 3, '📅 New Appointment', true, '2026-04-17 09:58:13.475', 'VyUser002 booked Body Massage on 17/04 at 19:00', '{"appointmentId": 26}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (7, 3, 'New Appointment', true, '2026-04-17 09:59:25.268', 'VyUser002 booked Body Massage on 17/04 at 20:00', '{"appointmentId": 27}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (8, 3, 'Booking Cancelled', true, '2026-04-17 10:01:04.913', 'VyUser002 cancelled Skin Whitening at 18:00', '{"appointmentId": 23}', 'BOOKING_CANCELLED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (19, 3, 'New Appointment', true, '2026-04-18 18:31:20.658', 'VyUser002 booked Hair Spa on 19/04 at 14:00', '{"appointmentId": 33}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (16, 8, 'Booking Confirmed', true, '2026-04-18 09:39:54.058', 'Facial Treatment on 18/04 at 17:00 has been confirmed', '{"appointmentId": 31}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (15, 8, 'Booking Confirmed', true, '2026-04-18 09:39:44.482', 'Hair Spa on 18/04 at 19:00 has been confirmed', '{"appointmentId": 32}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (17, 8, 'Booking Confirmed', true, '2026-04-18 09:40:03.673', 'Body Massage on 17/04 at 19:00 has been confirmed', '{"appointmentId": 26}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (18, 8, 'Booking Confirmed', true, '2026-04-18 09:40:08.621', 'Body Massage on 18/04 at 18:00 has been confirmed', '{"appointmentId": 28}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (21, 6, 'New Assignment', false, '2026-04-18 19:00:52.962', 'You have a Hair Spa appointment at 19:00', '{"appointmentId": 32}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (23, 5, 'New Assignment', true, '2026-04-18 19:01:12.991', 'You have a Facial Treatment appointment at 17:00', '{"appointmentId": 31}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (24, 3, 'Appointment Completed', false, '2026-04-18 19:03:21.675', 'Staff 001 completed Hair Spa', '{"appointmentId": 33}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (25, 3, 'Appointment Completed', false, '2026-04-18 19:04:28.48', 'Staff 001 completed Hair Spa on 18/04 at 19:00', '{"appointmentId": 32}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (27, 3, 'New Appointment', false, '2026-04-19 07:50:52.377', 'VyUser002 booked Body Massage on 19/04 at 18:00', '{"appointmentId": 34}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (29, 6, 'New Assignment', false, '2026-04-23 08:21:57.919', 'You have a Body Massage appointment on 19/04 at 18:00', '{"appointmentId": 34}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (30, 5, 'New Assignment', false, '2026-04-23 08:22:00.753', 'You have a Body Massage appointment on 19/04 at 18:00', '{"appointmentId": 34}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (31, 3, 'New Appointment', false, '2026-04-23 08:40:24.327', 'VyUser001 booked Nail Care on 23/04 at 17:00', '{"appointmentId": 35}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (32, 3, 'New Appointment', false, '2026-04-23 08:44:00.288', 'VyUser002 booked Body Massage on 23/04 at 17:00', '{"appointmentId": 36}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (33, 8, 'Booking Confirmed', false, '2026-04-23 08:44:31.271', 'Body Massage on 23/04 at 17:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 36}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (34, 7, 'Booking Confirmed', false, '2026-04-23 08:44:33.952', 'Nail Care on 23/04 at 17:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 35}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (35, 5, 'New Assignment', false, '2026-04-23 08:45:01.091', 'You have a Nail Care appointment on 23/04 at 17:00', '{"appointmentId": 35}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (36, 3, 'New Appointment', false, '2026-04-23 08:46:34.89', 'VyUser002 booked Body Massage on 23/04 at 18:00', '{"appointmentId": 37}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (37, 8, 'Booking Confirmed', false, '2026-04-23 08:46:42.53', 'Body Massage on 23/04 at 18:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 37}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (38, 3, 'New Appointment', false, '2026-04-23 08:47:38.27', 'VyUser002 booked Facial Treatment on 23/04 at 18:00', '{"appointmentId": 38}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (39, 3, 'New Appointment', false, '2026-04-23 08:48:08.303', 'VyUser002 booked Body Massage on 23/04 at 19:00', '{"appointmentId": 39}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (40, 3, 'Booking Cancelled', false, '2026-04-23 08:48:17.495', 'VyUser002 cancelled Facial Treatment on 23/04 at 18:00', '{"appointmentId": 38}', 'BOOKING_CANCELLED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (41, 3, 'New Appointment', false, '2026-04-23 08:48:37.023', 'VyUser002 booked Body Massage on 23/04 at 20:00', '{"appointmentId": 40}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (42, 8, 'Booking Confirmed', false, '2026-04-23 08:49:04.144', 'Body Massage on 23/04 at 19:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 39}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (26, 8, 'Booking Confirmed', true, '2026-04-19 06:11:30.998', 'Hair Spa on 18/04 at 18:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 29}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (20, 8, 'Booking Confirmed', true, '2026-04-18 18:42:49.436', 'Hair Spa on 19/04 at 14:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 33}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (28, 8, 'Booking Confirmed', true, '2026-04-23 08:21:30.187', 'Body Massage on 19/04 at 18:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 34}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (43, 8, 'Booking Confirmed', false, '2026-04-23 08:49:11.759', 'Body Massage on 23/04 at 20:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 40}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (44, 5, 'New Assignment', false, '2026-04-23 08:49:25.505', 'You have a Body Massage appointment on 23/04 at 19:00', '{"appointmentId": 39}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (45, 6, 'New Assignment', false, '2026-04-23 08:56:49.749', 'You have a Body Massage appointment on 23/04 at 19:00', '{"appointmentId": 39}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (46, 6, 'New Assignment', false, '2026-04-23 11:30:33.041', 'You have a Body Massage appointment on 23/04 at 19:00', '{"appointmentId": 39}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (47, 5, 'New Assignment', false, '2026-04-23 11:30:35.862', 'You have a Body Massage appointment on 23/04 at 19:00', '{"appointmentId": 39}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (48, 3, 'New Appointment', false, '2026-04-23 11:53:27.672', 'VyUser002 booked Facial Treatment on 23/04 at 19:00', '{"appointmentId": 41}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (49, 3, 'Booking Cancelled', false, '2026-04-23 15:15:49.117', 'VyUser002 cancelled Hair Spa on 14/04 at 18:00', '{"appointmentId": 17}', 'BOOKING_CANCELLED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (51, 3, 'Tin nhắn mới', false, '2026-04-23 16:02:49.393', 'Hồi', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (52, 5, 'Tin nhắn mới', false, '2026-04-23 16:03:36.51', 'Hiii', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (55, 3, 'Tin nhắn mới', false, '2026-04-23 16:04:02.612', 'Abc', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (60, 6, 'New Assignment', false, '2026-04-23 16:32:37.014', 'You have a Body Massage appointment on 23/04 at 19:00', '{"appointmentId": 39}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (61, 5, 'New Assignment', false, '2026-04-23 16:32:40.113', 'You have a Body Massage appointment on 23/04 at 20:00', '{"appointmentId": 40}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (62, 3, 'Appointment Completed', false, '2026-04-23 16:33:02.655', 'Staff 002 completed Body Massage on 23/04 at 19:00', '{"appointmentId": 39}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (63, 3, 'Appointment Completed', false, '2026-04-23 16:36:08.175', 'Staff 001 completed Nail Care on 23/04 at 17:00', '{"appointmentId": 35}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (56, 5, 'Tin nhắn mới', true, '2026-04-23 16:04:27.891', 'Asf', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (58, 5, 'Tin nhắn mới', true, '2026-04-23 16:04:35.981', 'Hello', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (54, 5, 'Tin nhắn mới', true, '2026-04-23 16:04:02.612', 'Abc', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (50, 5, 'Tin nhắn mới', true, '2026-04-23 16:02:49.393', 'Hồi', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (64, 3, 'New Appointment', false, '2026-04-24 10:01:18.334', 'VyUser002 booked Hair Spa on 24/04 at 18:00', '{"appointmentId": 42}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (59, 3, 'Tin nhắn mới', true, '2026-04-23 16:04:35.981', 'Hello', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (57, 3, 'Tin nhắn mới', true, '2026-04-23 16:04:27.891', 'Asf', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (53, 3, 'Tin nhắn mới', true, '2026-04-23 16:03:36.51', 'Hiii', '{"conversationId": "7"}', 'CHAT_MESSAGE');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (65, 3, 'New Appointment', false, '2026-04-25 07:31:48.898', 'VyUser001 booked Hair Spa on 25/04 at 18:00', '{"appointmentId": 43}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (66, 3, 'New Appointment', false, '2026-04-26 08:32:36.225', 'VyUser001 booked Body Massage on 26/04 at 20:00', '{"appointmentId": 44}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (67, 3, 'New Appointment', false, '2026-04-26 08:32:54.263', 'VyUser001 booked Nail Care on 26/04 at 16:00', '{"appointmentId": 45}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (68, 3, 'New Appointment', false, '2026-04-26 08:44:26.56', 'VyUser001 booked Nail Care on 26/04 at 18:00', '{"appointmentId": 46}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (69, 3, 'Booking Cancelled', false, '2026-04-26 08:45:04.711', 'VyUser001 cancelled Nail Care on 26/04 at 16:00', '{"appointmentId": 45}', 'BOOKING_CANCELLED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (70, 3, 'New Appointment', false, '2026-04-26 08:45:12.604', 'VyUser001 booked Body Massage on 26/04 at 19:00', '{"appointmentId": 47}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (71, 3, 'New Appointment', false, '2026-04-26 08:57:55.653', 'VyUser002 booked Nail Care on 26/04 at 20:00', '{"appointmentId": 48}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (72, 3, 'New Appointment', false, '2026-04-26 09:07:16.922', 'VyUser002 booked Facial Treatment on 26/04 at 18:00', '{"appointmentId": 49}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (73, 3, 'New Appointment', false, '2026-04-26 09:08:29.148', 'VyUser002 booked Body Massage on 26/04 at 17:00', '{"appointmentId": 50}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (74, 6, 'New Assignment', false, '2026-04-27 08:03:35.757', 'You have a Hair Spa appointment on 18/04 at 18:00', '{"appointmentId": 29}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (75, 6, 'New Assignment', false, '2026-04-27 08:05:25.652', 'You have a Body Massage appointment on 17/04 at 19:00', '{"appointmentId": 26}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (76, 5, 'New Assignment', false, '2026-04-27 08:05:34.617', 'You have a Body Massage appointment on 18/04 at 18:00', '{"appointmentId": 28}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (78, 6, 'New Assignment', false, '2026-04-27 08:06:43.092', 'You have a Body Massage appointment on 23/04 at 18:00', '{"appointmentId": 37}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (79, 3, 'New Appointment', false, '2026-04-27 19:44:51.732', 'VyUser002 booked Nail Care on 28/04 at 16:00', '{"appointmentId": 51}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (77, 5, 'New Assignment', true, '2026-04-27 08:06:18.953', 'You have a Body Massage appointment on 23/04 at 17:00', '{"appointmentId": 36}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (80, 3, 'New Appointment', false, '2026-04-30 16:55:39.285', 'VyUser001 booked Body Massage on 01/05 at 09:00', '{"appointmentId": 52}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (81, 3, 'Booking Cancelled', false, '2026-04-30 17:02:26.498', 'VyUser001 cancelled Body Massage on 01/05 at 09:00', '{"appointmentId": 52}', 'BOOKING_CANCELLED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (82, 3, 'New Appointment', false, '2026-04-30 17:19:42.591', 'VyUser001 booked Skin Whitening on 01/05 at 10:00', '{"appointmentId": 53}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (83, 3, 'New Appointment', false, '2026-04-30 17:22:54.494', 'VyUser001 booked Hair Spa on 01/05 at 11:00', '{"appointmentId": 54}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (84, 3, 'New Appointment', false, '2026-04-30 17:23:56.982', 'VyUser001 booked Body Massage on 01/05 at 16:00', '{"appointmentId": 55}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (85, 3, 'Booking Cancelled', false, '2026-04-30 17:26:13.351', 'VyUser001 cancelled Skin Whitening on 01/05 at 10:00', '{"appointmentId": 53}', 'BOOKING_CANCELLED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (86, 3, 'New Appointment', false, '2026-04-30 17:35:42.457', 'VyUser001 booked Skin Whitening on 01/05 at 20:00', '{"appointmentId": 56}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (87, 7, 'Booking Confirmed', false, '2026-04-30 18:56:08.315', 'Skin Whitening on 01/05 at 20:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 56}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (88, 11, 'New Assignment', false, '2026-04-30 18:56:15.797', 'You have a Skin Whitening appointment on 01/05 at 20:00', '{"appointmentId": 56}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (89, 3, 'Appointment Completed', false, '2026-04-30 18:56:18.457', 'Staff 003 completed Skin Whitening on 01/05 at 20:00', '{"appointmentId": 56}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (90, 3, 'Appointment Completed', false, '2026-04-30 18:56:25.569', 'Staff 001 completed Body Massage on 23/04 at 20:00', '{"appointmentId": 40}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (91, 3, 'Appointment Completed', false, '2026-04-30 18:56:30.866', 'Staff 002 completed Body Massage on 23/04 at 18:00', '{"appointmentId": 37}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (92, 7, 'Booking Confirmed', false, '2026-04-30 18:58:03.685', 'Hair Spa on 01/05 at 11:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 54}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (93, 11, 'New Assignment', false, '2026-04-30 18:58:08.657', 'You have a Hair Spa appointment on 01/05 at 11:00', '{"appointmentId": 54}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (94, 3, 'Appointment Completed', false, '2026-04-30 18:58:10.952', 'Staff 003 completed Hair Spa on 01/05 at 11:00', '{"appointmentId": 54}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (95, 7, 'Booking Confirmed', false, '2026-05-01 11:31:47.929', 'Body Massage on 01/05 at 16:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 55}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (96, 8, 'Booking Confirmed', false, '2026-05-01 11:31:52.153', 'Nail Care on 28/04 at 16:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 51}', 'BOOKING_CONFIRMED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (97, 6, 'New Assignment', false, '2026-05-01 11:32:06.89', 'You have a Body Massage appointment on 01/05 at 16:00', '{"appointmentId": 55}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (98, 11, 'New Assignment', false, '2026-05-01 11:32:09.539', 'You have a Nail Care appointment on 28/04 at 16:00', '{"appointmentId": 51}', 'BOOKING_ASSIGNED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (99, 3, 'Appointment Completed', false, '2026-05-01 11:32:12.205', 'Staff 003 completed Nail Care on 28/04 at 16:00', '{"appointmentId": 51}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (100, 3, 'Appointment Completed', false, '2026-05-01 11:32:14.665', 'Staff 002 completed Body Massage on 01/05 at 16:00', '{"appointmentId": 55}', 'BOOKING_COMPLETED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (101, 3, 'New Appointment', false, '2026-05-06 08:14:09.039', 'VyUser002 booked Body Massage on 06/05 at 16:00', '{"appointmentId": 57}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (102, 3, 'New Appointment', false, '2026-05-06 08:15:40.98', 'VyUser002 booked Nail Care on 06/05 at 20:00', '{"appointmentId": 58}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (103, 3, 'New Appointment', false, '2026-05-06 08:15:51.647', 'VyUser002 booked Skin Whitening on 06/05 at 19:00', '{"appointmentId": 59}', 'BOOKING_CREATED');
INSERT INTO public.notifications (id, "userId", title, "isRead", "createdAt", body, data, type) VALUES (104, 8, 'Booking Confirmed', true, '2026-05-06 08:24:51.296', 'Skin Whitening on 06/05 at 19:00 has been confirmed. Please arrive 5 minutes early.', '{"appointmentId": 59}', 'BOOKING_CONFIRMED');


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reviews (id, "userId", "serviceId", rating, comment, "createdAt", "appointmentId", tags) VALUES (4, 8, 5, 1, 'I’m going back to the house to go to the gym with the girls for the night so I’ll let you know if you need anything or do I need to get something ', '2026-04-15 07:53:59.498', 10, '{Friendly,Relaxing}');
INSERT INTO public.reviews (id, "userId", "serviceId", rating, comment, "createdAt", "appointmentId", tags) VALUES (5, 8, 2, 5, 'I’m sorry but it doesn’t work on me too but it will help for me but if it was for you then it was like I didn’t want you to do anything ', '2026-04-15 07:58:57.95', 11, '{Friendly,Kind}');
INSERT INTO public.reviews (id, "userId", "serviceId", rating, comment, "createdAt", "appointmentId", tags) VALUES (6, 4, 1, 5, 'I have to go to the store to get my nails done and I will be home in a few minutes and I will be home by the time you get home ', '2026-04-15 08:14:09.116', 2, '{Professional}');
INSERT INTO public.reviews (id, "userId", "serviceId", rating, comment, "createdAt", "appointmentId", tags) VALUES (7, 4, 4, 4, 'I have to go to the store to get my nails done and I will be home in a few minutes ', '2026-04-15 08:14:26.281', 9, '{Friendly}');
INSERT INTO public.reviews (id, "userId", "serviceId", rating, comment, "createdAt", "appointmentId", tags) VALUES (8, 4, 4, 5, 'I’m not sure if I can get a hold of you but I don’t know if I can get it done and I will ', '2026-04-15 08:15:46.319', 7, '{Friendly}');
INSERT INTO public.reviews (id, "userId", "serviceId", rating, comment, "createdAt", "appointmentId", tags) VALUES (9, 4, 5, 5, 'I’m going back in a little later today to get my nails done and I have a couple things for my parents and my ', '2026-04-15 08:16:13.739', 3, '{Friendly,Kind,Relaxing}');


--
-- Name: PasswordReset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PasswordReset_id_seq"', 19, true);


--
-- Name: Voucher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Voucher_id_seq"', 7, true);


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_id_seq', 59, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 104, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 9, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- PostgreSQL database dump complete
--

