CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS coches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand VARCHAR(100)     NOT NULL,
    model VARCHAR(100)     NOT NULL,
    version VARCHAR(255),
    seating_capacity INT,
    co2_emissions_grams_per_km INT
);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fea6fe21-bd95-4154-a783-829b05e11582', 'JEEP', 'Patriot', '2.0 CRD Limited', 5, 180);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('be2afbb5-abac-4aaf-97af-232099f56ea9', 'OPEL', 'Crossland X', '1.2 96kW 130CV Innovation Auto', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dad06827-5684-4ed9-be04-0a8cb55e40cd', 'SEAT', 'Alhambra', '2.0 TDI 177 CV StartStop Style DSG', 5, 154);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('aaaadd17-8bac-4a70-b8f3-66b8b9b39a1d', 'VOLVO', 'XC90', '2.0 T8 AWD Inscription Auto', 7, 50);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('82e7edbd-8680-407f-888a-797923b619bb', 'LAND-ROVER', 'Range Rover Sport', '3.0 TDV6 258cv HSE', 5, 194);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('780b65f1-f8cb-45d1-8e06-9cd439f57590', 'AUDI', 'Q3', 'S line 35 TDI 110kW 150CV S tronic', 5, 123);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('795c2a20-1a4c-4b32-9015-2e825bba9c38', 'HYUNDAI', 'Kona', '1.0 TGDI 48V Maxx 4X2', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('33601c48-89f8-4295-b851-36a8c6015cad', 'VOLKSWAGEN', 'Crafter', '35 Furgon BM TA L3H3 2.0TDI 103kW140CV', 3, 189);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('435177d0-881f-4155-a3d3-3a9116f32984', 'JAGUAR', 'Fpace', '2.0L i4D 132kW RSport Auto', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('523cf1dc-7d88-4816-882f-8b0fcd5507ea', 'VOLVO', 'XC90', '2.0 D5 AWD Momentum Auto', 7, 149);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9224664e-b0ff-47a2-9223-c446e3951f78', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 220 d 4MATIC', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a31ca7c6-a739-4206-aa25-2b4668d44ef9', 'OPEL', 'Grandland X', '1.2 Turbo 120 Aniversario', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('783a19e1-e15e-4539-ab77-522b91b277ba', 'OPEL', 'Crossland X', '1.6T 73kW 99CV Selective', 5, 102);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('97ea454b-8a6d-4704-8bba-075aa44839b7', 'HYUNDAI', 'Kona', 'KONA TGDI 1.0 120CV 4X2 KLASS', 5, 124);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3b107235-839e-44e7-80aa-4c81f629f3b6', 'BMW', 'X4', 'xDrive20d', 5, 132);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c55c5037-2398-4b58-80e4-0b8d543026a6', 'BMW', 'X2', 'sDrive18d', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4b78eb03-fc5c-4eaf-b0c9-79dbef8357c0', 'CUPRA', 'Formentor', '1.5 TSI 110kW 150 CV DSG', 5, 126);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6c8c67d3-d432-4436-94bb-1d0b4d3338aa', 'VOLKSWAGEN', 'Crafter', '35 Furgon BM TN L3H2 2.0TDI 103kW140CV', 3, 202);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('113a76d4-5ecb-4bad-8f2f-87778a481d76', 'VOLKSWAGEN', 'T-Cross', 'Advance 1.5 TSI 110kW 150CV DSG', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6a746f10-b24b-425c-bb50-fcfb74473f9f', 'BMW', 'X1', 'sDrive18d', 5, 128);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5bb858dd-3f51-4721-8a88-f92394eb0c28', 'FORD', 'Transit', '350 100cv L3 Ambiente Traccion Delantera', 3, 203);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7b434aec-44fa-4f8e-81ba-59259cd9be85', 'FIAT', '500X', 'Cross 1.0 Firefly T3 88KW 120 CV', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('865905d4-1263-47e5-a976-15fd85d883e8', 'VOLVO', 'XC90', '2.0 B5 D AWD Momentum Pro Auto', 7, 147);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c4f29dc1-315b-4d17-90eb-8146106697c4', 'VOLVO', 'V60', '2.0 D2 Momentum', 5, 101);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('67434281-6b41-46b8-8fa3-1fc0e5c68124', 'RENAULT', 'Kangoo Combi', 'Limited M1AF Blue dCi 70 kW 95 CV SS', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f9129661-ddce-4cd7-9108-031847050b85', 'MERCEDES-BENZ', 'Citan', '109 CDI Furgon Extralargo BE', 2, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e861f40d-9ac5-4c00-84f9-d2f48abdc11f', 'VOLVO', 'XC60', '2.0 B4 D Core Auto', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6378ff10-b699-48ad-85cf-1bd66557a387', 'LAND-ROVER', 'Freelander', '2.0TD4 E ', 5, 240);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e2610293-e97d-49f7-a145-c1841edf0d6a', 'SAAB', '9-3', 'Sport Hatch Linear Sport 1.9 TiD', 5, 159);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9a500bf6-27cc-4285-a1d2-102b5680a30d', 'VOLKSWAGEN', 'T-Roc', 'Sport 2.0 TDI 110kW 150CV', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('00aa7c04-09f7-4ece-aedf-7968e83b1571', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 350 d 4MATIC', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('13c67a69-50c9-4323-9013-5f919e7a7844', 'SSANGYONG', 'Tivoli', 'G16 Line 4x2', 5, 154);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c4e73872-2416-4695-b26a-dcb00ae1ed19', 'FORD', 'Puma', '1.5 Ecoblue 88kW 120cv Titanium', 5, 99);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b5e4de37-ae74-457d-ae1e-7b8a4746035b', 'CITROEN', 'C5 Aircross', 'PureTech 96kW 130CV SS C Series', 5, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3395143f-227d-47f2-8ed8-2fd952451e7a', 'MAZDA', 'CX-3', '2.0 G 89kW 121CV 2WD Evolution Design', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d21a767d-7729-47aa-9469-e88e5e6338c1', 'MAZDA', 'CX30', 'SKYACTIVG 2.0 90 kW 2WD Zenith', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b722fc27-cd20-46ff-92c6-c832b373daaa', 'FIAT', 'Punto', '1.3 Pop 75 CV Multijet E5', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5fb015f3-736f-4d45-ac2a-56af7751aae7', 'RENAULT', 'Master', 'Combi 9 L2H2 3500 E dCi 107kW 145CV', 9, 200);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6e8bb17b-3271-47a1-a91d-9690c6d164ef', 'FIAT', 'Talento', 'N1 1.0 Base Corto 1.6 MJet 88kW 120CV', 3, 170);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d25f2f01-af55-43ab-90e6-fe2c7df1babf', 'JEEP', 'Compass', '1.4 Mair 125kW Limited 4x4 ATX', 5, 160);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c7ef7acf-143d-42ee-b119-a5049ae477f2', 'AUDI', 'Q3', '40 TDI 140kW S tronic Quattro Advanced', 5, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c55cd6ff-00e1-4fb6-86b8-b4fe6edc4351', 'FIAT', '500', 'Dolcevita 1.0 Hybrid 51KW 70 CV', 4, 88);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f44e7d1f-2320-46e6-95a2-10f4a379ffbc', 'JAGUAR', 'XE', '2.0 Diesel 132kW RWD Prestige Auto', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dce4501f-00ab-4de2-86ee-4a4059fabd18', 'VOLKSWAGEN', 'Sharan', '2.0 TDI 140cv DSG Edition', 7, 149);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6b9bfd26-06f5-4c44-87ce-7a03d5cfe68f', 'JEEP', 'Renegade', 'Limited 1.6 Mjet 956kW 130CV 4x2', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fd57417a-56d7-4170-b53f-012fcde2064e', 'OPEL', 'Zafira Tourer', '2.0 CDTi SS Excellence', 7, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('10da90c8-fc2c-41a4-8177-e351fa4206c5', 'LAND-ROVER', 'Range Rover Sport', '3.0 SDV6 306cv HSE Dynamic', 5, 185);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('094515f7-d87a-4829-a994-a553974c4d7d', 'MERCEDES-BENZ', 'Clase GLK', 'GLK 250 CDI 4M Blue Efficiency', 5, 168);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3b98f7ee-d373-4a7a-9dc4-37d47857b2ae', 'KIA', 'Sorento', '2.5 CRDi EX2', 5, 226);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('37ca0950-28a4-4b6f-8412-553549f86b40', 'FORD', 'Grand C-Max', '1.6 TDCi 115 Trend', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5894a7ca-0801-46f2-b80e-be98acb87d44', 'AUDI', 'Q3', 'Advanced 35 TFSI 110kW 150CV', 5, 140);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e6f0b296-8c45-4686-8908-678bcee53987', 'ALFA ROMEO', 'Stelvio', '2.0 Gasolina 148kW 200CV Super Q4', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a68bda6b-3865-450b-806c-efeaaca06080', 'JAGUAR', 'E-Pace', '2.0D 110kW RDynamic S', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b2d67047-5ff1-4b30-82a0-14685dee2739', 'AUDI', 'A4', 'Avant 2.0 TDI 143cv DPF', 5, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2b5f2949-70fb-4d6e-b274-f7e41fb7fb9a', 'CHRYSLER', 'Sebring 200C', '2.0 CRD Touring', 5, 170);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1552b2f3-420a-41f5-a8d1-f2bc19c5c5bf', 'NISSAN', 'Almera', '2.2 dCi 112CV Line Up', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ad6e2ece-b76f-4773-a58d-05b64145cd65', 'OPEL', 'Grandland X', '1.2 Turbo Design Line', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('577d0b21-ab63-4f48-8aa8-560d2eb7fa0e', 'PEUGEOT', 'Expert', 'Furgon Pro 2.0 BlueHDi 120 SS Long', 2, 143);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8bd00a5b-1cb5-4c6c-9384-1032e0be583f', 'PEUGEOT', 'Expert', 'Furgon Pro 1.6 BlueHDi 70KW 95Standard', 2, 144);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4bbc77f3-7c82-47bd-be05-e2c955757f01', 'AUDI', 'Q2', 'Design 30 TFSI 85kW 116CV', 5, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ce175594-bf1f-46b1-81ff-c504016646db', 'SEAT', 'Exeo', 'ST 1.8 TSI 120 CV Reference', 5, 172);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('14a05d16-fa5d-423f-9bf8-7ef2b6660e18', 'VOLKSWAGEN', 'Crafter', '30 Furgon BM TN L3H2 2.0TDI 75kW 102CV', 3, 187);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('80083001-c327-43d3-b4cb-157613bfd6c7', 'OPEL', 'Mokka', '1.2 T 96kW 130 CV Business Elegance', 5, 103);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('cf4cc393-5c7a-40e3-9377-58fab28ee19c', 'RENAULT', 'Master', 'Fu. P L4H3 3500 RG E B dCi 121kW 165CV', 3, 225);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f19b917a-1357-4059-9f4f-a041915061c7', 'JEEP', 'Renegade', '1.6 Mjet 88kW 120CV Night Eagle 4x2', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e1d94f06-8e70-44b5-b064-30874aa6955c', 'MINI', 'CLUBMAN', 'ONE D', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('423bc05d-64ec-44a9-9aae-80fe9c880968', 'SEAT', 'Arona', '1.6 TDI 70kW 95CV Style Ecomotive', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0cae8e18-7598-42d0-b634-0ee43f453d85', 'FIAT', '500X', 'Urban 1.3 MultiJet 70KW 95 CV 4x2 SS', 5, 105);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('654358ac-a228-458a-b073-9f0a2b8a9758', 'FIAT', 'Linea', '1.4 16v 77cv Dynamic Gasolina Fire E5', 5, 148);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e59fa0fd-1f7a-44df-8872-329408c11f33', 'MERCEDES-BENZ', 'CLA', 'CLA 200', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c9afb8f4-2a48-4c06-a4d9-72cf704c40c2', 'CITROEN', 'Grand C4 Picasso', 'PureTech 130 SS 6v Feel Edition', 7, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('27412190-ece7-4c8e-839e-1e359d2287a1', 'RENAULT', 'Master', 'Furg. DC T L3H2 3500 B dCi 100kW 135CV', 6, 187);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('af3f005c-3d12-4ec0-a37c-3e79d51fa6de', 'BMW', 'X4', 'xDrive20d', 5, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4aa8c77b-6a59-46b9-b0a0-65b6981a0ff6', 'FORD', 'Ranger', '2.2 TDCi 118kW 4x4 Doble Cab. XL SS', 5, 184);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f9b1d0a8-4be4-4208-86c2-52f29b6ada50', 'ABARTH', '500', '1.4 16v TJet 595 107kW 145CV E6', 4, 155);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6fb94844-dc91-4c8c-b067-a9cbea67703f', 'OPEL', 'Mokka X', '1.4 T 103kW 140CV 4X2 SS Ultimate', 5, 140);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a9d83742-1c07-4dc4-af40-ef30b94a6fab', 'VOLKSWAGEN', 'Crafter', '30 Furgon BM TN L3H2 2.0TDI 103kW140CV', 3, 189);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9c55567c-6085-4b65-ba2e-ee72463d3f56', 'DACIA', 'Logan', 'Ambiance 1.2 16v 75cv E5', 5, 135);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e522b6e2-8fb9-4cc5-bcac-9c51a945d7b0', 'CUPRA', 'Formentor', '1.5 TSI 110kW 150 CV', 5, 123);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a62ec743-6bcd-4060-b55f-9b9058095db1', 'AUDI', 'Q3', '2.0 TDI 150CV', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('60aa8231-114a-4631-bd77-79d312738896', 'FIAT', '500X', 'Dolcevita Club 1.0 Firefly 88KW 120CV', 5, 130);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('29abca39-ec1b-4ae1-969b-094b367b3169', 'BMW', 'Serie 2', '220i', 4, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c8585281-1d90-4373-b0cb-0b4dc4eb8d5d', 'MERCEDES-BENZ', 'Clase GLA', 'GLA 220 d', 5, 145);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('00b8b557-b2b7-4d2f-870b-eb9571b712d2', 'VOLKSWAGEN', 'Arteon', 'RLine 2.0 TDI 110kW 150CV DSG', 5, 110);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0489f742-d0a5-4453-bf21-427e525e4a79', 'BMW', 'Serie 4', 'M4 CS', 4, 197);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c1af5130-6b26-4e4a-b599-16e39f10880d', 'FORD', 'Tourneo Courier', '1.5 TDCi 95cv Ambiente', 5, 104);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('38fc1e20-5415-46ff-925e-f0f833944703', 'PORSCHE', 'Panamera', '4S Diesel', 4, 176);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('25af89af-c653-431a-b99f-09d78a925c3f', 'AUDI', 'A7', 'Sportback 3.0 TDI 272 quat S tron S line', 4, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('49fece4a-6851-41d0-b52e-4bc4328dacbc', 'FIAT', '500', '1.2 8v 69 CV Lounge', 4, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ee7f77d2-0095-42e1-9428-883f9838ad08', 'JEEP', 'Grand Cherokee', '2.7 CRD Laredo', 5, 255);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('73a17476-dd5a-4686-9aa7-47efd1f6c0ea', 'VOLVO', 'XC40', '2.0 D3', 5, 128);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('89fabf7c-2ce3-4d20-8da7-791ef1af1af6', 'AUDI', 'Q3', 'Black line 35 TFSI 110kW 150CV S tron', 5, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dc536de0-7970-4dbc-9836-c2bff46f77a3', 'MERCEDES-BENZ', 'Citan', '111 CDI Tourer Plus Largo', 5, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('903a7f30-2f0f-47d4-bcfb-0f18c62a90a2', 'MERCEDES-BENZ', 'CLA', 'CLA 250 e', 5, 31);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f9b3eef6-c9a7-4195-9415-4b8c85eafa4f', 'LEXUS', 'IS', '300h F Sport  Navibox', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3b4dde48-3324-4aaa-ab72-9b9a8721f0e2', 'FIAT', 'Ducato', '33 Medio Techo Alto 2.0 Mjet 85kW 115CV', 3, 162);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6ef27d55-e7cd-41e2-8484-3e24f8387ae1', 'FIAT', '500C', '1.2 8v 69 CV Sport', 4, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('314ee6aa-04e9-4430-9945-a0620910a61e', 'DACIA', 'Dokker', 'Van Ambiance dCi 90', 2, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ad8f409a-90c3-43de-9738-8d58b39105dc', 'VOLKSWAGEN', 'Transporter', 'PRO Furgon Largo TM 2.0 TDI 114 BMT 2.8T', 3, 176);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1d67f092-770b-4fdc-8fbc-bf17f0395bd8', 'BMW', 'Serie 2', '218d', 4, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('691aea04-6d7b-4afe-87f4-d3ea56282471', 'SEAT', 'Ateca', '1.5 TSI 110kW 150CV StSp FR', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('39d2cce9-e4fc-4819-9682-dd6465082ff9', 'CUPRA', 'Formentor', '2.0 TDI 110kW 150 CV', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f7fb119d-9e84-47a2-9560-104427438894', 'ABARTH', '500', '595 Scorpioneoro 1.4 16v 121kW E6D', 4, 157);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5456c33d-f87e-45d9-b1f0-5175d73987e8', 'VOLKSWAGEN', 'T-Roc', 'Advance 1.6 TDI 85kW 115CV', 5, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('221599ad-cd91-485c-a605-c6171d71bafe', 'VOLVO', 'XC90', '2.0 T8 AWD Recharge Inscription Exp Auto', 7, 47);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0e5b04f9-e4f0-4ff6-87b6-8a25d2f61b04', 'FIAT', 'Doblo Cargo', 'Cargo Base 1.6 Multijet 105cv E5', 2, 143);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d905cffa-31a0-4b1c-be15-b0e5d03143ce', 'AUDI', 'Allroad Quattro', '3.0 TDI quattro tiptronic', 5, 232);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2b07c354-8c07-46a1-9cb0-069e41ffac16', 'AUDI', 'Allroad Quattro', '2.7 TDI quattro tiptronic DPF', 5, 229);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('88ae9922-b4b9-44b0-9c5f-300298eac3eb', 'SKODA', 'Octavia', 'Combi 2.0 TDI CR 184cv RS', 5, 117);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b5d604aa-7ef4-4f9d-b285-a64c9c32d016', 'PORSCHE', 'Cayenne', '4.8 S Tiptronic', 5, 245);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7f17fa4d-b21a-4976-838d-db59a83fe5da', 'FIAT', 'Punto', '1.3 Young 75 CV Multijet E5', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5396aa48-5e7a-4487-bb6d-8a93e55090f7', 'VOLKSWAGEN', 'T-Roc', 'Edition 1.6 TDI 85kW 115CV', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('717432eb-bdeb-481f-93ab-d88b4931d157', 'FIAT', '500', '1.2 8v 51kW 69CV Lounge', 4, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bb098c0e-5d20-45a4-8f9e-203c50d2c458', 'AUDI', 'Q3', 'Advanced 35 TDI 110kW 150CV S tronic', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fcd2e09a-7687-4af1-b1eb-c321e9121a22', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 140kW 190CV Executive RWD', 5, 138);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a6ffa7bc-e043-457f-bc0f-53b727cedec2', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 154kW 210CV Veloce Q4', 5, 146);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fce8692e-13af-43b1-9f16-442461017cc6', 'KIA', 'Picanto', '1.1 SOHC EX', 5, 124);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bea2769c-68ee-46de-b7c1-c8060077a9e5', 'PEUGEOT', '307 SW', '1.6 HDi 90 Pack', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9013ace4-9624-4a36-bb8d-0e7bebc18d9e', 'HYUNDAI', 'Kona', '1.0 TGDI Tecno 4X2', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ddacd817-b2bd-4ebe-b1ce-e73227b1eff8', 'JEEP', 'Compass', '1.6 Mjet 88kW Limited 4x2', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bdf6accb-8123-422b-a075-29f1c358c349', 'HONDA', 'HR-V', '1.5 iVTEC CVT Elegance', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7a414e9f-ad17-4c4b-82fc-26d20031878b', 'VOLKSWAGEN', 'New Beetle', '1.6 Auto', 4, 199);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6e3b6a6a-f3f4-4114-9ffe-cb5d96e63271', 'BMW', 'X1', 'sDrive20d EfficientDynamics Edition', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ba93e7a5-5e59-4c51-95c8-e29218ab3b1c', 'JAGUAR', 'E-Pace', '2.0D 110kW Chequered Flag 4WD Auto', 5, 158);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3e7e0e24-78cc-4459-b382-2a26a431e398', 'MERCEDES-BENZ', 'Citan', '109 CDI Tourer Select Largo', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('99597775-4675-4946-843e-cb3448629cd4', 'VOLVO', 'XC40', '2.0 D3 Momentum', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('093593a7-d58e-49cf-a6ac-a4c5064fef4f', 'SKODA', 'Superb', 'Combi 2.0 TDI 110KW 150cv Ambition', 5, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ba11cb41-811e-4431-aa52-2314a3b570a4', 'RENAULT', 'Grand Espace', 'Exception 2.0 dCi 175CV Auto', 6, 217);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8abd9654-81a1-4394-9824-72b3d214fead', 'CITROEN', 'Berlingo', 'Multispace 20 Aniv. PureTech 81KW110CV', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0b112148-215f-4617-b109-fa9d2a23723f', 'FIAT', 'Doblo Cargo', 'Base Maxi 1.6 Mjt 105 E5 Carga Aumentad', 2, 144);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9c157da8-7134-4e6b-8566-66f47e1dc03b', 'VOLKSWAGEN', 'Arteon', 'Elegance 2.0 TDI 110kW 150CV', 5, 107);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c00600ed-5d80-4ded-b7d7-c19ad5e85eaa', 'VOLVO', 'XC90', '2.0 D5 AWD Inscription Auto', 7, 152);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ebf4e02f-152c-4d16-bac2-9d290e8e1198', 'DS', 'DS 3', 'EHDI 90 Techno Style', 5, 95);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6ae19104-efc1-4ec9-83a4-aa54b93f6155', 'OPEL', 'Mokka', '1.4 T 4X2 SS Excellence', 5, 145);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('97fc18e9-d55c-40fc-83dc-2dc5d2592876', 'RENAULT', 'Kadjar', 'Intens Energy dCi 96kW 130CV', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b2f3e873-a5d8-49b7-9388-1d75a1f45a03', 'FORD', 'Transit Custom', 'Van 2.2 TDCI 125cv 330 L2 Trend', 3, 197);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7103fb36-6115-40a1-bb62-c1f3b01084fb', 'HYUNDAI', 'IONIQ', '1.6 GDI HEV Tecno DT', 5, 85);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b8ed9f9c-eac5-4496-ac16-8ad0ea5a7e86', 'PEUGEOT', 'Boxer', '435 L4 BHDI 121kW 165CV SS 6 Vel. MAN', 3, 186);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('edcd1053-8132-4acb-8505-683aa17aeac1', 'MINI', 'CLUBMAN', 'COOPER SD AUTO', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('453938c3-00ff-4d9f-8627-ab4e3219c1e0', 'OPEL', 'Grandland X', '1.2 Turbo Design Line', 5, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ed4c0082-dd32-43e7-868b-4cca99570bf5', 'KIA', 'Picanto', '1.0 CVVT 49kW 67CV Concept', 5, 101);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('18f2f294-3c68-490f-a45c-f31d08e43a69', 'FORD', 'Transit Courier', 'Kombi 1.5 TDCi 95cv Ambiente', 5, 104);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fc115487-0790-4990-bbbb-5fc840524861', 'VOLVO', 'V60', '2.0 D3 Momentum Pro', 5, 117);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4a2ccc7a-d3e6-49ae-b6ef-afa03b21086b', 'RENAULT', 'Grand Espace', '25 Aniversario 2.0 dCi 150CV FAP', 6, 193);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a85c508b-2e3c-4e78-815c-04c81aa0e88c', 'NISSAN', 'QASHQAI+2', '1.5 dCi ACENTA 4x2', 7, 149);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5aab48ce-c245-4573-a1fe-7a0d195d2e8d', 'HYUNDAI', 'Tucson', '1.7CRDi 104kW 141CV BD TecnoSky DCT4x2', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f5d34442-41bb-46ba-9b3d-214fc7ec155a', 'AUDI', 'TT', 'Coupe 1.8 T 190CV', 4, 194);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('49f5df0d-6716-4b7d-ae0c-b394ab0d030e', 'HYUNDAI', 'Kona', '1.0 TGDI Essence 4X2', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('704589b0-2f73-4ee4-ab5d-7bca12b1468e', 'MERCEDES-BENZ', 'Clase CLA', 'Mer.AMG CLA 45 4M OrangeArt E Shoot. B.', 5, 162);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ad972525-ea5f-429b-95a5-2309763a2fdc', 'MERCEDES-BENZ', 'Clase V', '250 d Avantgarde Extralargo', 6, 156);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('821014c8-d8c6-46ed-8c15-b9ecae505c4f', 'VOLKSWAGEN', 'T-Roc', 'Sport 2.0 TDI 110kW 150CV DSG', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e55aabd6-736c-45c7-bb6f-b947e4416b61', 'SKODA', 'Kamiq', '1.0 TSI 85kW 115CV Ambition', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fba70e14-f321-4087-89c1-e1cd394e56ee', 'AUDI', 'Q3', 'Advanced 35 TFSI 110kW 150CV S tronic', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c63fb559-75f9-470b-a12d-bdc784cd1c57', 'VOLKSWAGEN', 'T-Roc', 'Advance Style 2.0 TDI 110kW DSG', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('18fc4c03-19c9-474f-b4c1-ae5bb993ac52', 'RENAULT', 'Kangoo Furgon', 'Profesional dCi 55kW 75CV Euro 6', 2, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f262e7da-1d7c-4704-99aa-ff7713b6bbed', 'MAZDA', 'CX-3', '2.0 G 89kW 121CV 2WD AT Zenith', 5, 140);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b8f09bbc-b92c-4223-8204-293fbe0b9a9a', 'VOLVO', 'V60', '2.0 D3 Momentum Core Auto', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fc2676fa-4295-4e14-9dd6-0ecd02b1eb29', 'CITROEN', 'C5 Aircross', 'BlueHdi 132kW 180CV SS EAT8 Feel', 5, 124);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8ed5d702-b9fd-46be-92c4-365e91a6cf42', 'MERCEDES-BENZ', 'Clase V', '220 d Clase V Compacto', 6, 157);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('94948f6b-915b-4af9-93e2-79e43e61feda', 'CITROEN', 'C4 Spacetourer', 'PureTech 96KW 130CV SS 6v Live', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b27d2805-adca-4e28-a1b6-6d78d7e5a806', 'CITROEN', 'C5 Aircross', 'PureTech 96kW 130CV SS Live', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('67580ccf-5d63-44b4-9fe7-19bfb59fc5fc', 'MITSUBISHI', 'Outlander', '2.4 PHEV Kaiteki Auto 4WD', 5, 40);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6aad28c4-d95f-4e23-912a-051792b80beb', 'CITROEN', 'C4', '1.4 16v Collection', 5, 153);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('52f3162f-887b-4097-a8e5-aa22f2561b95', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 220 d 4MATIC', 5, 137);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b28640eb-8ab6-47d1-b80d-bb6553325f86', 'BMW', 'Serie 4', '440i xDrive', 4, 169);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b3c446b7-a0fa-4f8b-84eb-e014f4b68c38', 'RENAULT', 'Kangoo Combi', 'Expression N1 Energy dCi 110', 5, 123);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('544a5da4-3713-4d53-bb62-29fc193b2e14', 'DS', 'DS 7 Crossback', 'PureTech 96kW 130CV BE CHIC', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('60c4240c-b770-410a-a598-f9a10ccd2b0a', 'MERCEDES-BENZ', 'Clase SLK', 'SLK 200 K', 2, 209);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('90baef96-52f8-46ce-9075-1e664670e2e3', 'VOLKSWAGEN', 'Crafter', '35 Furgon BM TA L3H2 2.0TDI 103kW', 3, 189);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('53c98ce1-c82e-48a2-a3f3-aa699ebdd957', 'VOLKSWAGEN', 'Caravelle', 'Caravelle Corto 2.0 TDI 84kW 114CV BMT', 8, 169);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6d33ec1d-06d5-445b-a83c-71dd534a28a1', 'RENAULT', 'Espace', 'Initiale Paris Energy dCi 118kW TT EDC', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('796d9202-090e-43e8-8e4e-9ac1b229d681', 'HYUNDAI', 'Kona', '1.0 TGDI 48V N Line 4X2', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a94736c8-11a7-499b-b092-ece14e7bc49a', 'FIAT', 'Fiorino', 'Cargo Base N1 1.3 MJet 59 kW 80 CV', 2, 125);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9923f49d-fa37-4e82-8373-0f023d921cad', 'MINI', 'CLUBMAN', 'ONE D', 5, 99);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c1c71d52-5f1e-4140-be67-1c5d23cc82d6', 'PORSCHE', 'Cayenne', 'EHybrid', 5, 58);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fef74445-f4ae-42df-9c7a-36300ad48209', 'BMW', 'X4', 'xDrive20d', 5, 138);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('55a9bf27-d782-4d83-a56c-46f16604993f', 'MAZDA', 'CX30', 'eSKYACTIVX 2.0 137kW Zenith', 5, 105);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b8240066-d129-4b62-a901-41f0e4f452ce', 'JEEP', 'Renegade', '1.3G 110kW Limited 4x2 DDCT', 5, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fc06819e-7de9-42ad-a355-5c84cc7c88b8', 'VOLKSWAGEN', 'Transporter', 'Furgon Corto T.Medio 2.0 TDI 102cv 2.8T', 3, 193);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4abad7d9-82c5-48b4-a103-9b8a05139cdd', 'PEUGEOT', 'Boxer', '435 L4 H2 BHDI 121kW 165CV SS 6 V. M', 3, 166);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('69848837-3a39-41e6-b785-543ef88d357e', 'SKODA', 'Kamiq', '1.5 TSI 110kW 150CV Sport', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4d4c0983-8112-471a-ade3-61b90c3e0c66', 'LAND-ROVER', 'Discovery', '2.7 TDV6 SE', 5, 249);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c0dda1b2-7835-47d2-aec6-13ac4a9aa312', 'FORD', 'Fiesta', '1.4 TDCi Trend', 5, 110);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ebe0f98e-6257-49a7-b3ea-41999c26f692', 'SKODA', 'Kodiaq', '1.5 TSI 110KW 150cv 4x2 Ambition', 5, 146);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('71534717-1382-4e01-ac20-e96e19161c86', 'MERCEDES-BENZ', 'CLA', 'CLA 200 D DCT Shooting Brake', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('673b7a30-e844-4cc0-8fa1-d5473f2f40b2', 'OPEL', 'Mokka', '1.6 CDTi 4X2 SS Selective', 5, 106);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('40a807dd-a232-402a-a95f-c011cb8b6f1e', 'PORSCHE', 'Cayenne', '3.0 S Hybrid Tiptronic', 5, 193);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('06c52976-263b-4958-a31c-3dbb1af6d181', 'BMW', 'X2', 'sDrive20i DCT', 5, 135);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f543353c-4285-46f8-8a34-ec48b47c42c4', 'SUZUKI', 'Swift', '1.3 DDiS GL 5p', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0aa337b7-a498-47a2-8b58-6a39a73a9815', 'SKODA', 'Karoq', '1.5 TSI 110kW 150CV ACT Ambition', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a370e324-4481-4cea-af67-85bfef3ae9b0', 'MERCEDES-BENZ', 'GLA', 'GLA 180', 5, 144);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('48dcd7cf-cad4-45e7-8905-66de7fd605cb', 'AUDI', 'Q3', 'Advanced 35 TFSI 110kW 150CV S tronic', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('84533026-d42d-42d9-aed6-e2cfdda7ceca', 'AUDI', 'Q2', 'Sport 30 TDI 85kW 116CV S tronic', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9f4ea74d-561b-4fda-af3c-f62a937e7d82', 'JEEP', 'Grand Cherokee', '3.0 V6 CRD Limited 241 CV', 5, 218);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6a123e8e-b89d-4d99-8ec4-1e4e664aba70', 'VOLKSWAGEN', 'Caddy', 'Profesional Kombi 1.4 TGI 81kW BM', 5, 126);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dfdd9b02-a45e-4144-b861-62924e2b23c2', 'PEUGEOT', '508', 'GT 2.2 HDI 204cv Auto.', 5, 150);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('005f674a-e877-4a52-bf16-347d3dad528d', 'PEUGEOT', '807', 'ST Pack 2.0 HDI 136', 5, 188);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('75b6ea83-1fe7-49db-b290-c97559cb4a49', 'FORD', 'Grand C-Max', '1.6 TDCi 115 AutoStartStop Titanium', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9b730dd0-6404-4997-a45e-e07ea3aea063', 'RENAULT', 'Master', 'Chasis Cabina P L3 3500 RG dCi 96kW E6', 3, 242);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f39c1ec1-6d10-414e-ad42-784cdd084569', 'PEUGEOT', '607', '2.7 HDi Automatico Ebano', 5, 223);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f2600112-c9f4-4558-8a60-68975792fb3b', 'BMW', 'X2', 'sDrive18i', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2861b44c-8ccb-4388-96af-5bb26a1d811c', 'MAZDA', 'CX3', '1.5 SKYACTIV DE Style Nav 2WD', 5, 105);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2cb89826-a4ca-4a76-a856-a77ed61e33f1', 'NISSAN', 'Micra', 'CC 1.6i 110 CV TEKNA Clm Ll16 Faros 6CD', 4, 160);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d456a55c-7a3a-445f-ad03-8fe891f78b48', 'AUDI', 'Q3 Sportback', '35 TFSI 110kW 150CV S tronic Advanced', 5, 135);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('da5f099f-ef32-43ad-b297-8c87ac8968f0', 'AUDI', 'Q2', 'design ed 1.0 TFSI 85kW ultra S tronic', 5, 123);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b973ace6-9bc4-43cd-b5ed-e403eb22cc99', 'LAND-ROVER', 'Range Rover Sport', '3.0 SDV6 225kW Autobiography Dynamic', 5, 185);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ae72c072-9fc3-4eb1-b990-6951725c56fd', 'AUDI', 'Q2', 'Advanced 30 TFSI 85kW 116CV', 5, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f8ab9765-f4a9-4736-af16-c5fff75872c7', 'OPEL', 'Zafira Tourer', '2.0 CDTi 165 CV Excellence Auto', 7, 154);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('832dc955-e699-4b08-aaba-a104946019c0', 'CITROEN', 'C-Crosser', '2.2 HDI 160 FAP Exclusive', 7, 194);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6d1715f0-0f4a-488d-9056-00076584ddb3', 'OPEL', 'Grandland X', '1.2 Turbo Ultimate', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('81a4e421-2aad-4864-9223-1d38cd0310dd', 'MAZDA', 'CX3', '2.0 G 89kW 121CV 2WD Zenith', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5462733f-ed16-4b08-a9b3-086fda73642a', 'OPEL', 'Combo', 'Tour Expression 1.3 CDTI 90 CV L1 H1 EU5', 5, 136);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7aea623d-5ac6-4924-8ed7-a25230f2de5f', 'CITROEN', 'Xsara Picasso', '1.6 HDi 110 LX Plus', 5, 136);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('68b92eff-a815-4ad2-8cc7-f512d784923b', 'AUDI', 'Q5', '2.0 TDI 170cv quattro DPF', 5, 175);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('509ca86b-f475-453d-a3aa-ccb7a1ff843d', 'FORD', 'Grand C-Max', '2.0 TDCi 140 Titanium', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('80489ad9-8529-40b5-8d51-ca729f53f70e', 'BMW', 'X6', 'xDrive35i', 4, 262);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('db700c5f-94f2-48d5-b24d-ac62b6022712', 'SKODA', 'Superb', 'Combi 2.0 TDI 150cv Ambition', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ec85fe27-756a-4ec2-bf9f-7b996be42bae', 'KIA', 'Stonic', '1.0 TGDi 74kW 100CV Drive', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9b8b71f9-b9b7-47f5-9c79-ab2e19af4ad5', 'VOLKSWAGEN', 'Caddy', 'Kombi PRO 2.0 TDI 110cv 4motion 5pl', 5, 171);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1da80985-f6d2-4e27-8981-f46241474879', 'SUZUKI', 'Vitara', '1.4 TURBO S 4WD', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('32a165ec-e1de-44bc-aac0-be05f098703a', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 200 d 4MATIC', 5, 137);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('acdaa389-c672-4c09-b71d-ede9b25f5eb8', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 250 d 4MATIC', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a3e1ef50-7bf9-401e-a18c-98562c0128b5', 'VOLVO', 'XC40', '1.5 T2 Momentum', 5, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e9c5bc34-5fac-4437-a910-37d152096633', 'DACIA', 'Logan', 'MCV Ambiance 1.2 55kW 75CV EU6', 5, 130);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('646babef-81fc-4471-8f18-77c02ccb2a9d', 'MAZDA', 'CX3', '2.0 G 89kW 121CV 2WD Origin', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a21ce5a1-2d67-4088-85dd-5ab495474602', 'OPEL', 'Movano', '2.3 CDTI 81kW 110CV L2 H2 F 3.5t', 3, 204);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('84cc41a1-66f5-43bc-87a8-5605cf475289', 'TOYOTA', 'Verso', '140 MDRV Advance 7pl.', 7, 159);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('50d110f6-bf83-4096-b262-61cf5209ec63', 'MERCEDES-BENZ', 'Clase V', '200 d Avantgarde Largo', 6, 179);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dc9fb8bf-e021-470e-b9e3-9fe06b68c828', 'FORD', 'Grand C-Max', '1.0 EcoBoost 125 Auto StartStop Edition', 5, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('277742ef-6310-476c-b34a-2c14aa486510', 'KIA', 'XCeed', '1.4 TGDi Tech 103kW 140CV', 5, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('cb8169fe-f526-4c15-bd37-18338bb314e3', 'CITROEN', 'C4', '1.6 HDi 110 Collection', 5, 125);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5a5c4c2d-6b2a-4383-8eb5-42f58f26fe04', 'CITROEN', 'C5 Aircross', 'BlueHdi 96kW 130CV SS EAT8 Feel', 5, 106);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('70898c88-0e3f-49f2-8c24-30ec2f373347', 'BMW', 'Serie 3', '320i', 4, 157);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6d507fb9-0029-47d1-80bb-e928a8bd12e3', 'VOLKSWAGEN', 'T-Roc', 'Advance 1.0 TSI 85kW 115CV', 5, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0c195ece-b3fa-4903-86f4-a555a2eea97a', 'DS', 'DS 3', 'BlueHDi 100cv SS Desire', 5, 87);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('50798475-c59d-4ca7-8171-c0e5fac3defd', 'HONDA', 'HR-V', '1.6 iDTEC Elegance', 5, 104);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5ab5a882-7bfb-4205-befe-0a344e87bcea', 'TOYOTA', 'Land Cruiser', '2.8 D4D GX', 5, 200);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('adb8882a-3274-4ff7-ae01-0e6408ffa7b3', 'BMW', 'X6', 'xDrive40d', 5, 163);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('808f699d-4078-4625-bd38-213a889e7162', 'JAGUAR', 'XF', '2.0D 132kW 180CV Prestige Auto', 5, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2c8d3e35-6a5b-454c-947c-8e3153677a9d', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 118kW 160CV Stelvio RWD', 5, 138);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('99754ab7-69d0-4033-a6c4-64e3a5dea48d', 'SUZUKI', 'Grand Vitara', '1.9 DDiS JXA', 4, 195);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('05515a9f-aa38-4506-8a29-dd5202623d2d', 'SKODA', 'Spaceback', '1.6 TDI CR 90cv Ambition Spaceback', 5, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d7d3441c-3b6d-45d6-a83a-dd079c5cbd8c', 'LAND-ROVER', 'Freelander', '2.2 Td4 S StopStart 150cv', 5, 165);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0cadf32f-f1be-409f-a2a5-dfa059b90a59', 'AUDI', 'S3', 'Sportback 2.0 TFSI S tronic quattro', 5, 195);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a239cf1d-cd04-483b-b1e8-f9520e119a8c', 'PEUGEOT', '5008', 'Business Line 1.6 HDI 112 FAP', 5, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d3c7e51e-9794-4897-a335-f90a53beb8af', 'RENAULT', 'Espace', 'Intens Energy dCi 96kW 130CV ECO2', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5c6116fc-4b9e-407e-a4e1-456a9c53d3a8', 'FORD', 'Ranger', '2.5 TDCi 4x4 Doble Cabina XL', 5, 255);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('546b2d52-48f6-4ee3-a5bf-4d196b504242', 'FORD', 'Transit Custom', 'Kombi 2.0 TDCI 77kW 320 L1 Trend', 9, 168);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2ef6652e-d053-4332-b5be-23fdc472121e', 'FIAT', 'Fiorino', 'Cargo Base 1.3 Mjet 59kW 80CV E6', 2, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ce51a74d-6152-4772-a5e5-501be83c8a9a', 'FIAT', '500L', '1.3 16v Multijet II 85 CV StartStop', 5, 110);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('64094d38-42e9-4e41-94c3-1d5ff6fa9815', 'PORSCHE', 'Cayenne', 'Diesel', 5, 173);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8be31688-c135-4f73-8b9b-b9572914bbac', 'JEEP', 'Compass', '2.2 CRD Limited Plus 4x2', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b60a305b-9c21-4f69-9c80-3980ca46a355', 'VOLKSWAGEN', 'T-Cross', 'First Edition 1.0 TSI 85kW 115CV', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ad0fa3b8-117b-44d4-bb3e-0d923d118378', 'RENAULT', 'Master', 'Furg. DC T L3H2 3500 dCi 96kW 130CV', 7, 207);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('01791900-5c7b-4e4c-a197-c8d2967e654c', 'PEUGEOT', '307 SW', '1.6 HDi 110 FAP DSign', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e7ff9f39-384e-476b-b2ed-02d304d2e3bf', 'VOLKSWAGEN', 'Transporter', 'Kombi PRO Corto TM 2.0 TDI BMT 140CV', 2, 184);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('44859023-9f82-4410-bb31-6cbc2e1783de', 'MERCEDES-BENZ', 'Clase GLA', 'GLA 220 d 4MATIC AMG Line', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('599e0415-3931-49d9-bd19-f3bcbe4af361', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 110kW 150CV Super RWD', 5, 124);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('377d2847-1f0a-43bd-be3b-1aadd36fc1c0', 'CITROEN', 'C5 Aircross', 'BlueHdi 96kW 130CV SS EAT8 Feel', 5, 105);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('72f36eaf-08fe-48c7-86b9-2df7ad374b10', 'CITROEN', 'C5', '1.6 HDi 110cv CMP Business', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5a2304aa-78e5-4658-8da4-6d9015fd5549', 'SEAT', 'Tarraco', '2.0 TDI 110kW 150CV SS Style Plus', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5538dda3-16d9-43eb-91d4-ff7d61bd105e', 'VOLVO', 'XC40', '2.0 D3 Momentum Auto', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f83d3c67-0f4f-4d2c-aa92-31032eeedb10', 'PEUGEOT', '208', 'PureTech 73kW 100CV EAT8 Allure Pack', 5, 99);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1ea61e48-0279-42d0-bb3e-31688980828a', 'AUDI', 'A7', 'Sportback 3.0 TDI 218CV quattro S tronic', 4, 136);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e64284f5-e500-4b8e-84c6-d226b0f49ad5', 'DODGE', 'Caliber', '2.0 CRD SXT Limited', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b9813690-b781-4dc7-bdea-67d56aececb3', 'FORD', 'C-Max', '1.6 TDCi 90 Ghia', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f8c57f2a-038b-49ca-b606-2dcbcaf58be7', 'FIAT', 'Punto', '1.2 8v Lounge 69 CV Gasolina SS', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('59219bf2-cd7a-4d08-ba90-59b72d79424b', 'PORSCHE', 'Cayenne', '3.0 TD Tiptronic', 5, 189);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4db3cc80-c097-455f-a43b-f23330f230f1', 'MASERATI', 'Ghibli', 'GranSport 2.0 L4 HybridGasolina 243kW', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f091b9e0-f928-47ce-b98f-3dda7da91d78', 'MAZDA', 'CX-5', '2.0 GE 121kW 165CV 2WD AT Newground', 5, 150);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('15a7ffbb-888c-4562-a978-2d6f6345d31c', 'SEAT', 'ALTEA', '1.9 TDI HOT', 5, 149);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2d17cc17-ca84-479b-a8e2-5b6356f6f22d', 'FORD', 'Focus', '2.0 TDCi Sport', 5, 148);