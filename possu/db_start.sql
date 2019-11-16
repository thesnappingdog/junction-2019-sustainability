--
-- Database cluster setup
--
SET default_transaction_read_only = off;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

CREATE EXTENSION dblink;

SET search_path = public, pg_catalog;
SET default_tablespace = '';
SET default_with_oids = false;

-- Asynchronous commit and delayed commit for more optimal performance
SET synchronous_commit TO OFF; 
SET commit_delay TO 100000;  -- 100ms (maximum allowed)

--
-- Role creation for 'junkkarigubbe'
--
DO
$body$
BEGIN
    IF EXISTS (
        SELECT
        FROM pg_catalog.pg_user
        WHERE usename = 'junkkarigubbe') THEN
        RAISE NOTICE 'User "junkkarigubbe" already exists';
    ELSE
        CREATE ROLE junkkarigubbe;
        ALTER ROLE junkkarigubbe WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS ENCRYPTED PASSWORD 'md9ab06f1db416aab9e8b91580b01b45d0';
    END IF;
END
$body$ LANGUAGE plpgsql;

--
-- Database setup for 'junkkarigubbe'
--
DO
$body$
BEGIN
   IF EXISTS (SELECT 1 FROM pg_database WHERE datname = 'junkkarigubbe') THEN
      RAISE NOTICE 'Database "junkkarigubbe" already exists';
   ELSE
      PERFORM dblink_exec('dbname=' || current_database()  -- Current database
              , 'CREATE DATABASE junkkarigubbe OWNER = junkkarigubbe IS_TEMPLATE = true');
   END IF;
END
$body$ LANGUAGE plpgsql;

REVOKE CONNECT,TEMPORARY ON DATABASE junkkarigubbe FROM PUBLIC;
GRANT CONNECT ON DATABASE junkkarigubbe TO PUBLIC;

\connect junkkarigubbe

SET default_transaction_read_only = off;

-- Creating tables and functions etc. goes below, if needed ...
