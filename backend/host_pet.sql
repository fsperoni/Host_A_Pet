\echo 'Delete and recreate host_pet db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE host_pet;
CREATE DATABASE host_pet;
\connect host_pet

\i host_pet_schema.sql
\i host_pet_seed.sql

\echo 'Delete and recreate host_pet_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE host_pet_test;
CREATE DATABASE host_pet_test;
\connect host_pet_test

\i host_pet_schema.sql
