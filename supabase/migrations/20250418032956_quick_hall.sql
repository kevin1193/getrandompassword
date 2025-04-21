/*
  # Analytics Tables Setup

  1. New Tables
    - `analytics_events`
      - `id` (uuid, primary key)
      - `event_type` (text) - Type of event (password_generated, password_copied)
      - `password_length` (integer) - Length of generated password
      - `password_strength` (integer) - Calculated strength score
      - `character_types` (jsonb) - Types of characters used
      - `session_id` (text) - Client session identifier
      - `created_at` (timestamp)
    - `daily_stats`
      - `id` (uuid, primary key)
      - `date` (date, unique)
      - `total_generated` (integer)
      - `total_copied` (integer)
      - `avg_strength` (float)
      - `avg_length` (float)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for inserting analytics events
    - Add policies for reading aggregated stats
*/

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  password_length integer,
  password_strength integer,
  character_types jsonb,
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Daily Stats Table
CREATE TABLE IF NOT EXISTS daily_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  total_generated integer DEFAULT 0,
  total_copied integer DEFAULT 0,
  avg_strength float DEFAULT 0,
  avg_length float DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- Policies for analytics_events
CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policies for daily_stats
CREATE POLICY "Anyone can read daily stats"
  ON daily_stats
  FOR SELECT
  TO anon
  USING (true);