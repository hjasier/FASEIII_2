-- Habilitar extensión de UUID si hiciese falta
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS taxi_drivers (
    people_id UUID NOT NULL,
    car_id    UUID NOT NULL,
    co2_emissions_grams_per_km INT,
    PRIMARY KEY (people_id, car_id),
    FOREIGN KEY (people_id) REFERENCES people(id),
    FOREIGN KEY (car_id)    REFERENCES cars(id)
);


-- INSERTs de registros

INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000013a-0dc5-4a75-838a-faebf8086ae3', 'eea0588f-8455-4d06-8c54-f1c0c4b97502', 180);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000029e-4ae9-43b9-ba43-8462f166b181', 'e918a788-a05a-4fc3-8d12-cbaaf1239ba7', 113);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000029f-5de0-425f-a5ef-7cfbac4087c4', '4ac6358e-2a45-4761-80f7-4c7d7d731145', 154);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000003c9-8743-4247-8c02-4d861c703e20', '8c867278-dbea-4b3a-8941-5de4f91c672c', 50);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00000bf3-328e-41d8-b440-af53a4a1c771', 'a0ec3952-599c-46d6-95d7-c1b7d798364b', 194);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00000d5a-2ce5-4a3e-8dc2-24be34a97c92', '1e6c441c-0aa1-42b3-8e81-ac5522a62d33', 123);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000123a-675a-4142-baf7-0da074d11ffa', '634a02d6-076d-4ef9-84c9-1a787cd4839c', 109);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00001289-21c7-4620-bc4e-1bfe6d1651f8', 'bab48104-dac7-43d0-9eab-e3f7e3fb6ced', 189);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00001295-365f-461f-93ea-84ddd2ca2434', '464448b8-4650-476c-928f-4911f9ed5130', 134);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000012a7-1d1e-45ed-8d37-fb45789274f9', 'bd4a0d45-27f8-4c00-81f0-01087370b613', 149);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00001853-69ad-43ac-aa62-677dd67f2425', 'b0d3a790-0094-4668-ac46-4eb54f8fe482', 131);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00001880-ef7e-4b54-b52e-1d96bf98dfc9', '0113d685-2eae-49fd-a929-0bafde114a14', 120);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00001c0d-0f0e-4669-9646-8d04b390fdc9', 'e42a4add-e094-486c-96d7-c7548ea6c33d', 102);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00001eed-ced4-4818-bc87-e8267713d0f7', '717d2c50-0cac-446c-aa5f-2ffb9a24735f', 124);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00001faa-453c-450b-9854-d12cf4adec25', '0cba084f-a1ac-4d20-83f8-9050d08fe66b', 132);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000023ef-2b95-4ef4-94a2-6a58d7c8543a', '85c08acb-f592-4a79-b76c-c0d0c2cfcca4', 119);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000026d4-8d7c-4406-abd5-e41ac6219ef8', 'ea045992-147d-456a-8fe9-d09761c4bdbe', 126);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00002b2e-6963-4c58-9723-cdf741489f2e', 'fac01af6-1cfe-4d17-b99e-ee9a042ce3df', 202);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00002d18-cf48-40c3-928b-7216f9c7236b', '76f2c32a-9277-4aee-ab21-41cf86c0dc20', 116);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000302e-0e1b-442e-b263-ee6cd9fec5be', 'e1de0612-08d3-4a3a-b6cb-e7c4245316f8', 128);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00003339-2aad-44a6-8681-0fb3888d74af', '0101d247-0272-4f3b-9a87-c8a5b6313a5a', 203);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00003971-2dd2-44b4-9a17-eedac77689bb', 'ea6e0797-7cb6-4b4c-aa57-990570fa48a6', 122);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000440c-36dc-4319-9044-a29390d1bf0f', '00cb2a38-655e-474b-9bf3-e7aad840607d', 147);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000044d0-4475-4657-a6f0-a4e8d733aedd', '183b3743-fa5f-4acb-a2fb-526741b9a935', 101);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000045ce-1680-4d64-be7f-125d6ee23866', '4177adfd-39f1-4a77-a6da-768278bc9256', 121);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000464a-9ae9-4dd8-bdee-e57a87e43852', '9fcce3a5-ae06-4e12-85f1-9f91ec27e96d', 122);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000048ca-d35c-4210-a67c-a36ae78e3df4', 'cce0579a-c657-4d09-a671-be3ed7a5aae5', 127);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000498d-24fc-47cf-b819-7e4f1ee81376', 'c3503dba-1665-4cd8-8660-9e72c6734739', 240);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00004a04-8b9c-44f1-b390-aa5530ccbbee', '4a9168c8-606c-43f5-af57-49c89c440ce5', 159);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00004c6e-d473-4c13-ba61-bba2a1a5c4ed', '16e623fc-76fa-42d8-94b1-549172eb8ebf', 120);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00004eca-02b9-4763-8017-7c26f1f625f9', '77f6483b-9707-4660-8d3f-e94fa773b06c', 161);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00004fec-6d21-4753-b69b-da6ffb15cf82', '7c7ac470-134d-4af9-a78f-4430936236c5', 154);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000054b2-e4a8-4a46-b0df-b698cdbf007a', 'ba164035-3fc1-4d50-8b88-75b594efafc5', 99);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000055ec-6aac-493e-b11f-bc1d0141f8f8', 'f4f3224f-3892-43bd-92a8-aeee92d6af0f', 118);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00005661-d69b-4a22-afb0-eba0657baaa2', '0b3bd9a7-b455-49ee-88c0-c0655f6dc4f1', 121);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00005e26-2135-4484-9e1a-8571a232a61e', 'a355ea48-6179-4027-adeb-9bc7faeaacfa', 116);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00005e8d-0a72-4d54-8a7e-6caa64506e1c', '8bd970d6-6870-4fd8-aa13-ef2d6d2aac2d', 112);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000060b1-bcc5-4c22-991d-b56a4b9398fc', '54ae87fa-6cf8-4429-89a8-4e57c6687d64', 200);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000618d-0f55-4c52-9925-ac86e6166791', 'b435e9cd-d5fb-4b8b-a6c6-7af2b99b1784', 170);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00006200-25c3-487b-bcb5-f2cd0cf664c3', 'a6f877fc-b037-483e-aab3-edeb6df5297f', 160);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00006810-feb4-456b-adfc-bd847455864d', 'dfd345e7-c5dc-4355-bdcc-3b52e158f46e', 139);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00006a2b-aa61-4e48-baf3-b0bf398ecde8', '6c95cbf6-949f-40d5-931e-94faa427945b', 88);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00006a3c-4a39-4cc9-8954-33f716c22933', 'd151533b-604e-4e88-a025-d7dd9a16bac9', 109);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00007261-cc82-4ac6-a065-68207e07a7d7', 'e0ee9a80-f9f6-455a-a7f6-78a3cacff9e6', 149);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00007407-2778-4c88-ba33-7fe7e0e393de', '2b6003c9-ff35-48bc-bafa-662043fd090a', 122);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000074f7-8b31-4b53-8223-7f3bcff5ca17', '093f313a-7f60-4259-a9ee-d5218bcb5ff6', 129);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000783b-fe45-400e-9129-da8524f3a3da', 'd3f573b3-0805-4702-9b62-353b11c97d5a', 185);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00007cfa-2cbf-4c05-9704-2ef0ab60e4b9', '2d09ab55-286a-48b3-a2e7-62834c2876c9', 168);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00007d26-9fa0-4065-968d-dc99ba8e0ca1', '0207e065-24e4-428a-ab0e-058610dffa87', 226);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000081ae-5b9b-401d-bc0e-2d05bd6c7299', '35b23149-c4bb-47f8-b93f-d60a7a91d713', 129);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000828a-dc9c-4958-9fbc-07e9b86106a4', '3d9f7660-11c6-4f27-be77-c26cf3f63fee', 140);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000084c1-f27b-4947-a810-e8bbf00014c1', 'bdcdaacc-e097-4d5b-a797-574885cbe176', 161);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000877a-76fa-43a0-99bb-ca7c570d5cf9', '92cda129-f775-4f91-8070-38c6198689ea', 129);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000088d3-2de5-4cd5-9862-f0e25b373e16', '446c4d69-0242-43b4-b1a1-0968b3feea7f', 139);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000089bf-b473-4e14-99b2-e7d5ab6c87ce', '1d613e23-a8ba-4e65-aa61-15ed18f78b07', 170);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00008aa9-aed9-45ef-9592-b5be48cf974a', '90bbc8bb-02fc-4471-af3b-4b337baac3e4', 161);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00008c9b-a81f-491f-addb-35b6b3814917', '86cae98c-640b-40ed-abaf-16ea77433083', 116);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00008d3c-778f-4644-a49f-a2c3dd9091a8', '10538592-b5c7-489b-8b04-fcba7863a298', 143);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00008e86-7e10-4a9a-b40e-9293a29bafc1', '4d65d426-877b-4633-bc4c-965a008c301f', 144);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00008f8e-8822-45dd-9ca0-e994f7b51280', 'bafff080-6c99-42eb-bcdd-ab6c8fc940dd', 118);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00009040-1dbb-4fe8-868a-adef68abd5c7', 'd6a1ae77-899c-48c9-ab7b-4d1f9b0bbb06', 172);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('000095c3-7b9f-4740-8a3e-f5c85ed634bb', 'd7ebc7f6-58f6-4ffb-862e-0a4e1b145227', 187);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000974c-a245-41af-a3fc-e0244409bdb8', '5cec00a7-7cb6-4868-9c54-2ffc5ad1a95e', 103);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00009757-c6d2-4ed5-a147-f7e814ca15f6', '4da4bf7a-0bd1-4525-a2f2-9b2f76f5c9ce', 225);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('00009ccf-6239-4b90-84c6-bfebd38d60ea', '714396bb-fd76-4096-9305-6dc9002026a8', 122);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000a67a-9d12-4a75-b171-53e5fd8581ee', '32830a37-963f-4d2c-89b2-f1e0c713af28', 112);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000a837-6955-433a-adfd-91be5993c91d', 'b7ff1a7e-661c-434b-be9c-86f326db8662', 113);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000ac42-64e9-4576-ab96-8d397bdb5f7f', 'fc86bbc5-93c5-420a-a8e5-53a2cadf70da', 105);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000aced-dcc5-441c-9a79-f442ef6c2a0c', '4eee3ca8-7226-4f6a-b117-b0656de69289', 148);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000adab-0506-475d-ad97-a233ce2abde7', '099df19a-dca6-45f8-9f28-09c82515759a', 134);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000afa9-57a6-4fcb-972e-36ca7ef47ba4', '36aff58a-107a-43e3-adab-20f86f7165b9', 116);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000b010-bb4c-46be-ab68-87d9fef02323', '1491578e-1dc2-4e2d-9b97-9ce2418f0803', 187);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000b099-b111-479c-ab8a-75e8414dd68e', '724ab03b-b731-4483-9812-26df2f7a75df', 142);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000be3f-e2f9-4791-8a80-4150c47e93a1', '655b1a1b-487e-4c1a-8fe9-1247fd027ce4', 184);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000bf13-02df-424d-8e52-d369ecc60fd9', 'db4076f0-6114-4dd5-bd95-708ecdf25f42', 155);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000c2f2-5d24-4ce0-bdfb-f957e54fc480', '0911590a-3401-43dd-9e76-fe1c0033723c', 140);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000c477-b34a-4870-8835-c11e461bf35d', '1250394c-b3ef-44de-99af-a8f32941a9fb', 189);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000c47f-ab2f-4835-90c6-c8b5b6b370f1', 'fb3a5769-5981-4c9d-bfe1-2b2d7bf0b57c', 135);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000c4bd-24c4-4059-a62b-dc38f0c9306a', 'deae7b9c-6278-4c89-a79e-d5c4cab1ed77', 123);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000c989-79c8-4bfa-929a-7dec7955bfcf', 'dc086fc0-48d1-400a-9e92-c86048735931', 116);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000c9fd-ed09-4ee8-822c-93ffcdcca5a6', '8dbe72c7-458f-4bc8-a8a2-d2fc1eea9005', 130);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000cdf2-e346-49f9-920f-47f94103e78e', 'f594fc35-eada-44f4-ab9f-7956fd69f43d', 139);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000ceaf-315b-4bfe-b8bb-2a9750ee43a2', '3e6c3aa2-1305-4f56-b8e2-1d010358708e', 145);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d0a3-b5db-4a28-9639-1a156569ff00', '4109bd13-83ad-4234-a831-f37cc31709d9', 110);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d1db-043b-4a5b-97c2-c0795d6437c4', 'a91dc95d-4fb4-444d-b724-385e1b12c867', 197);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d309-46cd-4214-803c-7bd62a3c9f57', '108c1c79-7dac-4647-9c87-f03ecc2b77e6', 104);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d37e-2d78-4408-9c09-defd3399b38d', '4647b355-a63b-4ee5-9348-18754b766a04', 176);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d419-df98-473a-b6aa-4d34a0d987d9', '586ff823-239d-4db6-b255-5df24e8e7cab', 142);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d6c5-1151-497c-af21-946f77ef35e6', 'fbf25cfc-c19f-45b4-bf73-67c35d05dba4', 119);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d902-83a6-47bb-b907-ee2d094a6599', 'bd43875e-c002-4c38-92cb-1761cb94f9f7', 255);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d97d-473c-4645-9b71-d8dc6675b225', '95272a97-6788-46e2-8855-f04d2e8149d5', 128);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d994-2df4-40c1-8cb8-2cf3ac2b07b8', 'd90cd777-04fe-49c6-b78b-b60784f16f38', 139);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000d9e8-da68-4706-a4a9-bbed2e139788', 'b38e8e42-2d81-48fa-8999-8a6a5011c080', 115);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000dd5b-4d8e-4982-b334-d374053059bc', '47277047-286d-43c2-a7bb-836d9a2f5800', 31);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000e01f-fe18-4869-965f-bff1f0db7ef8', 'a9d5d22f-2bfa-4fcb-ba5e-3d7bd71c5c6c', 109);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000e028-44a3-4302-a50c-f047ded75d85', '5c4aa99f-9e80-4d33-8757-56f0eeb41624', 162);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000e1a0-4993-4fde-8118-44eb274333c2', '885e42f8-bbfc-45d6-8181-c40cf0e0a389', 119);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000e6e2-3ec7-4b96-aee3-c6b6e7a7899e', '75b7822f-8f93-42c7-9f36-1387f12dd2d3', 118);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000e83f-de56-4914-bfd9-4e486ab77117', 'de016185-66d6-4034-bdce-af0c299886ae', 176);
INSERT INTO taxi_drivers (people_id, car_id, co2_emissions_grams_per_km) VALUES ('0000ea2d-bc61-4311-b373-9d28714f21dc', 'e0e2589d-6ce4-46f7-8d34-60c159b065c3', 114);