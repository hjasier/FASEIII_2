CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand VARCHAR(100)     NOT NULL,
    model VARCHAR(100)     NOT NULL,
    version VARCHAR(255),
    seating_capacity INT,
    co2_emissions_grams_per_km INT
);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('eea0588f-8455-4d06-8c54-f1c0c4b97502', 'JEEP', 'Patriot', '2.0 CRD Limited', 5, 180);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e918a788-a05a-4fc3-8d12-cbaaf1239ba7', 'OPEL', 'Crossland X', '1.2 96kW 130CV Innovation Auto', 5, 113);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4ac6358e-2a45-4761-80f7-4c7d7d731145', 'SEAT', 'Alhambra', '2.0 TDI 177 CV StartStop Style DSG', 5, 154);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8c867278-dbea-4b3a-8941-5de4f91c672c', 'VOLVO', 'XC90', '2.0 T8 AWD Inscription Auto', 7, 50);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a0ec3952-599c-46d6-95d7-c1b7d798364b', 'LAND-ROVER', 'Range Rover Sport', '3.0 TDV6 258cv HSE', 5, 194);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1e6c441c-0aa1-42b3-8e81-ac5522a62d33', 'AUDI', 'Q3', 'S line 35 TDI 110kW 150CV S tronic', 5, 123);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('634a02d6-076d-4ef9-84c9-1a787cd4839c', 'HYUNDAI', 'Kona', '1.0 TGDI 48V Maxx 4X2', 5, 109);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bab48104-dac7-43d0-9eab-e3f7e3fb6ced', 'VOLKSWAGEN', 'Crafter', '35 Furgon BM TA L3H3 2.0TDI 103kW140CV', 3, 189);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('464448b8-4650-476c-928f-4911f9ed5130', 'JAGUAR', 'Fpace', '2.0L i4D 132kW RSport Auto', 5, 134);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bd4a0d45-27f8-4c00-81f0-01087370b613', 'VOLVO', 'XC90', '2.0 D5 AWD Momentum Auto', 7, 149);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b0d3a790-0094-4668-ac46-4eb54f8fe482', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 220 d 4MATIC', 5, 131);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0113d685-2eae-49fd-a929-0bafde114a14', 'OPEL', 'Grandland X', '1.2 Turbo 120 Aniversario', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e42a4add-e094-486c-96d7-c7548ea6c33d', 'OPEL', 'Crossland X', '1.6T 73kW 99CV Selective', 5, 102);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('717d2c50-0cac-446c-aa5f-2ffb9a24735f', 'HYUNDAI', 'Kona', 'KONA TGDI 1.0 120CV 4X2 KLASS', 5, 124);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0cba084f-a1ac-4d20-83f8-9050d08fe66b', 'BMW', 'X4', 'xDrive20d', 5, 132);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('85c08acb-f592-4a79-b76c-c0d0c2cfcca4', 'BMW', 'X2', 'sDrive18d', 5, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ea045992-147d-456a-8fe9-d09761c4bdbe', 'CUPRA', 'Formentor', '1.5 TSI 110kW 150 CV DSG', 5, 126);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fac01af6-1cfe-4d17-b99e-ee9a042ce3df', 'VOLKSWAGEN', 'Crafter', '35 Furgon BM TN L3H2 2.0TDI 103kW140CV', 3, 202);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('76f2c32a-9277-4aee-ab21-41cf86c0dc20', 'VOLKSWAGEN', 'T-Cross', 'Advance 1.5 TSI 110kW 150CV DSG', 5, 116);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e1de0612-08d3-4a3a-b6cb-e7c4245316f8', 'BMW', 'X1', 'sDrive18d', 5, 128);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0101d247-0272-4f3b-9a87-c8a5b6313a5a', 'FORD', 'Transit', '350 100cv L3 Ambiente Traccion Delantera', 3, 203);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ea6e0797-7cb6-4b4c-aa57-990570fa48a6', 'FIAT', '500X', 'Cross 1.0 Firefly T3 88KW 120 CV', 5, 122);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('00cb2a38-655e-474b-9bf3-e7aad840607d', 'VOLVO', 'XC90', '2.0 B5 D AWD Momentum Pro Auto', 7, 147);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('183b3743-fa5f-4acb-a2fb-526741b9a935', 'VOLVO', 'V60', '2.0 D2 Momentum', 5, 101);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4177adfd-39f1-4a77-a6da-768278bc9256', 'RENAULT', 'Kangoo Combi', 'Limited M1AF Blue dCi 70 kW 95 CV SS', 5, 121);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9fcce3a5-ae06-4e12-85f1-9f91ec27e96d', 'MERCEDES-BENZ', 'Citan', '109 CDI Furgon Extralargo BE', 2, 122);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('cce0579a-c657-4d09-a671-be3ed7a5aae5', 'VOLVO', 'XC60', '2.0 B4 D Core Auto', 5, 127);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c3503dba-1665-4cd8-8660-9e72c6734739', 'LAND-ROVER', 'Freelander', '2.0TD4 E ', 5, 240);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4a9168c8-606c-43f5-af57-49c89c440ce5', 'SAAB', '9-3', 'Sport Hatch Linear Sport 1.9 TiD', 5, 159);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('16e623fc-76fa-42d8-94b1-549172eb8ebf', 'VOLKSWAGEN', 'T-Roc', 'Sport 2.0 TDI 110kW 150CV', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('77f6483b-9707-4660-8d3f-e94fa773b06c', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 350 d 4MATIC', 5, 161);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7c7ac470-134d-4af9-a78f-4430936236c5', 'SSANGYONG', 'Tivoli', 'G16 Line 4x2', 5, 154);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ba164035-3fc1-4d50-8b88-75b594efafc5', 'FORD', 'Puma', '1.5 Ecoblue 88kW 120cv Titanium', 5, 99);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f4f3224f-3892-43bd-92a8-aeee92d6af0f', 'CITROEN', 'C5 Aircross', 'PureTech 96kW 130CV SS C Series', 5, 118);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0b3bd9a7-b455-49ee-88c0-c0655f6dc4f1', 'MAZDA', 'CX-3', '2.0 G 89kW 121CV 2WD Evolution Design', 5, 121);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a355ea48-6179-4027-adeb-9bc7faeaacfa', 'MAZDA', 'CX30', 'SKYACTIVG 2.0 90 kW 2WD Zenith', 5, 116);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8bd970d6-6870-4fd8-aa13-ef2d6d2aac2d', 'FIAT', 'Punto', '1.3 Pop 75 CV Multijet E5', 5, 112);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('54ae87fa-6cf8-4429-89a8-4e57c6687d64', 'RENAULT', 'Master', 'Combi 9 L2H2 3500 E dCi 107kW 145CV', 9, 200);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b435e9cd-d5fb-4b8b-a6c6-7af2b99b1784', 'FIAT', 'Talento', 'N1 1.0 Base Corto 1.6 MJet 88kW 120CV', 3, 170);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a6f877fc-b037-483e-aab3-edeb6df5297f', 'JEEP', 'Compass', '1.4 Mair 125kW Limited 4x4 ATX', 5, 160);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dfd345e7-c5dc-4355-bdcc-3b52e158f46e', 'AUDI', 'Q3', '40 TDI 140kW S tronic Quattro Advanced', 5, 139);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6c95cbf6-949f-40d5-931e-94faa427945b', 'FIAT', '500', 'Dolcevita 1.0 Hybrid 51KW 70 CV', 4, 88);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d151533b-604e-4e88-a025-d7dd9a16bac9', 'JAGUAR', 'XE', '2.0 Diesel 132kW RWD Prestige Auto', 5, 109);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e0ee9a80-f9f6-455a-a7f6-78a3cacff9e6', 'VOLKSWAGEN', 'Sharan', '2.0 TDI 140cv DSG Edition', 7, 149);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2b6003c9-ff35-48bc-bafa-662043fd090a', 'JEEP', 'Renegade', 'Limited 1.6 Mjet 956kW 130CV 4x2', 5, 122);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('093f313a-7f60-4259-a9ee-d5218bcb5ff6', 'OPEL', 'Zafira Tourer', '2.0 CDTi SS Excellence', 7, 129);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d3f573b3-0805-4702-9b62-353b11c97d5a', 'LAND-ROVER', 'Range Rover Sport', '3.0 SDV6 306cv HSE Dynamic', 5, 185);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2d09ab55-286a-48b3-a2e7-62834c2876c9', 'MERCEDES-BENZ', 'Clase GLK', 'GLK 250 CDI 4M Blue Efficiency', 5, 168);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0207e065-24e4-428a-ab0e-058610dffa87', 'KIA', 'Sorento', '2.5 CRDi EX2', 5, 226);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('35b23149-c4bb-47f8-b93f-d60a7a91d713', 'FORD', 'Grand C-Max', '1.6 TDCi 115 Trend', 5, 129);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3d9f7660-11c6-4f27-be77-c26cf3f63fee', 'AUDI', 'Q3', 'Advanced 35 TFSI 110kW 150CV', 5, 140);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bdcdaacc-e097-4d5b-a797-574885cbe176', 'ALFA ROMEO', 'Stelvio', '2.0 Gasolina 148kW 200CV Super Q4', 5, 161);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('92cda129-f775-4f91-8070-38c6198689ea', 'JAGUAR', 'E-Pace', '2.0D 110kW RDynamic S', 5, 129);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('446c4d69-0242-43b4-b1a1-0968b3feea7f', 'AUDI', 'A4', 'Avant 2.0 TDI 143cv DPF', 5, 139);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1d613e23-a8ba-4e65-aa61-15ed18f78b07', 'CHRYSLER', 'Sebring 200C', '2.0 CRD Touring', 5, 170);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('90bbc8bb-02fc-4471-af3b-4b337baac3e4', 'NISSAN', 'Almera', '2.2 dCi 112CV Line Up', 5, 161);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('86cae98c-640b-40ed-abaf-16ea77433083', 'OPEL', 'Grandland X', '1.2 Turbo Design Line', 5, 116);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('10538592-b5c7-489b-8b04-fcba7863a298', 'PEUGEOT', 'Expert', 'Furgon Pro 2.0 BlueHDi 120 SS Long', 2, 143);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4d65d426-877b-4633-bc4c-965a008c301f', 'PEUGEOT', 'Expert', 'Furgon Pro 1.6 BlueHDi 70KW 95Standard', 2, 144);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bafff080-6c99-42eb-bcdd-ab6c8fc940dd', 'AUDI', 'Q2', 'Design 30 TFSI 85kW 116CV', 5, 118);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d6a1ae77-899c-48c9-ab7b-4d1f9b0bbb06', 'SEAT', 'Exeo', 'ST 1.8 TSI 120 CV Reference', 5, 172);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d7ebc7f6-58f6-4ffb-862e-0a4e1b145227', 'VOLKSWAGEN', 'Crafter', '30 Furgon BM TN L3H2 2.0TDI 75kW 102CV', 3, 187);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5cec00a7-7cb6-4868-9c54-2ffc5ad1a95e', 'OPEL', 'Mokka', '1.2 T 96kW 130 CV Business Elegance', 5, 103);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4da4bf7a-0bd1-4525-a2f2-9b2f76f5c9ce', 'RENAULT', 'Master', 'Fu. P L4H3 3500 RG E B dCi 121kW 165CV', 3, 225);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('714396bb-fd76-4096-9305-6dc9002026a8', 'JEEP', 'Renegade', '1.6 Mjet 88kW 120CV Night Eagle 4x2', 5, 122);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('32830a37-963f-4d2c-89b2-f1e0c713af28', 'MINI', 'CLUBMAN', 'ONE D', 5, 112);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b7ff1a7e-661c-434b-be9c-86f326db8662', 'SEAT', 'Arona', '1.6 TDI 70kW 95CV Style Ecomotive', 5, 113);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fc86bbc5-93c5-420a-a8e5-53a2cadf70da', 'FIAT', '500X', 'Urban 1.3 MultiJet 70KW 95 CV 4x2 SS', 5, 105);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4eee3ca8-7226-4f6a-b117-b0656de69289', 'FIAT', 'Linea', '1.4 16v 77cv Dynamic Gasolina Fire E5', 5, 148);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('099df19a-dca6-45f8-9f28-09c82515759a', 'MERCEDES-BENZ', 'CLA', 'CLA 200', 5, 134);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('36aff58a-107a-43e3-adab-20f86f7165b9', 'CITROEN', 'Grand C4 Picasso', 'PureTech 130 SS 6v Feel Edition', 7, 116);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1491578e-1dc2-4e2d-9b97-9ce2418f0803', 'RENAULT', 'Master', 'Furg. DC T L3H2 3500 B dCi 100kW 135CV', 6, 187);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('724ab03b-b731-4483-9812-26df2f7a75df', 'BMW', 'X4', 'xDrive20d', 5, 142);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('655b1a1b-487e-4c1a-8fe9-1247fd027ce4', 'FORD', 'Ranger', '2.2 TDCi 118kW 4x4 Doble Cab. XL SS', 5, 184);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('db4076f0-6114-4dd5-bd95-708ecdf25f42', 'ABARTH', '500', '1.4 16v TJet 595 107kW 145CV E6', 4, 155);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0911590a-3401-43dd-9e76-fe1c0033723c', 'OPEL', 'Mokka X', '1.4 T 103kW 140CV 4X2 SS Ultimate', 5, 140);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1250394c-b3ef-44de-99af-a8f32941a9fb', 'VOLKSWAGEN', 'Crafter', '30 Furgon BM TN L3H2 2.0TDI 103kW140CV', 3, 189);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fb3a5769-5981-4c9d-bfe1-2b2d7bf0b57c', 'DACIA', 'Logan', 'Ambiance 1.2 16v 75cv E5', 5, 135);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('deae7b9c-6278-4c89-a79e-d5c4cab1ed77', 'CUPRA', 'Formentor', '1.5 TSI 110kW 150 CV', 5, 123);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dc086fc0-48d1-400a-9e92-c86048735931', 'AUDI', 'Q3', '2.0 TDI 150CV', 5, 116);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8dbe72c7-458f-4bc8-a8a2-d2fc1eea9005', 'FIAT', '500X', 'Dolcevita Club 1.0 Firefly 88KW 120CV', 5, 130);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f594fc35-eada-44f4-ab9f-7956fd69f43d', 'BMW', 'Serie 2', '220i', 4, 139);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3e6c3aa2-1305-4f56-b8e2-1d010358708e', 'MERCEDES-BENZ', 'Clase GLA', 'GLA 220 d', 5, 145);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4109bd13-83ad-4234-a831-f37cc31709d9', 'VOLKSWAGEN', 'Arteon', 'RLine 2.0 TDI 110kW 150CV DSG', 5, 110);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a91dc95d-4fb4-444d-b724-385e1b12c867', 'BMW', 'Serie 4', 'M4 CS', 4, 197);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('108c1c79-7dac-4647-9c87-f03ecc2b77e6', 'FORD', 'Tourneo Courier', '1.5 TDCi 95cv Ambiente', 5, 104);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4647b355-a63b-4ee5-9348-18754b766a04', 'PORSCHE', 'Panamera', '4S Diesel', 4, 176);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('586ff823-239d-4db6-b255-5df24e8e7cab', 'AUDI', 'A7', 'Sportback 3.0 TDI 272 quat S tron S line', 4, 142);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fbf25cfc-c19f-45b4-bf73-67c35d05dba4', 'FIAT', '500', '1.2 8v 69 CV Lounge', 4, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bd43875e-c002-4c38-92cb-1761cb94f9f7', 'JEEP', 'Grand Cherokee', '2.7 CRD Laredo', 5, 255);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('95272a97-6788-46e2-8855-f04d2e8149d5', 'VOLVO', 'XC40', '2.0 D3', 5, 128);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d90cd777-04fe-49c6-b78b-b60784f16f38', 'AUDI', 'Q3', 'Black line 35 TFSI 110kW 150CV S tron', 5, 139);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b38e8e42-2d81-48fa-8999-8a6a5011c080', 'MERCEDES-BENZ', 'Citan', '111 CDI Tourer Plus Largo', 5, 115);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('47277047-286d-43c2-a7bb-836d9a2f5800', 'MERCEDES-BENZ', 'CLA', 'CLA 250 e', 5, 31);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a9d5d22f-2bfa-4fcb-ba5e-3d7bd71c5c6c', 'LEXUS', 'IS', '300h F Sport  Navibox', 5, 109);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5c4aa99f-9e80-4d33-8757-56f0eeb41624', 'FIAT', 'Ducato', '33 Medio Techo Alto 2.0 Mjet 85kW 115CV', 3, 162);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('885e42f8-bbfc-45d6-8181-c40cf0e0a389', 'FIAT', '500C', '1.2 8v 69 CV Sport', 4, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('75b7822f-8f93-42c7-9f36-1387f12dd2d3', 'DACIA', 'Dokker', 'Van Ambiance dCi 90', 2, 118);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('de016185-66d6-4034-bdce-af0c299886ae', 'VOLKSWAGEN', 'Transporter', 'PRO Furgon Largo TM 2.0 TDI 114 BMT 2.8T', 3, 176);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e0e2589d-6ce4-46f7-8d34-60c159b065c3', 'BMW', 'Serie 2', '218d', 4, 114);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c8610a46-5a31-4e7a-8ded-addac96ebb3f', 'SEAT', 'Ateca', '1.5 TSI 110kW 150CV StSp FR', 5, 131);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d2ace143-1ee6-447f-955d-a1d07ea072d7', 'CUPRA', 'Formentor', '2.0 TDI 110kW 150 CV', 5, 113);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('eb4123ab-fd00-4869-9f73-f556dc6d0212', 'ABARTH', '500', '595 Scorpioneoro 1.4 16v 121kW E6D', 4, 157);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('11387ace-b271-4a5c-abe9-0fd930143bfe', 'VOLKSWAGEN', 'T-Roc', 'Advance 1.6 TDI 85kW 115CV', 5, 115);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0181ad95-0641-49bf-bf37-8f82f375fb83', 'VOLVO', 'XC90', '2.0 T8 AWD Recharge Inscription Exp Auto', 7, 47);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a98b5b9e-562f-4ad3-b827-b91062bfe208', 'FIAT', 'Doblo Cargo', 'Cargo Base 1.6 Multijet 105cv E5', 2, 143);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c553832a-f7b9-468a-85d3-0f1b0cc90fe6', 'AUDI', 'Allroad Quattro', '3.0 TDI quattro tiptronic', 5, 232);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('48a431ad-dd3e-40be-af50-4306d1a60dd5', 'AUDI', 'Allroad Quattro', '2.7 TDI quattro tiptronic DPF', 5, 229);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5cb1a9a2-a73d-4738-b8dc-70dde7208a2e', 'SKODA', 'Octavia', 'Combi 2.0 TDI CR 184cv RS', 5, 117);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8642b135-afba-4289-8f25-52fd29388932', 'PORSCHE', 'Cayenne', '4.8 S Tiptronic', 5, 245);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3a4638eb-5efc-4ca3-a93b-0ff3bbde0d8a', 'FIAT', 'Punto', '1.3 Young 75 CV Multijet E5', 5, 112);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e2418512-1422-4db5-a7be-4b34e46ec624', 'VOLKSWAGEN', 'T-Roc', 'Edition 1.6 TDI 85kW 115CV', 5, 113);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('71026a39-8907-40c3-bf28-f24aac8b85b9', 'FIAT', '500', '1.2 8v 51kW 69CV Lounge', 4, 115);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5e927193-a19f-449b-b0b3-1db8c04c5f63', 'AUDI', 'Q3', 'Advanced 35 TDI 110kW 150CV S tronic', 5, 121);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b449ee1f-a9ea-4ae4-9def-1eb6cec03dc0', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 140kW 190CV Executive RWD', 5, 138);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2559730c-56e4-445b-9a79-62a3ed407b48', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 154kW 210CV Veloce Q4', 5, 146);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e9e2d2d0-1bdd-4b8f-aec5-7b1909db2906', 'KIA', 'Picanto', '1.1 SOHC EX', 5, 124);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('64f0646e-9849-4ea2-b43b-cfcd40085b08', 'PEUGEOT', '307 SW', '1.6 HDi 90 Pack', 5, 134);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('130c2692-adf5-4619-958a-91b99e655570', 'HYUNDAI', 'Kona', '1.0 TGDI Tecno 4X2', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fe4f0acd-49d7-4595-8679-87e200cb3e8e', 'JEEP', 'Compass', '1.6 Mjet 88kW Limited 4x2', 5, 122);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('917e19f2-36ad-4522-9865-9f8025a5f08a', 'HONDA', 'HR-V', '1.5 iVTEC CVT Elegance', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6b200b01-8527-4ce5-ab03-0e3e92953526', 'VOLKSWAGEN', 'New Beetle', '1.6 Auto', 4, 199);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dda9bf17-0876-43c0-9b58-ea7483f87911', 'BMW', 'X1', 'sDrive20d EfficientDynamics Edition', 5, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('08f8ffe3-b3a5-4e82-ba9b-9a309fc4625a', 'JAGUAR', 'E-Pace', '2.0D 110kW Chequered Flag 4WD Auto', 5, 158);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1d219d3a-3d4d-4963-bb5f-38f06300dd44', 'MERCEDES-BENZ', 'Citan', '109 CDI Tourer Select Largo', 5, 112);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b05360db-be77-4378-a887-1fddd9ad2912', 'VOLVO', 'XC40', '2.0 D3 Momentum', 5, 127);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c486df43-b182-4b19-be43-b8b639057998', 'SKODA', 'Superb', 'Combi 2.0 TDI 110KW 150cv Ambition', 5, 114);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('535ea537-9935-412a-a42a-d0af8fef22e9', 'RENAULT', 'Grand Espace', 'Exception 2.0 dCi 175CV Auto', 6, 217);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3b34d50f-df26-41b7-87b1-9dc9dce542e3', 'CITROEN', 'Berlingo', 'Multispace 20 Aniv. PureTech 81KW110CV', 5, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b6e3bed7-945b-41dd-b898-b8c79c229440', 'FIAT', 'Doblo Cargo', 'Base Maxi 1.6 Mjt 105 E5 Carga Aumentad', 2, 144);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('25aa0ea2-5eb2-4610-a346-0e206cb3b137', 'VOLKSWAGEN', 'Arteon', 'Elegance 2.0 TDI 110kW 150CV', 5, 107);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a713472f-3342-49fa-b500-6f532bea3921', 'VOLVO', 'XC90', '2.0 D5 AWD Inscription Auto', 7, 152);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('932d5bda-7fa2-46a8-918c-f2bbcf598e3a', 'DS', 'DS 3', 'EHDI 90 Techno Style', 5, 95);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2a835798-7d82-4783-b7f7-7ef07ae94337', 'OPEL', 'Mokka', '1.4 T 4X2 SS Excellence', 5, 145);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e2c5d380-f31d-437c-ac12-5c1345831c8a', 'RENAULT', 'Kadjar', 'Intens Energy dCi 96kW 130CV', 5, 113);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9a273521-0f73-44c8-870f-d968279156df', 'FORD', 'Transit Custom', 'Van 2.2 TDCI 125cv 330 L2 Trend', 3, 197);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('482a74db-5a4c-4fc2-ab13-473d36c812bb', 'HYUNDAI', 'IONIQ', '1.6 GDI HEV Tecno DT', 5, 85);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('47cd8add-515e-4c2e-95da-7c5c65395184', 'PEUGEOT', 'Boxer', '435 L4 BHDI 121kW 165CV SS 6 Vel. MAN', 3, 186);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('413e9335-3262-407b-93a3-ef03893320f1', 'MINI', 'CLUBMAN', 'COOPER SD AUTO', 5, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3d2a005b-43e6-410a-9d3f-de71ffe71ce6', 'OPEL', 'Grandland X', '1.2 Turbo Design Line', 5, 114);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bcae45d1-e0ac-475a-9f4b-9d23cab1e656', 'KIA', 'Picanto', '1.0 CVVT 49kW 67CV Concept', 5, 101);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f78da3d1-7dbe-46bb-8580-9ec8a0a7e4a7', 'FORD', 'Transit Courier', 'Kombi 1.5 TDCi 95cv Ambiente', 5, 104);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0187a6f5-80be-4cb2-9edf-500f4ba6f0f8', 'VOLVO', 'V60', '2.0 D3 Momentum Pro', 5, 117);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fb5007c8-770a-4e93-9124-f58bac6b1457', 'RENAULT', 'Grand Espace', '25 Aniversario 2.0 dCi 150CV FAP', 6, 193);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5e966e0b-37ed-4321-9596-cafd033eb37b', 'NISSAN', 'QASHQAI+2', '1.5 dCi ACENTA 4x2', 7, 149);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a616c34d-d65c-4c7e-9bd6-3460ebca0dbf', 'HYUNDAI', 'Tucson', '1.7CRDi 104kW 141CV BD TecnoSky DCT4x2', 5, 129);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('82d65b7a-ccd1-47c2-89a4-ab4da3766396', 'AUDI', 'TT', 'Coupe 1.8 T 190CV', 4, 194);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('36fc3f67-917d-4084-a5b8-0a8e7bd504ec', 'HYUNDAI', 'Kona', '1.0 TGDI Essence 4X2', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dae75157-0c7c-4f0d-b245-b3ffe1db3eb5', 'MERCEDES-BENZ', 'Clase CLA', 'Mer.AMG CLA 45 4M OrangeArt E Shoot. B.', 5, 162);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e0e3d2d0-d0e1-4bc2-9d07-f4efc4c415f5', 'MERCEDES-BENZ', 'Clase V', '250 d Avantgarde Extralargo', 6, 156);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0e348b34-8d98-4c5f-82a8-b78bbff7d26c', 'VOLKSWAGEN', 'T-Roc', 'Sport 2.0 TDI 110kW 150CV DSG', 5, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('738e368e-ff71-4967-9435-83420886b272', 'SKODA', 'Kamiq', '1.0 TSI 85kW 115CV Ambition', 5, 116);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4738b49b-43c1-47d4-9f04-c2cdb11f1207', 'AUDI', 'Q3', 'Advanced 35 TFSI 110kW 150CV S tronic', 5, 134);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5b93b538-dafc-4c8f-838f-a294bc5da79f', 'VOLKSWAGEN', 'T-Roc', 'Advance Style 2.0 TDI 110kW DSG', 5, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('348de66d-a32f-4d80-b0bd-8c1e5848fd72', 'RENAULT', 'Kangoo Furgon', 'Profesional dCi 55kW 75CV Euro 6', 2, 112);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7294e2be-d0ad-495b-9240-482fe9fe0fb4', 'MAZDA', 'CX-3', '2.0 G 89kW 121CV 2WD AT Zenith', 5, 140);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0abef7e5-8417-4e9c-9220-c68d3e9f3f9a', 'VOLVO', 'V60', '2.0 D3 Momentum Core Auto', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('db590191-5eec-48c0-90ef-48dac908256c', 'CITROEN', 'C5 Aircross', 'BlueHdi 132kW 180CV SS EAT8 Feel', 5, 124);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8846ae8e-8d42-4013-a22f-f87b64bbf77b', 'MERCEDES-BENZ', 'Clase V', '220 d Clase V Compacto', 6, 157);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f4c40034-61ce-4f8e-86e5-24af091df178', 'CITROEN', 'C4 Spacetourer', 'PureTech 96KW 130CV SS 6v Live', 5, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b8a6d777-a358-4f24-821e-d3e80f2f9875', 'CITROEN', 'C5 Aircross', 'PureTech 96kW 130CV SS Live', 5, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9be1ef68-98e8-40c2-93e0-592113362dec', 'MITSUBISHI', 'Outlander', '2.4 PHEV Kaiteki Auto 4WD', 5, 40);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('46755145-01b0-4ab9-b8ae-d51397a7e429', 'CITROEN', 'C4', '1.4 16v Collection', 5, 153);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('db18ef87-e88e-4a84-887a-87ee13e005f7', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 220 d 4MATIC', 5, 137);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('efd1233e-e526-4194-9861-042c62baef87', 'BMW', 'Serie 4', '440i xDrive', 4, 169);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8de9a117-18b2-49db-856c-ddd8fc8aacce', 'RENAULT', 'Kangoo Combi', 'Expression N1 Energy dCi 110', 5, 123);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('70abdaf8-2a77-49c4-830a-0b013c1789d1', 'DS', 'DS 7 Crossback', 'PureTech 96kW 130CV BE CHIC', 5, 121);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('50a97c86-a971-472f-b747-25e9e38746b9', 'MERCEDES-BENZ', 'Clase SLK', 'SLK 200 K', 2, 209);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('61ad769e-061d-4bb6-a16b-c02d9e6b3cdf', 'VOLKSWAGEN', 'Crafter', '35 Furgon BM TA L3H2 2.0TDI 103kW', 3, 189);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2e195559-dc6d-41c9-86b8-e1e6ba09d3a1', 'VOLKSWAGEN', 'Caravelle', 'Caravelle Corto 2.0 TDI 84kW 114CV BMT', 8, 169);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f7b2f418-472e-468e-a3a9-d63d732dce35', 'RENAULT', 'Espace', 'Initiale Paris Energy dCi 118kW TT EDC', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b8370a35-e60c-43f2-a36b-2b166a4ad25f', 'HYUNDAI', 'Kona', '1.0 TGDI 48V N Line 4X2', 5, 116);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0f1a1622-3521-448e-8416-eec85b7d5e42', 'FIAT', 'Fiorino', 'Cargo Base N1 1.3 MJet 59 kW 80 CV', 2, 125);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a317e88e-792a-49c0-b2bd-ce8f8a1f31f5', 'MINI', 'CLUBMAN', 'ONE D', 5, 99);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c66637c8-d4af-4519-8a47-0e2b26fcf290', 'PORSCHE', 'Cayenne', 'EHybrid', 5, 58);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d9068886-ba16-4ffd-b562-02cb3cfba6f8', 'BMW', 'X4', 'xDrive20d', 5, 138);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('99f4c873-cbcb-4363-a09f-cdb3d5558bab', 'MAZDA', 'CX30', 'eSKYACTIVX 2.0 137kW Zenith', 5, 105);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c450d8c8-04f6-4eef-a052-e57fe71430b6', 'JEEP', 'Renegade', '1.3G 110kW Limited 4x2 DDCT', 5, 142);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7028b718-6154-4197-9b9b-b013a171e6ae', 'VOLKSWAGEN', 'Transporter', 'Furgon Corto T.Medio 2.0 TDI 102cv 2.8T', 3, 193);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('760557f2-a573-4fb4-8d8e-b1b07d27b7fb', 'PEUGEOT', 'Boxer', '435 L4 H2 BHDI 121kW 165CV SS 6 V. M', 3, 166);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4da2745c-b125-4d88-ab7e-4a2ca63fce50', 'SKODA', 'Kamiq', '1.5 TSI 110kW 150CV Sport', 5, 113);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('383220a6-27ab-466b-b8fc-6885da5e0c30', 'LAND-ROVER', 'Discovery', '2.7 TDV6 SE', 5, 249);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2ef89a19-f4de-46ad-93ad-69fb5dc8dd9b', 'FORD', 'Fiesta', '1.4 TDCi Trend', 5, 110);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6419749b-b98c-4117-be97-05d70da6f5d8', 'SKODA', 'Kodiaq', '1.5 TSI 110KW 150cv 4x2 Ambition', 5, 146);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('29880966-4191-48c4-a611-b39ea00ce82a', 'MERCEDES-BENZ', 'CLA', 'CLA 200 D DCT Shooting Brake', 5, 109);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0d86b3e8-ccf4-488b-b53a-94bf1e27d01a', 'OPEL', 'Mokka', '1.6 CDTi 4X2 SS Selective', 5, 106);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4f275bb0-061e-4f3f-82ba-3276fc25f0f7', 'PORSCHE', 'Cayenne', '3.0 S Hybrid Tiptronic', 5, 193);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2acab646-30f1-4ccf-bc94-f844d7ad11bd', 'BMW', 'X2', 'sDrive20i DCT', 5, 135);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d829f3e4-0870-42b4-8434-73207682cda7', 'SUZUKI', 'Swift', '1.3 DDiS GL 5p', 5, 122);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('48dd56cf-b353-4474-a737-e7b7cc0b5cfe', 'SKODA', 'Karoq', '1.5 TSI 110kW 150CV ACT Ambition', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('581eafc6-71b7-4bce-b0f8-39069193a172', 'MERCEDES-BENZ', 'GLA', 'GLA 180', 5, 144);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('826aee6b-bc31-4a2f-9652-1070777141f9', 'AUDI', 'Q3', 'Advanced 35 TFSI 110kW 150CV S tronic', 5, 131);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7002b5df-64f5-47b5-981b-ae930c60e784', 'AUDI', 'Q2', 'Sport 30 TDI 85kW 116CV S tronic', 5, 122);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8c39489f-b9ce-4ea9-9ee7-0d5f09ee33ce', 'JEEP', 'Grand Cherokee', '3.0 V6 CRD Limited 241 CV', 5, 218);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6726dbe3-1adf-45e9-a6f2-8155f5f4a39e', 'VOLKSWAGEN', 'Caddy', 'Profesional Kombi 1.4 TGI 81kW BM', 5, 126);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('826683bb-1a2f-4c53-86db-d83f6621f724', 'PEUGEOT', '508', 'GT 2.2 HDI 204cv Auto.', 5, 150);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('71728049-25c8-4c26-a97d-bf08ab4ef607', 'PEUGEOT', '807', 'ST Pack 2.0 HDI 136', 5, 188);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ee684689-3249-44ec-9ded-55158881a6b3', 'FORD', 'Grand C-Max', '1.6 TDCi 115 AutoStartStop Titanium', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a565e462-d604-43f2-9d23-f7406d3ddfc8', 'RENAULT', 'Master', 'Chasis Cabina P L3 3500 RG dCi 96kW E6', 3, 242);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('25802edb-a547-4dcd-882c-e7c7eeebd1fd', 'PEUGEOT', '607', '2.7 HDi Automatico Ebano', 5, 223);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6d36f524-d424-44de-88a8-7d26eafeec41', 'BMW', 'X2', 'sDrive18i', 5, 129);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ace68844-142e-4272-8410-04c83f59ed80', 'MAZDA', 'CX3', '1.5 SKYACTIV DE Style Nav 2WD', 5, 105);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9987e71b-afd9-4782-9e96-61f3e71b7c50', 'NISSAN', 'Micra', 'CC 1.6i 110 CV TEKNA Clm Ll16 Faros 6CD', 4, 160);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bd446187-e51d-4b70-92a8-3a9c6a0b9bb8', 'AUDI', 'Q3 Sportback', '35 TFSI 110kW 150CV S tronic Advanced', 5, 135);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2a1adafd-3433-4d97-8b17-0b16db9ca0db', 'AUDI', 'Q2', 'design ed 1.0 TFSI 85kW ultra S tronic', 5, 123);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b8b2823d-7013-423f-8eaf-55d83bd215aa', 'LAND-ROVER', 'Range Rover Sport', '3.0 SDV6 225kW Autobiography Dynamic', 5, 185);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('eaa72efd-0135-45cf-806b-060818b1179d', 'AUDI', 'Q2', 'Advanced 30 TFSI 85kW 116CV', 5, 115);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bac50629-b40c-4bb3-b6ed-136ea591b6de', 'OPEL', 'Zafira Tourer', '2.0 CDTi 165 CV Excellence Auto', 7, 154);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('edd4f9a0-174b-4e4f-ad65-adf66056ccfe', 'CITROEN', 'C-Crosser', '2.2 HDI 160 FAP Exclusive', 7, 194);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d5aefd13-2376-4fc7-aa8a-4e651e6db73e', 'OPEL', 'Grandland X', '1.2 Turbo Ultimate', 5, 116);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('68e33c1c-de09-48bb-a525-d886370a8325', 'MAZDA', 'CX3', '2.0 G 89kW 121CV 2WD Zenith', 5, 121);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c05d2855-7ed0-4589-8c85-c4a671092042', 'OPEL', 'Combo', 'Tour Expression 1.3 CDTI 90 CV L1 H1 EU5', 5, 136);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('33773f10-8022-4a9c-9cba-2adac0ea6bb6', 'CITROEN', 'Xsara Picasso', '1.6 HDi 110 LX Plus', 5, 136);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1ee2dae4-f72e-4a76-a33d-91a00ec250d4', 'AUDI', 'Q5', '2.0 TDI 170cv quattro DPF', 5, 175);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('da6c0506-f76f-4f8a-a32d-392199ea2819', 'FORD', 'Grand C-Max', '2.0 TDCi 140 Titanium', 5, 134);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4d7af791-7d2b-42a6-9867-edd1cb1c765a', 'BMW', 'X6', 'xDrive35i', 4, 262);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f8e9a5b2-0154-4347-b6ee-1e540b2890f5', 'SKODA', 'Superb', 'Combi 2.0 TDI 150cv Ambition', 5, 109);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5ac4491d-479d-4311-9b80-c3e8eb607f44', 'KIA', 'Stonic', '1.0 TGDi 74kW 100CV Drive', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('49fcb8d3-14bc-42dc-9cbd-26d2cfb9e7bb', 'VOLKSWAGEN', 'Caddy', 'Kombi PRO 2.0 TDI 110cv 4motion 5pl', 5, 171);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e60b7422-d618-4cc1-bd35-d004b6feac62', 'SUZUKI', 'Vitara', '1.4 TURBO S 4WD', 5, 127);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bc408ddf-07be-44e5-9709-98b7361cd81b', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 200 d 4MATIC', 5, 137);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9e38f76a-f31c-4c44-83ee-3ebfeed25ae2', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 250 d 4MATIC', 5, 131);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('947a202b-b66e-4486-a177-ba2273d45ce2', 'VOLVO', 'XC40', '1.5 T2 Momentum', 5, 142);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8790e233-75c1-4501-bccb-44d78be7aa97', 'DACIA', 'Logan', 'MCV Ambiance 1.2 55kW 75CV EU6', 5, 130);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('109d31ce-d435-4e9f-b739-5cdf79560b4f', 'MAZDA', 'CX3', '2.0 G 89kW 121CV 2WD Origin', 5, 121);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fdeb4265-f89e-44ee-8be0-60e8a2741235', 'OPEL', 'Movano', '2.3 CDTI 81kW 110CV L2 H2 F 3.5t', 3, 204);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b7ebe714-6f6c-4697-8af2-132ed6226e38', 'TOYOTA', 'Verso', '140 MDRV Advance 7pl.', 7, 159);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7d3203c5-02de-44c8-af16-3dbb124ffacf', 'MERCEDES-BENZ', 'Clase V', '200 d Avantgarde Largo', 6, 179);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0fc0ef6c-b324-47a4-9745-b3a85ab75a8c', 'FORD', 'Grand C-Max', '1.0 EcoBoost 125 Auto StartStop Edition', 5, 118);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e710df41-3b47-4df1-ba72-8626ab73b1c3', 'KIA', 'XCeed', '1.4 TGDi Tech 103kW 140CV', 5, 142);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('46bbe3ed-487f-45c3-ae57-d6061859310f', 'CITROEN', 'C4', '1.6 HDi 110 Collection', 5, 125);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1667a619-9f24-4173-89e3-675dad9c89ae', 'CITROEN', 'C5 Aircross', 'BlueHdi 96kW 130CV SS EAT8 Feel', 5, 106);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0b6a2795-ae94-44e3-8ee7-e312b77d5161', 'BMW', 'Serie 3', '320i', 4, 157);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ae7428ce-33b8-4031-8fd6-71ce163fddc9', 'VOLKSWAGEN', 'T-Roc', 'Advance 1.0 TSI 85kW 115CV', 5, 118);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2816a123-9af7-44c6-8567-bbf524c7437b', 'DS', 'DS 3', 'BlueHDi 100cv SS Desire', 5, 87);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5460c45e-b233-436b-85df-1bcce3fca97b', 'HONDA', 'HR-V', '1.6 iDTEC Elegance', 5, 104);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ef66d937-745e-4747-bef2-ec9932c27e58', 'TOYOTA', 'Land Cruiser', '2.8 D4D GX', 5, 200);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('59ccf69d-2975-4712-bc18-d23255765aeb', 'BMW', 'X6', 'xDrive40d', 5, 163);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('febed0f2-540b-4690-9d4e-e1a716b95945', 'JAGUAR', 'XF', '2.0D 132kW 180CV Prestige Auto', 5, 114);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3e72d804-c799-4f64-9e29-f004136fe381', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 118kW 160CV Stelvio RWD', 5, 138);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7841aef3-d4c3-4082-8007-770b6123f1eb', 'SUZUKI', 'Grand Vitara', '1.9 DDiS JXA', 4, 195);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e147c1c9-ee77-434f-a5c2-35c28652bb61', 'SKODA', 'Spaceback', '1.6 TDI CR 90cv Ambition Spaceback', 5, 114);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f6355952-12a0-401d-ae93-0b5a8116379e', 'LAND-ROVER', 'Freelander', '2.2 Td4 S StopStart 150cv', 5, 165);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('18069758-5d99-40ff-bcfb-1cd6eca87c91', 'AUDI', 'S3', 'Sportback 2.0 TFSI S tronic quattro', 5, 195);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3bae0503-64ea-4f67-9ad2-1040cadbf58d', 'PEUGEOT', '5008', 'Business Line 1.6 HDI 112 FAP', 5, 139);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('766931cd-4d69-4e63-a818-5e1d5eff6454', 'RENAULT', 'Espace', 'Intens Energy dCi 96kW 130CV ECO2', 5, 116);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3d697eac-1a8d-4f12-8f67-43466e3b7165', 'FORD', 'Ranger', '2.5 TDCi 4x4 Doble Cabina XL', 5, 255);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('cf3105e5-d818-4730-a139-2645af062389', 'FORD', 'Transit Custom', 'Kombi 2.0 TDCI 77kW 320 L1 Trend', 9, 168);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c0242358-0cae-4f28-985c-858c28f35fb2', 'FIAT', 'Fiorino', 'Cargo Base 1.3 Mjet 59kW 80CV E6', 2, 115);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0ee183e2-7a87-4bd0-a9db-4dc9528a8412', 'FIAT', '500L', '1.3 16v Multijet II 85 CV StartStop', 5, 110);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a977dc07-a290-4443-88ee-652a02631dec', 'PORSCHE', 'Cayenne', 'Diesel', 5, 173);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3a321c9b-1f1a-4ce0-92f1-d1bdc5d4029c', 'JEEP', 'Compass', '2.2 CRD Limited Plus 4x2', 5, 161);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('cdc915ff-5b7c-4a11-b286-75b0ac6a1a0e', 'VOLKSWAGEN', 'T-Cross', 'First Edition 1.0 TSI 85kW 115CV', 5, 112);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('86bf435e-fd5e-4853-9046-98d415adb9fb', 'RENAULT', 'Master', 'Furg. DC T L3H2 3500 dCi 96kW 130CV', 7, 207);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2832aa89-34f4-49fe-824d-e978dd4af40b', 'PEUGEOT', '307 SW', '1.6 HDi 110 FAP DSign', 5, 134);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d2658b7b-90ca-48a3-bdbe-d925153134f9', 'VOLKSWAGEN', 'Transporter', 'Kombi PRO Corto TM 2.0 TDI BMT 140CV', 2, 184);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2e86e12f-a2b4-41b5-bc38-8129647c1f5e', 'MERCEDES-BENZ', 'Clase GLA', 'GLA 220 d 4MATIC AMG Line', 5, 127);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8f440154-384d-4d50-8143-31858cf48816', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 110kW 150CV Super RWD', 5, 124);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e5e90790-6ab8-4dc6-8f8c-0026cd95b5b3', 'CITROEN', 'C5 Aircross', 'BlueHdi 96kW 130CV SS EAT8 Feel', 5, 105);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bc69e86f-6f6a-499b-890b-4a5acb032c23', 'CITROEN', 'C5', '1.6 HDi 110cv CMP Business', 5, 120);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d12d96ac-87b1-4cfa-94d3-26b3d222e4d6', 'SEAT', 'Tarraco', '2.0 TDI 110kW 150CV SS Style Plus', 5, 129);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9e93e4c2-c843-4b26-8535-a7f9d0b2e4be', 'VOLVO', 'XC40', '2.0 D3 Momentum Auto', 5, 131);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8496e081-86d7-46e2-9e4c-858c78ada4ce', 'PEUGEOT', '208', 'PureTech 73kW 100CV EAT8 Allure Pack', 5, 99);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d5603311-f3f7-447c-87fa-841ecc096e4a', 'AUDI', 'A7', 'Sportback 3.0 TDI 218CV quattro S tronic', 4, 136);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f97c3e16-fb4d-487d-8018-1e888237bc57', 'DODGE', 'Caliber', '2.0 CRD SXT Limited', 5, 161);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0c79d8f7-3637-4ef9-b6ac-055100bcb787', 'FORD', 'C-Max', '1.6 TDCi 90 Ghia', 5, 127);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('420fb5c5-35fd-496d-8bf9-d3259e4974cc', 'FIAT', 'Punto', '1.2 8v Lounge 69 CV Gasolina SS', 5, 119);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('47487ce7-c299-4800-8e3d-f31ba068da27', 'PORSCHE', 'Cayenne', '3.0 TD Tiptronic', 5, 189);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b29b0d4e-01c8-47c5-9666-68322f3a7463', 'MASERATI', 'Ghibli', 'GranSport 2.0 L4 HybridGasolina 243kW', 5, 161);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5133b500-cee2-415c-bac9-5d95301c7117', 'MAZDA', 'CX-5', '2.0 GE 121kW 165CV 2WD AT Newground', 5, 150);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('abbebbc5-ce54-41d7-975b-9808b02816a4', 'SEAT', 'ALTEA', '1.9 TDI HOT', 5, 149);

INSERT INTO cars (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('65541eff-6692-4507-8712-687ba5c9e371', 'FORD', 'Focus', '2.0 TDCi Sport', 5, 148);