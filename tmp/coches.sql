CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS coches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand VARCHAR(100)     NOT NULL,
    model VARCHAR(100)     NOT NULL,
    version VARCHAR(255),
    seating_capacity INT,
    co2_emissions_grams_per_km INT
);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5051f04e-d2f2-44ea-ae66-9c3a32f8ef94', 'JEEP', 'Patriot', '2.0 CRD Limited', 5, 180);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5f2b4982-c73e-4626-bfdc-db8b317c82f5', 'OPEL', 'Crossland X', '1.2 96kW 130CV Innovation Auto', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('972d9da8-2efb-44f6-abed-2452daeb1f62', 'SEAT', 'Alhambra', '2.0 TDI 177 CV StartStop Style DSG', 5, 154);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('46ce594c-2db7-4b19-8c46-de15d5b56316', 'VOLVO', 'XC90', '2.0 T8 AWD Inscription Auto', 7, 50);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7aef3442-48cc-435a-8bb5-9b0f1b461e8f', 'LAND-ROVER', 'Range Rover Sport', '3.0 TDV6 258cv HSE', 5, 194);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('649aebf3-467e-4dbc-8c78-be02861364bc', 'AUDI', 'Q3', 'S line 35 TDI 110kW 150CV S tronic', 5, 123);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('26d533d2-ea06-4b0e-a78e-2e361ad8b9d1', 'HYUNDAI', 'Kona', '1.0 TGDI 48V Maxx 4X2', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5f240b52-c16a-4b99-9cb5-b15b8b0a4b58', 'VOLKSWAGEN', 'Crafter', '35 Furgon BM TA L3H3 2.0TDI 103kW140CV', 3, 189);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9b920e61-b318-454b-9a75-b547120305fb', 'JAGUAR', 'Fpace', '2.0L i4D 132kW RSport Auto', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('cc65fb7a-857c-4e23-a69e-e820aca9bc36', 'VOLVO', 'XC90', '2.0 D5 AWD Momentum Auto', 7, 149);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bc0161c0-dcd3-4b4f-b930-354198162ea4', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 220 d 4MATIC', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('356c8be5-1350-4fc9-b204-232ccb7991fd', 'OPEL', 'Grandland X', '1.2 Turbo 120 Aniversario', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d25af6b7-db3f-48d2-a6a4-9c2d76c4db76', 'OPEL', 'Crossland X', '1.6T 73kW 99CV Selective', 5, 102);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d844f9ca-7280-4a14-a3aa-bbacbc13471c', 'HYUNDAI', 'Kona', 'KONA TGDI 1.0 120CV 4X2 KLASS', 5, 124);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0ee41450-a136-4813-9c73-4aae34664a61', 'BMW', 'X4', 'xDrive20d', 5, 132);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9087a287-90db-4d5f-af67-ee0ac93774f9', 'BMW', 'X2', 'sDrive18d', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fb7d6fba-7e6f-40e3-b89d-66bb288b4b52', 'CUPRA', 'Formentor', '1.5 TSI 110kW 150 CV DSG', 5, 126);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9f259169-4fd0-4b48-b3c0-96defdf2aca5', 'VOLKSWAGEN', 'Crafter', '35 Furgon BM TN L3H2 2.0TDI 103kW140CV', 3, 202);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('48da468f-a52d-4c2a-b42c-600ab0470ecb', 'VOLKSWAGEN', 'T-Cross', 'Advance 1.5 TSI 110kW 150CV DSG', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('08d7dedb-0573-452b-b1b8-a53440f14197', 'BMW', 'X1', 'sDrive18d', 5, 128);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('72df72b9-4f93-477f-8af7-685d1b1f3a1f', 'FORD', 'Transit', '350 100cv L3 Ambiente Traccion Delantera', 3, 203);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3b9d2bda-8861-4c2d-981b-e0089a87db49', 'FIAT', '500X', 'Cross 1.0 Firefly T3 88KW 120 CV', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bbff898c-eca5-426e-8b28-b0e648b5d9d5', 'VOLVO', 'XC90', '2.0 B5 D AWD Momentum Pro Auto', 7, 147);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3a99593c-7ccd-4196-9411-d6c06046fb88', 'VOLVO', 'V60', '2.0 D2 Momentum', 5, 101);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fed53d84-8810-4106-a9b1-83a6a37dfaba', 'RENAULT', 'Kangoo Combi', 'Limited M1AF Blue dCi 70 kW 95 CV SS', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d6884d2f-0eb1-476e-9490-2127aa0f3623', 'MERCEDES-BENZ', 'Citan', '109 CDI Furgon Extralargo BE', 2, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e3599989-3e62-421c-a4f5-c2e4541fc12a', 'VOLVO', 'XC60', '2.0 B4 D Core Auto', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8be841eb-f674-46f4-b121-9d6650c6947d', 'LAND-ROVER', 'Freelander', '2.0TD4 E ', 5, 240);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b965cb9b-9576-4d05-8913-91128ecdc88e', 'SAAB', '9-3', 'Sport Hatch Linear Sport 1.9 TiD', 5, 159);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('756f3ad7-e76b-4d66-a1df-d10b5bcd37c1', 'VOLKSWAGEN', 'T-Roc', 'Sport 2.0 TDI 110kW 150CV', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('abe5f443-da14-46bc-91a9-32fca403eedc', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 350 d 4MATIC', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2c06cb3a-2b86-4fdc-975f-f7b8ff73ec65', 'SSANGYONG', 'Tivoli', 'G16 Line 4x2', 5, 154);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('32c00bd8-24f1-4030-acc0-56793a17a322', 'FORD', 'Puma', '1.5 Ecoblue 88kW 120cv Titanium', 5, 99);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('780fe5bc-7111-42c6-98d8-ac6e5724f02f', 'CITROEN', 'C5 Aircross', 'PureTech 96kW 130CV SS C Series', 5, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('791a2000-05c9-42d0-a065-15f0745d1e4a', 'MAZDA', 'CX-3', '2.0 G 89kW 121CV 2WD Evolution Design', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('518470eb-f85f-4816-ab72-34c2ec36f4b5', 'MAZDA', 'CX30', 'SKYACTIVG 2.0 90 kW 2WD Zenith', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d143ace4-a7a7-4f8d-9c92-db199716d92a', 'FIAT', 'Punto', '1.3 Pop 75 CV Multijet E5', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d1ad00e0-55cf-4679-8d1d-28d3fd2752f5', 'RENAULT', 'Master', 'Combi 9 L2H2 3500 E dCi 107kW 145CV', 9, 200);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f54c98ee-f74b-4adf-b5ad-4395da8d62ca', 'FIAT', 'Talento', 'N1 1.0 Base Corto 1.6 MJet 88kW 120CV', 3, 170);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d62a5fa2-94b2-4d8a-b8b1-6e0b9c99aa7d', 'JEEP', 'Compass', '1.4 Mair 125kW Limited 4x4 ATX', 5, 160);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('90cf851c-f3e9-456a-8c75-d525fec24e63', 'AUDI', 'Q3', '40 TDI 140kW S tronic Quattro Advanced', 5, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bd45a394-2cd7-4203-804c-1e4ff0f57a96', 'FIAT', '500', 'Dolcevita 1.0 Hybrid 51KW 70 CV', 4, 88);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6bec0bb4-2123-49df-b601-fff7a370415d', 'JAGUAR', 'XE', '2.0 Diesel 132kW RWD Prestige Auto', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7c4716a8-2592-4a6d-b710-3f70f67468b5', 'VOLKSWAGEN', 'Sharan', '2.0 TDI 140cv DSG Edition', 7, 149);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('56a4fd26-64cf-454d-b08b-c50c35b8e242', 'JEEP', 'Renegade', 'Limited 1.6 Mjet 956kW 130CV 4x2', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d4dfd008-9c30-428c-b7a9-36c994c2d050', 'OPEL', 'Zafira Tourer', '2.0 CDTi SS Excellence', 7, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d30e0a02-2b1e-466a-bf03-e709078f3d80', 'LAND-ROVER', 'Range Rover Sport', '3.0 SDV6 306cv HSE Dynamic', 5, 185);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9d8d9632-1666-42c7-aa2f-84b6fe7e8083', 'MERCEDES-BENZ', 'Clase GLK', 'GLK 250 CDI 4M Blue Efficiency', 5, 168);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('03468b21-88dc-4da9-a24b-4c01f221c58a', 'KIA', 'Sorento', '2.5 CRDi EX2', 5, 226);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dd9b62ab-086e-414a-8d95-5296d43a5abc', 'FORD', 'Grand C-Max', '1.6 TDCi 115 Trend', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d5b44f2d-f20a-4871-b67c-8e636476aec9', 'AUDI', 'Q3', 'Advanced 35 TFSI 110kW 150CV', 5, 140);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1a075539-7c0e-447b-a1dd-be041c892495', 'ALFA ROMEO', 'Stelvio', '2.0 Gasolina 148kW 200CV Super Q4', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4fdf9b0d-69c6-40c5-97e9-7370a12ff769', 'JAGUAR', 'E-Pace', '2.0D 110kW RDynamic S', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9c9cecad-e89b-4bfe-a34c-ac485a8e1f2f', 'AUDI', 'A4', 'Avant 2.0 TDI 143cv DPF', 5, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f7ae6569-af62-484d-a16a-767f1b5472d0', 'CHRYSLER', 'Sebring 200C', '2.0 CRD Touring', 5, 170);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3f42a801-0ca0-4fa8-8ce2-ed8f348fc868', 'NISSAN', 'Almera', '2.2 dCi 112CV Line Up', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('de3f160d-088a-4ec1-8787-036857af3a28', 'OPEL', 'Grandland X', '1.2 Turbo Design Line', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5fae4468-2b21-4657-9caa-1fdcb115e57f', 'PEUGEOT', 'Expert', 'Furgon Pro 2.0 BlueHDi 120 SS Long', 2, 143);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2ace8b61-15c5-4f4b-acd3-35426ae87b58', 'PEUGEOT', 'Expert', 'Furgon Pro 1.6 BlueHDi 70KW 95Standard', 2, 144);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e1a35887-9b94-4d32-aa38-a2e5a59270ca', 'AUDI', 'Q2', 'Design 30 TFSI 85kW 116CV', 5, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('41999442-2285-45de-8906-cae6abbb235f', 'SEAT', 'Exeo', 'ST 1.8 TSI 120 CV Reference', 5, 172);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a017efcc-e451-4c81-bf16-e584822cfdf9', 'VOLKSWAGEN', 'Crafter', '30 Furgon BM TN L3H2 2.0TDI 75kW 102CV', 3, 187);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b8fede08-835e-4009-9c59-936e96563420', 'OPEL', 'Mokka', '1.2 T 96kW 130 CV Business Elegance', 5, 103);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('daf74d9b-8942-4479-88f8-f4cd6bc7af1d', 'RENAULT', 'Master', 'Fu. P L4H3 3500 RG E B dCi 121kW 165CV', 3, 225);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('302827b2-494e-461e-bf4a-348398de00b8', 'JEEP', 'Renegade', '1.6 Mjet 88kW 120CV Night Eagle 4x2', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6f0557af-ce5f-4f9a-9a00-f295798da098', 'MINI', 'CLUBMAN', 'ONE D', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('04e3221f-5c66-4f0a-9a5f-87eade7460e8', 'SEAT', 'Arona', '1.6 TDI 70kW 95CV Style Ecomotive', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('50eb4309-4109-4d4b-9f70-97df70ec1add', 'FIAT', '500X', 'Urban 1.3 MultiJet 70KW 95 CV 4x2 SS', 5, 105);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('538299ba-f21a-4b90-9dae-7934fce88ac1', 'FIAT', 'Linea', '1.4 16v 77cv Dynamic Gasolina Fire E5', 5, 148);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4847f7c4-361c-41f2-bddc-08efac445f50', 'MERCEDES-BENZ', 'CLA', 'CLA 200', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a9ccc9ba-fd19-4cb3-9f8b-fac04040157e', 'CITROEN', 'Grand C4 Picasso', 'PureTech 130 SS 6v Feel Edition', 7, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0b61c429-228a-497e-a299-f66badcdeeea', 'RENAULT', 'Master', 'Furg. DC T L3H2 3500 B dCi 100kW 135CV', 6, 187);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3a2206ed-bba9-42fc-936d-b31e3362214f', 'BMW', 'X4', 'xDrive20d', 5, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2ef8d3b0-0adb-498c-b0c9-f573c7d3e7ae', 'FORD', 'Ranger', '2.2 TDCi 118kW 4x4 Doble Cab. XL SS', 5, 184);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a41afa4c-ad15-459c-a655-e2b645cb2bb1', 'ABARTH', '500', '1.4 16v TJet 595 107kW 145CV E6', 4, 155);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('22ddb086-13f7-4a4f-ac09-99e3b332df4a', 'OPEL', 'Mokka X', '1.4 T 103kW 140CV 4X2 SS Ultimate', 5, 140);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dcc9753e-16c8-411c-a456-e61f2c4d4613', 'VOLKSWAGEN', 'Crafter', '30 Furgon BM TN L3H2 2.0TDI 103kW140CV', 3, 189);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c4a6959e-2d4f-4e57-91e0-6308b80d63c3', 'DACIA', 'Logan', 'Ambiance 1.2 16v 75cv E5', 5, 135);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8934749c-4182-4521-b42d-793b87096685', 'CUPRA', 'Formentor', '1.5 TSI 110kW 150 CV', 5, 123);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f8736c85-0087-48b0-9341-3a90ed8aea15', 'AUDI', 'Q3', '2.0 TDI 150CV', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('143a01b9-b9a5-417c-89f3-68f8dc6fe1c5', 'FIAT', '500X', 'Dolcevita Club 1.0 Firefly 88KW 120CV', 5, 130);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0efa2bb1-c8c5-4612-80c9-feaa21e56ec6', 'BMW', 'Serie 2', '220i', 4, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('15f29331-d604-4b0f-83cd-b8af796b42d3', 'MERCEDES-BENZ', 'Clase GLA', 'GLA 220 d', 5, 145);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('eb8fe260-a4c7-4497-896f-1505ae3cfc97', 'VOLKSWAGEN', 'Arteon', 'RLine 2.0 TDI 110kW 150CV DSG', 5, 110);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('22925503-f0ef-4c1f-aaad-d15cebedbd25', 'BMW', 'Serie 4', 'M4 CS', 4, 197);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('aed42686-6279-4209-b405-5d1a3b19a6af', 'FORD', 'Tourneo Courier', '1.5 TDCi 95cv Ambiente', 5, 104);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c57c41d0-e057-4acd-8fef-636ed1a0c81f', 'PORSCHE', 'Panamera', '4S Diesel', 4, 176);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f4a17153-67b1-43e8-95dd-f932c10bd9d8', 'AUDI', 'A7', 'Sportback 3.0 TDI 272 quat S tron S line', 4, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c06b10a9-878b-45f0-aa44-40c9bba31064', 'FIAT', '500', '1.2 8v 69 CV Lounge', 4, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a0e48159-b5fd-441c-be91-c5bf934778b5', 'JEEP', 'Grand Cherokee', '2.7 CRD Laredo', 5, 255);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bace88cd-3aad-4406-bb84-179cf139c264', 'VOLVO', 'XC40', '2.0 D3', 5, 128);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e9917422-4192-409d-be90-6b764954d3cb', 'AUDI', 'Q3', 'Black line 35 TFSI 110kW 150CV S tron', 5, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2e20e375-b953-4492-84ac-1136fec0afd2', 'MERCEDES-BENZ', 'Citan', '111 CDI Tourer Plus Largo', 5, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e6039314-030d-4307-8099-fafd0d0417ef', 'MERCEDES-BENZ', 'CLA', 'CLA 250 e', 5, 31);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9f3afeeb-66a7-497d-a964-3160803bec2c', 'LEXUS', 'IS', '300h F Sport  Navibox', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('79402c7d-8f5e-4215-a141-0e32bb5a33dd', 'FIAT', 'Ducato', '33 Medio Techo Alto 2.0 Mjet 85kW 115CV', 3, 162);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('36870b4c-be24-4710-ba76-1fadf99b446f', 'FIAT', '500C', '1.2 8v 69 CV Sport', 4, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a49b6384-b222-4642-b722-c9b7f7008063', 'DACIA', 'Dokker', 'Van Ambiance dCi 90', 2, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('95b1cf15-d426-4b05-b5dd-c8faa28c2ba4', 'VOLKSWAGEN', 'Transporter', 'PRO Furgon Largo TM 2.0 TDI 114 BMT 2.8T', 3, 176);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dd2cddc4-ba72-49c5-b088-487045334248', 'BMW', 'Serie 2', '218d', 4, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('71c9ce21-c32e-4b23-b048-320b2c05e23c', 'SEAT', 'Ateca', '1.5 TSI 110kW 150CV StSp FR', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('39c5376f-8629-436b-87e8-ffa53e2ef395', 'CUPRA', 'Formentor', '2.0 TDI 110kW 150 CV', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1fd499bc-8126-42c4-8152-3994c0c84fa4', 'ABARTH', '500', '595 Scorpioneoro 1.4 16v 121kW E6D', 4, 157);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a57d1fed-e639-4f2a-8e0a-a64032113a04', 'VOLKSWAGEN', 'T-Roc', 'Advance 1.6 TDI 85kW 115CV', 5, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f82acf35-3154-41d4-ae2d-85fbd3043be1', 'VOLVO', 'XC90', '2.0 T8 AWD Recharge Inscription Exp Auto', 7, 47);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d820a2f9-f138-4bf9-a0c8-f0aace157649', 'FIAT', 'Doblo Cargo', 'Cargo Base 1.6 Multijet 105cv E5', 2, 143);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4d740553-0459-4f5c-acda-aa55f15b95bb', 'AUDI', 'Allroad Quattro', '3.0 TDI quattro tiptronic', 5, 232);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2000ee81-a9e9-4ffc-8ac2-9ca812abd447', 'AUDI', 'Allroad Quattro', '2.7 TDI quattro tiptronic DPF', 5, 229);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6cea2b8c-4d44-45f9-880b-6c23677e1043', 'SKODA', 'Octavia', 'Combi 2.0 TDI CR 184cv RS', 5, 117);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fb3a0990-e590-4c86-9572-9d4e404d6c61', 'PORSCHE', 'Cayenne', '4.8 S Tiptronic', 5, 245);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8e05eee0-5c2c-40e0-a69a-ef7d2a26dcc2', 'FIAT', 'Punto', '1.3 Young 75 CV Multijet E5', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('670beb36-904d-4a54-96b7-190b77d51676', 'VOLKSWAGEN', 'T-Roc', 'Edition 1.6 TDI 85kW 115CV', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('54bfda50-3f8c-47c3-83b9-0974c68dc7c6', 'FIAT', '500', '1.2 8v 51kW 69CV Lounge', 4, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('47b82f7d-36e2-4163-975a-224bd5a6d71b', 'AUDI', 'Q3', 'Advanced 35 TDI 110kW 150CV S tronic', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ed2c0c61-3101-4b58-b3d6-337c7e52b932', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 140kW 190CV Executive RWD', 5, 138);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('72159220-af13-44fd-aef5-89f09da77824', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 154kW 210CV Veloce Q4', 5, 146);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d04468bd-a8da-4283-ae25-35f360dc3936', 'KIA', 'Picanto', '1.1 SOHC EX', 5, 124);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('62ead911-74f4-45ab-9910-facabd74c90c', 'PEUGEOT', '307 SW', '1.6 HDi 90 Pack', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ca9634ab-ab56-4611-9e6f-6c958f2cf0b6', 'HYUNDAI', 'Kona', '1.0 TGDI Tecno 4X2', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('39f9d331-3b77-4e51-9b41-6a6b37f32880', 'JEEP', 'Compass', '1.6 Mjet 88kW Limited 4x2', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5fcd2418-a779-49fe-8da3-bb3471771111', 'HONDA', 'HR-V', '1.5 iVTEC CVT Elegance', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('13f1b893-d2df-4141-b55a-1a29e32a236a', 'VOLKSWAGEN', 'New Beetle', '1.6 Auto', 4, 199);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0b7dced4-e87d-44e9-93c5-52d92eac011b', 'BMW', 'X1', 'sDrive20d EfficientDynamics Edition', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5dc5e58f-cf16-4f29-95f5-97c871ebfef4', 'JAGUAR', 'E-Pace', '2.0D 110kW Chequered Flag 4WD Auto', 5, 158);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a1faa21b-5afa-4658-84dc-2ddf77ba56b8', 'MERCEDES-BENZ', 'Citan', '109 CDI Tourer Select Largo', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a26f7a17-b068-41ae-b47f-ccaa7a28450e', 'VOLVO', 'XC40', '2.0 D3 Momentum', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('91c185e0-737e-4a77-b4d1-ea336dfacd66', 'SKODA', 'Superb', 'Combi 2.0 TDI 110KW 150cv Ambition', 5, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c2faacaf-732e-4acf-bf96-eff3e5246783', 'RENAULT', 'Grand Espace', 'Exception 2.0 dCi 175CV Auto', 6, 217);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4e336f54-a4b8-40d6-b421-ad5dbb10e3ff', 'CITROEN', 'Berlingo', 'Multispace 20 Aniv. PureTech 81KW110CV', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('776629ea-499d-4ca8-835d-79836a83c252', 'FIAT', 'Doblo Cargo', 'Base Maxi 1.6 Mjt 105 E5 Carga Aumentad', 2, 144);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bc27cf09-ab95-46cf-bc63-5c4245b05ebf', 'VOLKSWAGEN', 'Arteon', 'Elegance 2.0 TDI 110kW 150CV', 5, 107);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d2f51290-f875-4bc4-af2f-c3d1d1be1d74', 'VOLVO', 'XC90', '2.0 D5 AWD Inscription Auto', 7, 152);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7fb8db3d-dddf-494c-8ba2-940ef0ef5ff3', 'DS', 'DS 3', 'EHDI 90 Techno Style', 5, 95);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a5364b99-29e7-4b91-913b-15196573d819', 'OPEL', 'Mokka', '1.4 T 4X2 SS Excellence', 5, 145);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('be946687-1d07-46a9-b872-6af85d05b9a9', 'RENAULT', 'Kadjar', 'Intens Energy dCi 96kW 130CV', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('41a7b619-b4a1-4b1a-aef4-684d1e9b90cb', 'FORD', 'Transit Custom', 'Van 2.2 TDCI 125cv 330 L2 Trend', 3, 197);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('39180b58-3b40-4481-84b0-115875f0f772', 'HYUNDAI', 'IONIQ', '1.6 GDI HEV Tecno DT', 5, 85);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b7c8f9a6-b0e2-40b3-ad7a-4713239913ea', 'PEUGEOT', 'Boxer', '435 L4 BHDI 121kW 165CV SS 6 Vel. MAN', 3, 186);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5b713b26-a881-49d3-9321-4526ee62ab07', 'MINI', 'CLUBMAN', 'COOPER SD AUTO', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c49d2df0-1493-4547-9258-1413352ba302', 'OPEL', 'Grandland X', '1.2 Turbo Design Line', 5, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('08a25f07-3ba7-4384-9d26-a48f92b3ecab', 'KIA', 'Picanto', '1.0 CVVT 49kW 67CV Concept', 5, 101);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5a00e64c-6b57-4b93-b5d7-03ac7987a497', 'FORD', 'Transit Courier', 'Kombi 1.5 TDCi 95cv Ambiente', 5, 104);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('01acbd42-96e1-4654-b232-a45d4f901b74', 'VOLVO', 'V60', '2.0 D3 Momentum Pro', 5, 117);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5963a55c-fb74-4b02-a3e5-5d4d454aacf1', 'RENAULT', 'Grand Espace', '25 Aniversario 2.0 dCi 150CV FAP', 6, 193);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3d2f4039-e212-4d3b-8501-5332b84a3ed0', 'NISSAN', 'QASHQAI+2', '1.5 dCi ACENTA 4x2', 7, 149);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d3a1dba3-1dee-45b5-b8cb-8de5ed133516', 'HYUNDAI', 'Tucson', '1.7CRDi 104kW 141CV BD TecnoSky DCT4x2', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bfe0c742-a262-4f14-93b6-c66590bfc96f', 'AUDI', 'TT', 'Coupe 1.8 T 190CV', 4, 194);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1e26fb0e-3216-46ad-b6b7-06b9540b5eac', 'HYUNDAI', 'Kona', '1.0 TGDI Essence 4X2', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ff4f1ba8-041b-47f5-a0b9-a21ece7f25e2', 'MERCEDES-BENZ', 'Clase CLA', 'Mer.AMG CLA 45 4M OrangeArt E Shoot. B.', 5, 162);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('08e0f9c4-1502-4a34-9faf-d03b0f3e05bd', 'MERCEDES-BENZ', 'Clase V', '250 d Avantgarde Extralargo', 6, 156);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('43599f68-3eef-4ebb-86d8-88d83409d578', 'VOLKSWAGEN', 'T-Roc', 'Sport 2.0 TDI 110kW 150CV DSG', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e640fd61-7ce8-4c7c-813a-78ea5d13d966', 'SKODA', 'Kamiq', '1.0 TSI 85kW 115CV Ambition', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('086758ff-fe3c-4aa7-8fb1-8d6e7956a6b7', 'AUDI', 'Q3', 'Advanced 35 TFSI 110kW 150CV S tronic', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8a11b4bc-7d3b-4a05-9d39-8a86808939bd', 'VOLKSWAGEN', 'T-Roc', 'Advance Style 2.0 TDI 110kW DSG', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('62e04914-7e4f-4e3c-aa77-1c932ffb91b3', 'RENAULT', 'Kangoo Furgon', 'Profesional dCi 55kW 75CV Euro 6', 2, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('60d393c9-3bc3-47ac-a0e1-e4684129b273', 'MAZDA', 'CX-3', '2.0 G 89kW 121CV 2WD AT Zenith', 5, 140);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('597e7353-bb75-4b7b-a22c-4abb15f93677', 'VOLVO', 'V60', '2.0 D3 Momentum Core Auto', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e9503b9e-0ac4-4e07-90ea-0fcf65b2f4e7', 'CITROEN', 'C5 Aircross', 'BlueHdi 132kW 180CV SS EAT8 Feel', 5, 124);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('24f06f68-2a7d-4e86-af8b-9699d177b29c', 'MERCEDES-BENZ', 'Clase V', '220 d Clase V Compacto', 6, 157);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('db107334-9580-45ea-9276-77020655cfe6', 'CITROEN', 'C4 Spacetourer', 'PureTech 96KW 130CV SS 6v Live', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('09a8bca3-cdee-4831-bbc0-c97beb0ec7a9', 'CITROEN', 'C5 Aircross', 'PureTech 96kW 130CV SS Live', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('860c32da-b201-4c9a-a3b9-549f5c185a5e', 'MITSUBISHI', 'Outlander', '2.4 PHEV Kaiteki Auto 4WD', 5, 40);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f8c67c3c-d57a-4e7f-915b-84bff71deffe', 'CITROEN', 'C4', '1.4 16v Collection', 5, 153);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('095ea092-e209-4262-89d7-d99f55ed50f0', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 220 d 4MATIC', 5, 137);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('44292d5b-94ae-4141-b6af-5849429a4da7', 'BMW', 'Serie 4', '440i xDrive', 4, 169);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('cdf504a4-7566-40fa-9da0-5e4c81414cfe', 'RENAULT', 'Kangoo Combi', 'Expression N1 Energy dCi 110', 5, 123);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f9f28dfe-0833-4d2d-a786-2cfcfaa0ac69', 'DS', 'DS 7 Crossback', 'PureTech 96kW 130CV BE CHIC', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2823540c-a01a-449c-abdd-ee1938bacd3a', 'MERCEDES-BENZ', 'Clase SLK', 'SLK 200 K', 2, 209);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('fd0ec65b-d050-4e3a-a567-67d242e3e98e', 'VOLKSWAGEN', 'Crafter', '35 Furgon BM TA L3H2 2.0TDI 103kW', 3, 189);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5d38cdaa-95c6-4cee-a7f6-e4e4d830c935', 'VOLKSWAGEN', 'Caravelle', 'Caravelle Corto 2.0 TDI 84kW 114CV BMT', 8, 169);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6bc756e0-2109-4a83-b7dd-1de0da46e74d', 'RENAULT', 'Espace', 'Initiale Paris Energy dCi 118kW TT EDC', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0822af3b-402a-42f5-910e-d3ba3924445b', 'HYUNDAI', 'Kona', '1.0 TGDI 48V N Line 4X2', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2d25d5e5-9d91-498f-a8f3-f9f318b6ba35', 'FIAT', 'Fiorino', 'Cargo Base N1 1.3 MJet 59 kW 80 CV', 2, 125);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('53378a78-848e-498d-b111-7eab5feaa869', 'MINI', 'CLUBMAN', 'ONE D', 5, 99);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('da8bed1b-3b0a-4079-b94a-fecf10451ed9', 'PORSCHE', 'Cayenne', 'EHybrid', 5, 58);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8e13ee9e-9be0-4a49-9f22-45cf5502fbbe', 'BMW', 'X4', 'xDrive20d', 5, 138);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('57159ace-4b9d-4a52-a4b9-053b0adff6b7', 'MAZDA', 'CX30', 'eSKYACTIVX 2.0 137kW Zenith', 5, 105);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('dcfe9348-3245-42ef-8eac-f738b86c493c', 'JEEP', 'Renegade', '1.3G 110kW Limited 4x2 DDCT', 5, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9ae61e72-01ae-4f62-9d06-3afa92589214', 'VOLKSWAGEN', 'Transporter', 'Furgon Corto T.Medio 2.0 TDI 102cv 2.8T', 3, 193);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('23d17078-bf75-4c19-adfa-7eaa67bc8f17', 'PEUGEOT', 'Boxer', '435 L4 H2 BHDI 121kW 165CV SS 6 V. M', 3, 166);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('aca6ebf1-784c-4bef-8e7e-5523a67eb7b1', 'SKODA', 'Kamiq', '1.5 TSI 110kW 150CV Sport', 5, 113);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('10c38994-7d3e-463e-9476-1a4bc73655c8', 'LAND-ROVER', 'Discovery', '2.7 TDV6 SE', 5, 249);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c7a1ddd9-f13c-45db-b34d-8e9b00f19f9b', 'FORD', 'Fiesta', '1.4 TDCi Trend', 5, 110);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9483988f-f9ba-49a2-ace9-14399219d3b8', 'SKODA', 'Kodiaq', '1.5 TSI 110KW 150cv 4x2 Ambition', 5, 146);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ed921ae0-e5f8-4d79-b0fd-0d29d6860605', 'MERCEDES-BENZ', 'CLA', 'CLA 200 D DCT Shooting Brake', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b0655ecf-2ce3-4243-875f-0d1bf8876af6', 'OPEL', 'Mokka', '1.6 CDTi 4X2 SS Selective', 5, 106);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('cc10fc86-db0f-4c2c-8147-58ddedac8b0c', 'PORSCHE', 'Cayenne', '3.0 S Hybrid Tiptronic', 5, 193);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f4f166c9-7075-4600-a3a8-1bc2932239da', 'BMW', 'X2', 'sDrive20i DCT', 5, 135);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('35404f67-fe8e-4146-bfb3-3120aad8a66a', 'SUZUKI', 'Swift', '1.3 DDiS GL 5p', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8a2254cb-f57a-48d9-af01-5997ac4d0278', 'SKODA', 'Karoq', '1.5 TSI 110kW 150CV ACT Ambition', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6901acd0-8ad6-4d96-bc7d-6df70a4a149a', 'MERCEDES-BENZ', 'GLA', 'GLA 180', 5, 144);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4e114d9f-10b0-44a7-8bb4-3cdb1413b6b5', 'AUDI', 'Q3', 'Advanced 35 TFSI 110kW 150CV S tronic', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e6092c63-b27a-4934-8c54-a0e01089e469', 'AUDI', 'Q2', 'Sport 30 TDI 85kW 116CV S tronic', 5, 122);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0bf2a05a-2287-49ed-9346-a5c13605da68', 'JEEP', 'Grand Cherokee', '3.0 V6 CRD Limited 241 CV', 5, 218);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c08f895d-7528-4b82-88c7-b7e7e94e45a7', 'VOLKSWAGEN', 'Caddy', 'Profesional Kombi 1.4 TGI 81kW BM', 5, 126);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('56f60e95-7bb7-43e8-9f4a-df097b9d5b9c', 'PEUGEOT', '508', 'GT 2.2 HDI 204cv Auto.', 5, 150);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('1bbbe018-5099-4b74-ab3d-c8c5afeaec02', 'PEUGEOT', '807', 'ST Pack 2.0 HDI 136', 5, 188);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('910217d9-e4f1-4dbb-a22c-601d5c8f16aa', 'FORD', 'Grand C-Max', '1.6 TDCi 115 AutoStartStop Titanium', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d6b2b1f6-dd21-49e2-9fa1-837c353b56de', 'RENAULT', 'Master', 'Chasis Cabina P L3 3500 RG dCi 96kW E6', 3, 242);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('21a388ac-d1be-49ec-919f-99789c64289d', 'PEUGEOT', '607', '2.7 HDi Automatico Ebano', 5, 223);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d9ee8142-a5f1-4790-99f5-5ee9b8c42ee3', 'BMW', 'X2', 'sDrive18i', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8bfa6e44-23a8-48a4-b3f0-af6c399d54dd', 'MAZDA', 'CX3', '1.5 SKYACTIV DE Style Nav 2WD', 5, 105);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('77019804-cfb9-4f98-88ce-67f583006792', 'NISSAN', 'Micra', 'CC 1.6i 110 CV TEKNA Clm Ll16 Faros 6CD', 4, 160);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('645d64fb-6940-4cb8-b0b3-e45f8033027d', 'AUDI', 'Q3 Sportback', '35 TFSI 110kW 150CV S tronic Advanced', 5, 135);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b3ea5e3c-1be2-4fe9-9773-52abbeda2ec9', 'AUDI', 'Q2', 'design ed 1.0 TFSI 85kW ultra S tronic', 5, 123);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('25b63683-91d6-4a3e-8de3-569dbd288ef5', 'LAND-ROVER', 'Range Rover Sport', '3.0 SDV6 225kW Autobiography Dynamic', 5, 185);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8e26e749-e446-47f1-bea8-8861ebccd473', 'AUDI', 'Q2', 'Advanced 30 TFSI 85kW 116CV', 5, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('672ace4b-786d-43fd-91a7-566936136f5b', 'OPEL', 'Zafira Tourer', '2.0 CDTi 165 CV Excellence Auto', 7, 154);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('60002edb-c355-49aa-8758-fd3c04f69b67', 'CITROEN', 'C-Crosser', '2.2 HDI 160 FAP Exclusive', 7, 194);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2f6a3d6a-35f8-4abd-882b-f18d0e3a14f3', 'OPEL', 'Grandland X', '1.2 Turbo Ultimate', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d09f93a4-39b8-4703-9419-f6f87e5b4deb', 'MAZDA', 'CX3', '2.0 G 89kW 121CV 2WD Zenith', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b96d8f2e-fece-4ae4-ba3e-e9bc2953bea6', 'OPEL', 'Combo', 'Tour Expression 1.3 CDTI 90 CV L1 H1 EU5', 5, 136);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2c4d4656-a221-41fb-ad83-3607574eb694', 'CITROEN', 'Xsara Picasso', '1.6 HDi 110 LX Plus', 5, 136);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('c0428d95-13fc-40af-947a-1fe68d65d894', 'AUDI', 'Q5', '2.0 TDI 170cv quattro DPF', 5, 175);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e1184d1c-375a-40d2-a41e-c2e75ddddc68', 'FORD', 'Grand C-Max', '2.0 TDCi 140 Titanium', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('20b63b94-97b1-439d-9cb2-e2060a5bfdde', 'BMW', 'X6', 'xDrive35i', 4, 262);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b8780bbb-46be-4413-829a-9b464f34b031', 'SKODA', 'Superb', 'Combi 2.0 TDI 150cv Ambition', 5, 109);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6e86dd6e-fbae-4856-b1d1-3ba4b61a286e', 'KIA', 'Stonic', '1.0 TGDi 74kW 100CV Drive', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f86af2cb-870a-4459-9d7f-2bf54f43c07f', 'VOLKSWAGEN', 'Caddy', 'Kombi PRO 2.0 TDI 110cv 4motion 5pl', 5, 171);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('cbc34db3-6e06-4b5c-b4d5-008d2d8bc479', 'SUZUKI', 'Vitara', '1.4 TURBO S 4WD', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5df91da1-027c-4fe2-b035-d7482a215419', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 200 d 4MATIC', 5, 137);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('7f451fae-0fff-40d6-9a9f-4ff4ed8847bb', 'MERCEDES-BENZ', 'GLC Coupé', 'GLC 250 d 4MATIC', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2229ed50-351e-4269-ba06-65d4e70d5af9', 'VOLVO', 'XC40', '1.5 T2 Momentum', 5, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b9b6800a-dee5-486b-a96a-c1bf40508133', 'DACIA', 'Logan', 'MCV Ambiance 1.2 55kW 75CV EU6', 5, 130);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8dd1a811-1903-4e9c-a735-5370c17debed', 'MAZDA', 'CX3', '2.0 G 89kW 121CV 2WD Origin', 5, 121);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f80743fb-dcd9-44fa-a715-3a8fd03dcbb0', 'OPEL', 'Movano', '2.3 CDTI 81kW 110CV L2 H2 F 3.5t', 3, 204);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bad430e8-d3eb-44cf-867d-95e01df366f5', 'TOYOTA', 'Verso', '140 MDRV Advance 7pl.', 7, 159);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e4746dc8-2c41-46f7-8a95-3e253ead564d', 'MERCEDES-BENZ', 'Clase V', '200 d Avantgarde Largo', 6, 179);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('af96fd41-aa44-43d4-990c-e5cc066acd35', 'FORD', 'Grand C-Max', '1.0 EcoBoost 125 Auto StartStop Edition', 5, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('efe145b6-eedb-4830-b8a8-352bc1e7f8f2', 'KIA', 'XCeed', '1.4 TGDi Tech 103kW 140CV', 5, 142);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b720313b-491d-4850-93c0-c539b987c78e', 'CITROEN', 'C4', '1.6 HDi 110 Collection', 5, 125);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ed445bf2-051f-460d-959a-0c086b45f9b7', 'CITROEN', 'C5 Aircross', 'BlueHdi 96kW 130CV SS EAT8 Feel', 5, 106);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4e0c2115-e8ec-4b46-8b8e-9281cb193079', 'BMW', 'Serie 3', '320i', 4, 157);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('df1fd0f2-4dba-4a48-a6dc-bbc13d0c0220', 'VOLKSWAGEN', 'T-Roc', 'Advance 1.0 TSI 85kW 115CV', 5, 118);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4014e0b7-479e-48c2-adde-8b77a3ed66ae', 'DS', 'DS 3', 'BlueHDi 100cv SS Desire', 5, 87);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('4da31714-bc42-4023-bee1-33d1d33d9d51', 'HONDA', 'HR-V', '1.6 iDTEC Elegance', 5, 104);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('f872e245-9f1f-4b26-92a8-ca00ed5ddd8b', 'TOYOTA', 'Land Cruiser', '2.8 D4D GX', 5, 200);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('000a62b1-e5e2-4d5c-9eb2-5c4722de4b18', 'BMW', 'X6', 'xDrive40d', 5, 163);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9fe16393-42d1-4729-8afd-cbab689fde96', 'JAGUAR', 'XF', '2.0D 132kW 180CV Prestige Auto', 5, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ac0ab46e-c735-456b-a025-26b7daddd115', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 118kW 160CV Stelvio RWD', 5, 138);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('62cb5ef6-b82a-480c-ba4f-dd36e2d12e4d', 'SUZUKI', 'Grand Vitara', '1.9 DDiS JXA', 4, 195);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3a568493-2bb3-4a32-94bf-2956a78c9099', 'SKODA', 'Spaceback', '1.6 TDI CR 90cv Ambition Spaceback', 5, 114);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9b438d12-82ac-4682-a59a-ead95376a6e5', 'LAND-ROVER', 'Freelander', '2.2 Td4 S StopStart 150cv', 5, 165);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('3fd96241-cd17-4239-aab0-94791b236f24', 'AUDI', 'S3', 'Sportback 2.0 TFSI S tronic quattro', 5, 195);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('33241cba-7b7d-47f8-a8d2-1e98819d2ce4', 'PEUGEOT', '5008', 'Business Line 1.6 HDI 112 FAP', 5, 139);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('95cefa59-d564-4777-b737-4449c90a6e41', 'RENAULT', 'Espace', 'Intens Energy dCi 96kW 130CV ECO2', 5, 116);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6addf927-4369-479b-84b6-33497cb26f54', 'FORD', 'Ranger', '2.5 TDCi 4x4 Doble Cabina XL', 5, 255);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('421ffbf2-056e-41eb-ab04-6582379c67d0', 'FORD', 'Transit Custom', 'Kombi 2.0 TDCI 77kW 320 L1 Trend', 9, 168);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('0959b082-4fb9-4985-ad19-e9052fc597a4', 'FIAT', 'Fiorino', 'Cargo Base 1.3 Mjet 59kW 80CV E6', 2, 115);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6fec9a6f-159a-4116-b9cb-12c6a26ce78f', 'FIAT', '500L', '1.3 16v Multijet II 85 CV StartStop', 5, 110);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('d7a9565c-f12b-4247-bd94-38c4a2612985', 'PORSCHE', 'Cayenne', 'Diesel', 5, 173);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2b963275-16f9-4b68-8d8e-10f8172c605f', 'JEEP', 'Compass', '2.2 CRD Limited Plus 4x2', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('bdaa2f4c-ef00-4045-a6b0-f9a5647060df', 'VOLKSWAGEN', 'T-Cross', 'First Edition 1.0 TSI 85kW 115CV', 5, 112);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('62635227-9c2c-4f17-a498-2d25bdb7ac73', 'RENAULT', 'Master', 'Furg. DC T L3H2 3500 dCi 96kW 130CV', 7, 207);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b44c88e2-a781-4edb-a913-1787b8af4982', 'PEUGEOT', '307 SW', '1.6 HDi 110 FAP DSign', 5, 134);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a29a6912-b352-4e2d-98d8-f59f421e8180', 'VOLKSWAGEN', 'Transporter', 'Kombi PRO Corto TM 2.0 TDI BMT 140CV', 2, 184);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('b7b11a5c-4878-4b60-ad93-0c9ce0193750', 'MERCEDES-BENZ', 'Clase GLA', 'GLA 220 d 4MATIC AMG Line', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('729dbc63-a1a7-4841-a103-03b912ffb86e', 'ALFA ROMEO', 'Stelvio', '2.2 Diesel 110kW 150CV Super RWD', 5, 124);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('5e6f3f47-97b1-4c13-8c68-9cb261ac41d7', 'CITROEN', 'C5 Aircross', 'BlueHdi 96kW 130CV SS EAT8 Feel', 5, 105);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('44c726f9-96ac-469c-b4e6-412a61e6428e', 'CITROEN', 'C5', '1.6 HDi 110cv CMP Business', 5, 120);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('9415b8ab-79ab-4b20-b1b6-53036d0aadf5', 'SEAT', 'Tarraco', '2.0 TDI 110kW 150CV SS Style Plus', 5, 129);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('91d9a066-cc07-4845-826e-aa7189866214', 'VOLVO', 'XC40', '2.0 D3 Momentum Auto', 5, 131);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('2fb87884-4269-417a-80a1-b9a748c111de', 'PEUGEOT', '208', 'PureTech 73kW 100CV EAT8 Allure Pack', 5, 99);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('ef33ef85-57ff-4977-920a-7a792bc6f6db', 'AUDI', 'A7', 'Sportback 3.0 TDI 218CV quattro S tronic', 4, 136);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('8263c244-b584-444b-afb7-7b1f01580673', 'DODGE', 'Caliber', '2.0 CRD SXT Limited', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('a162cab0-a85d-4e0d-8903-a47a6f288443', 'FORD', 'C-Max', '1.6 TDCi 90 Ghia', 5, 127);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('11dd6e19-d6df-4438-ba1f-01fb43eb8ad9', 'FIAT', 'Punto', '1.2 8v Lounge 69 CV Gasolina SS', 5, 119);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('18196d9f-0325-4a62-8538-c1ef801f0b6d', 'PORSCHE', 'Cayenne', '3.0 TD Tiptronic', 5, 189);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('37d08862-f4ed-4e73-bd70-507084c8709e', 'MASERATI', 'Ghibli', 'GranSport 2.0 L4 HybridGasolina 243kW', 5, 161);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('e233ed76-5196-4d80-8ead-09eee62ab0de', 'MAZDA', 'CX-5', '2.0 GE 121kW 165CV 2WD AT Newground', 5, 150);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('92576545-c4e5-4dbf-a106-bd5c2ee771fa', 'SEAT', 'ALTEA', '1.9 TDI HOT', 5, 149);

INSERT INTO coches (id, brand, model, version, seating_capacity, co2_emissions_grams_per_km) VALUES ('6206209b-3a4b-46c7-a043-789f7483b2fa', 'FORD', 'Focus', '2.0 TDCi Sport', 5, 148);