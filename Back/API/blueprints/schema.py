table_schema = """
Table `cities`:
- id (uuid)
- name (character varying)
- capital (boolean)
- state_id (uuid)
- has_harbor (boolean)
- location (USER-DEFINED)
Relations:
- state_id references states.id

Table `city_borders`:
- id (uuid)
- city_id (uuid)
- vertices (text)
- area_km2 (numeric)
- bounding_box (ARRAY)
Relations:
- city_id references cities.id

Table `electric_rental_vehicle`:
- id (uuid)
- city_id (uuid)
- vin (character varying)
- model_year (integer)
- make (character varying)
- model (character varying)
- electric_range (integer)
- dol_vehicle_id (bigint)
- census_tract (bigint)
- rental_cost_per_hour (numeric)
- capacity (integer)
- type (character varying)
Relations:
- city_id references cities.id

Table `events`:
- event_id (uuid)
- city_id (uuid)
- venue_id (uuid)
- event_type (character varying)
- name (character varying)
- description (text)
- start_date (timestamp without time zone)
- end_date (timestamp without time zone)
- expected_attendance (integer)
- actual_attendance (integer)
- ticket_price (double precision)
- status (character varying)
- organizer (character varying)
- contact_email (character varying)
- contact_phone (character varying)
- is_free (boolean)
- is_private (boolean)
- requires_registration (boolean)
- age_restriction (character varying)
- has_food (boolean)
- has_alcohol (boolean)
- is_family_friendly (boolean)
- is_outdoor (boolean)
- weather_dependent (boolean)
- has_parking (boolean)
- has_accessible_entrance (boolean)
- has_wifi (boolean)
- has_translation_services (boolean)
- has_childcare (boolean)
- has_medical_staff (boolean)
- has_security (boolean)
- has_emergency_exits (boolean)
- has_first_aid (boolean)
- has_fire_extinguishers (boolean)
- has_smoking_area (boolean)
- streaming_available (boolean)
- virtual_attendance_option (boolean)
- social_media_hashtag (character varying)
- early_bird_discount (boolean)
- group_discount_available (boolean)
- student_discount_available (boolean)
- senior_discount_available (boolean)
- military_discount_available (boolean)
- vip_option_available (boolean)
- merchandise_available (boolean)
- photography_allowed (boolean)
- video_recording_allowed (boolean)
- refund_policy (character varying)
- weather_contingency_plan (boolean)
- sustainability_initiative (boolean)
- community_impact_score (integer)
- expected_economic_impact (integer)
- post_event_survey_planned (boolean)
- vendor_count (integer)
- sponsor_count (integer)
- staff_count (integer)
- volunteer_count (integer)
- social_media_reach (integer)
- registration_deadline (date)
- setup_days_required (integer)
- teardown_days_required (integer)
- local_accommodation_partners (integer)
- transportation_partners (integer)
- marketing_budget (integer)
- satisfaction_score (double precision)
- return_attendee_percentage (double precision)
- press_coverage_level (character varying)
- weather_during_event (character varying)
- ticket_sales_progress (double precision)
- early_registration_discount_percentage (integer)
- projected_attendance (integer)
- event_risk_score (integer)
- marketing_campaign_status (character varying)
- revenue_generated (integer)
- expenses (integer)
- profit (integer)
- attendance_vs_expected (double precision)
- sponsor_satisfaction (double precision)
- media_mentions (integer)
- genre (character varying)
- sport (character varying)
- art_style (character varying)
- topic (character varying)
- culture (character varying)
- cuisine_type (character varying)
- play_name (character varying)
- game (character varying)
- comedian (character varying)
- company (character varying)
- product (character varying)
Relations:
- city_id references cities.id
- venue_id references infrastructure.id

Table `geography_columns`:
- f_table_catalog (name)
- f_table_schema (name)
- f_table_name (name)
- f_geography_column (name)
- coord_dimension (integer)
- srid (integer)
- type (text)

Table `geometry_columns`:
- f_table_catalog (character varying)
- f_table_schema (name)
- f_table_name (name)
- f_geometry_column (name)
- coord_dimension (integer)
- srid (integer)
- type (character varying)

Table `infrastructure`:
- id (uuid)
- city_id (uuid)
- type (character varying)
- subtype (character varying)
- name (character varying)
- opening_date (date)
- green_score (integer)
- carbon_footprint_kg_per_year (numeric)
- energy_efficiency_score (integer)
- water_efficiency_score (integer)
- waste_management_score (integer)
- renewable_energy_percentage (numeric)
- green_certification (text)
- location (USER-DEFINED)
Relations:
- city_id references cities.id

Table `infrastructure_auto_service`:
- infra_id (uuid)
- bay_count (integer)
- eco_friendly_services (boolean)
- electric_vehicle_charging (boolean)
- recycling_program (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_bank`:
- infra_id (uuid)
- atm_count (integer)
- has_drive_thru (boolean)
- paperless_operations (boolean)
- green_investment_products (boolean)
- energy_efficient_lighting (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_daycare`:
- infra_id (uuid)
- child_capacity (integer)
- age_range (character varying)
- organic_food (boolean)
- eco_friendly_toys (boolean)
- outdoor_learning_space (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_fabric`:
- infra_id (uuid)
- production_type (character varying)
- raw_material_capacity_tons (numeric)
- output_capacity_tons_day (numeric)
- automation_level (integer)
- water_usage_m3_day (numeric)
- energy_consumption_kwh_day (numeric)
- has_recycling_program (boolean)
- noise_level_db (numeric)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_gas_station`:
- infra_id (uuid)
- pump_count (integer)
- has_convenience_store (boolean)
- electric_vehicle_charging (boolean)
- biofuel_availability (boolean)
- solar_powered (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_government_building`:
- infra_id (uuid)
- energy_efficient_heating (boolean)
- water_conservation_systems (boolean)
- green_roof (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_gym`:
- infra_id (uuid)
- size (character varying)
- floor_area_m2 (integer)
- is_24hour (boolean)
- energy_generating_equipment (boolean)
- sustainable_shower_systems (boolean)
- eco_friendly_cleaning (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_healthcare_clinic`:
- infra_id (uuid)
- staff_count (integer)
- examination_rooms (integer)
- energy_efficient_medical_equipment (boolean)
- sustainable_waste_disposal (boolean)
- telemedicine_capabilities (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_hospital`:
- infra_id (uuid)
- size_category (character varying)
- bed_capacity (integer)
- services (text)
- energy_efficient_medical_equipment (boolean)
- sustainable_waste_disposal (boolean)
- green_heating_cooling_systems (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_hotel`:
- infra_id (uuid)
- star_rating (integer)
- room_count (integer)
- energy_efficient_lighting (boolean)
- water_conservation_systems (boolean)
- organic_linens (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_laundromat`:
- infra_id (uuid)
- washer_count (integer)
- dryer_count (integer)
- is_24hour (boolean)
- energy_efficient_machines (boolean)
- water_recycling_system (boolean)
- eco_friendly_detergents (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_office_building`:
- infra_id (uuid)
- size (character varying)
- floor_count (integer)
- tenant_capacity (integer)
- smart_lighting_systems (boolean)
- green_roof (boolean)
- electric_vehicle_charging (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_park`:
- infra_id (uuid)
- size (character varying)
- area_km2 (numeric)
- native_plantings (boolean)
- wildlife_habitat (boolean)
- sustainable_irrigation (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_pet_services`:
- infra_id (uuid)
- eco_friendly_products (boolean)
- sustainable_waste_disposal (boolean)
- energy_efficient_equipment (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_pharmacy`:
- infra_id (uuid)
- is_24hour (boolean)
- has_drive_thru (boolean)
- paperless_prescriptions (boolean)
- eco_friendly_packaging (boolean)
- energy_efficient_lighting (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_religious_building`:
- infra_id (uuid)
- solar_panels (boolean)
- energy_efficient_lighting (boolean)
- sustainable_materials (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_restaurant`:
- infra_id (uuid)
- price_category (character varying)
- seating_capacity (integer)
- local_organic_ingredients (boolean)
- energy_efficient_kitchen_equipment (boolean)
- waste_reduction_program (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_salon`:
- infra_id (uuid)
- styling_stations (integer)
- eco_friendly_products (boolean)
- water_conservation_systems (boolean)
- energy_efficient_equipment (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_school`:
- infra_id (uuid)
- student_capacity (integer)
- environmental_education_program (boolean)
- energy_efficient_lighting (boolean)
- sustainable_transportation_options (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_senior_living`:
- infra_id (uuid)
- unit_count (integer)
- staff_count (integer)
- energy_efficient_heating (boolean)
- water_conservation_systems (boolean)
- sustainable_materials (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_shop`:
- infra_id (uuid)
- size (character varying)
- eco_friendly_products (boolean)
- energy_efficient_lighting (boolean)
- sustainable_packaging (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_supermarket`:
- infra_id (uuid)
- size (character varying)
- floor_area_m2 (integer)
- register_count (integer)
- local_organic_products (boolean)
- energy_efficient_refrigeration (boolean)
- waste_reduction_program (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_transportation_hub`:
- infra_id (uuid)
- electric_vehicle_charging (boolean)
- public_transportation_access (boolean)
- bike_sharing_station (boolean)
Relations:
- infra_id references infrastructure.id

Table `infrastructure_venues`:
- infra_id (uuid)
- capacity (integer)
- size (character varying)
- indoor (boolean)
- has_parking (boolean)
- has_public_transport (boolean)
- year_built (integer)
- last_renovation_year (integer)
- accessibility_score (integer)
- security_score (integer)
- technology_score (integer)
- comfort_score (integer)
- sustainability_score (integer)
- amenities (text)
- rental_price_per_day (integer)
- has_catering (boolean)
- has_technical_support (boolean)
- has_accommodation (boolean)
- sustainability_rating (integer)
- energy_efficient_lighting (boolean)
- water_conservation_systems (boolean)
- waste_reduction_program (boolean)
Relations:
- infra_id references infrastructure.id

Table `music`:
- id (text)
- artists (text)
- album_name (text)
- track_name (text)
- duration_ms (bigint)
- explicit (boolean)
- danceability (double precision)
- energy (double precision)
- key (bigint)
- loudness (double precision)
- mode (bigint)
- speechiness (double precision)
- acousticness (double precision)
- instrumentalness (double precision)
- liveness (double precision)
- valence (double precision)
- tempo (double precision)
- time_signature (bigint)
- track_genre (text)

Table `parcels`:
- parcel_id (character varying)
- city_id (uuid)
- area_m2 (numeric)
- centroid_lat (numeric)
- centroid_lon (numeric)
- vertices (text)
Relations:
- city_id references cities.id

Table `people`:
- id (uuid)
- city_id (uuid)
- first_name (text)
- last_name (text)
- birth_date (date)
- job_sector (text)
- education (text)
- employment_status (text)
- income (integer)
- personality (text)
Relations:
- city_id references cities.id

Table `people_music`:
- people_id (uuid)
- music_id (text)
Relations:
- people_id references people.id
- music_id references music.id

Table `review`:
- id (uuid)
- people_id (uuid)
- infra_id (uuid)
- datetime (timestamp with time zone)
- description (text)
- stars (integer)
Relations:
- infra_id references infrastructure.id
- people_id references people.id

Table `roads`:
- origin_city_id (uuid)
- target_city_id (uuid)
- toll (double precision)
- id (uuid)
- geometry (USER-DEFINED)
- length_km (double precision)
Relations:
- target_city_id references cities.id
- origin_city_id references cities.id

Table `sensor_metrics_air`:
- event_time (timestamp with time zone)
- sensor_id (uuid)
- pm10 (double precision)
- co (double precision)
- co2 (double precision)
- no2 (double precision)
- o3 (double precision)
- so2 (double precision)
Relations:
- sensor_id references sensors.id

Table `sensor_metrics_ambient`:
- event_time (timestamp with time zone)
- sensor_id (uuid)
- temperature (double precision)
- humidity (double precision)
- solar_radiation (double precision)
Relations:
- sensor_id references sensors.id

Table `sensor_metrics_traffic`:
- event_time (timestamp with time zone)
- sensor_id (uuid)
- vehicle_density (double precision)
- avg_speed (double precision)
- flow_rate (double precision)
- occupancy (double precision)
- congestion_index (double precision)
Relations:
- sensor_id references sensors.id

Table `sensor_metrics_water_quality`:
- event_time (timestamp with time zone)
- sensor_id (uuid)
- water_temperature (double precision)
- ph_level (double precision)
- turbidity (double precision)
- dissolved_oxygen (double precision)
- conductivity (double precision)
Relations:
- sensor_id references sensors.id

Table `sensor_metrics_water_usage`:
- event_time (timestamp with time zone)
- sensor_id (uuid)
- usage_liters (double precision)
Relations:
- sensor_id references sensors.id

Table `sensors`:
- id (uuid)
- sensor_type (text)
- installed_at (timestamp with time zone)
- city_id (uuid)
- state_id (uuid)
- location (USER-DEFINED)
- road_id (uuid)
- km_point (double precision)
- industrial_zone (boolean)
Relations:
- state_id references states.id
- city_id references cities.id
- road_id references roads.id

Table `service_area`:
- id (uuid)
- latitude (double precision)
- longitude (double precision)
- road_id (uuid)
- distance_from_start (bigint)
- has_cafe (boolean)
Relations:
- road_id references roads.id

Table `spatial_ref_sys`:
- srid (integer)
- auth_name (character varying)
- auth_srid (integer)
- srtext (character varying)
- proj4text (character varying)

Table `state_borders`:
- id (uuid)
- state_id (uuid)
- vertices (text)
- area_km2 (numeric)
- bounding_box (ARRAY)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)
Relations:
- state_id references states.id

Table `states`:
- id (uuid)
- name (character varying)

Table `tourism_trips`:
- trip_id (uuid)
- person_id (uuid)
- route_id (uuid)
- departure_datetime (timestamp without time zone)
- arrival_datetime (timestamp without time zone)
- is_return (boolean)
Relations:
- route_id references transport_routes.route_id
- person_id references people.id

Table `transport_routes`:
- route_id (uuid)
- transport_type (character varying)
- route_name (character varying)
- origin_city_id (uuid)
- origin_hub_id (uuid)
- destination_city_id (uuid)
- destination_hub_id (uuid)
- distance_km (numeric)
- travel_time (character varying)
- travel_minutes (integer)
- frequency (character varying)
- departure_times (text)
- capacity (integer)
- price (numeric)
- utilization_percent (numeric)
- efficiency_score (numeric)
- carbon_footprint_kg (numeric)
Relations:
- origin_city_id references cities.id
- destination_city_id references cities.id
- destination_hub_id references infrastructure.id
- origin_hub_id references infrastructure.id

Table `vip_network_data`:
- user_id (uuid)
- ip_origin (inet)
- ip_destination (inet)
- protocol (character varying)
- port_origin (integer)
- port_destination (integer)
- bytes_sent (bigint)
- bytes_received (bigint)
- latency_ms (double precision)
- jitter_ms (double precision)
- error_count (integer)
- retransmissions (integer)
- connection_establishment_time (double precision)
- ttl (integer)
- round_trip_time (double precision)
- packet_loss (double precision)
- throughput (bigint)
- connection_duration (double precision)
- device_type (character varying)
- brand (character varying)
- model (character varying)
- os (character varying)
- network_interface (character varying)
- app_type (character varying)
- website_name (character varying)
- site_category (character varying)
- service_type (character varying)
- client_type (character varying)
- timestamp (timestamp with time zone)
Relations:
- user_id references people.id


Tabla cars (Coches)
- id (UUID, PK, no nulo): Identificador único de cada coche. Se genera automáticamente con uuid_generate_v4().
- brand (VARCHAR(100), no nulo): Marca del coche (por ejemplo, “Toyota”, “Ford”).
- model (VARCHAR(100), no nulo): Modelo comercial del vehículo (por ejemplo, “Corolla”, “Focus”).
- version (VARCHAR(255), nulo): Variante o edición específica del modelo (por ejemplo, “Hybrid”, “Sport”).
- seating_capacity (INT, nulo): Número de plazas disponibles en el coche.
- co2_emissions_grams_per_km (INT, nulo): Emisión promedio de CO₂ en gramos por kilómetro recorridο.

Tabla taxi_drivers (Taxistas)
- people_id (UUID, PK parcial, no nulo): Referencia al conductor, que debe existir en la tabla people.
- car_id (UUID, PK parcial, no nulo): Referencia al coche asignado, que debe existir en la tabla cars.
- co2_emissions_grams_per_km (INT, nulo): Emisión de CO₂ reportada por el taxista en ese coche, en gramos por kilómetro.




"""