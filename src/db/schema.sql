-- DIZTINCT TOUCH HOME DESIGNS Database Schema
-- Neon PostgreSQL

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  location TEXT,
  year_completed TEXT,
  client TEXT,
  site_area TEXT,
  gfa TEXT,
  budget TEXT,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  full_case_study JSONB,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  cover_image TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]',
  drawings JSONB DEFAULT '[]',
  demo_video TEXT,
  github_url TEXT,
  live_url TEXT,
  architecture JSONB,
  engineering_decisions JSONB DEFAULT '[]',
  metrics JSONB DEFAULT '[]',
  future_improvements TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  featured_rank INTEGER,
  date_str TEXT NOT NULL,
  building_type TEXT,
  bedroom_count TEXT,
  project_code TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  typology TEXT,
  location TEXT,
  message TEXT NOT NULL,
  estimated_budget TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'site_inspection', 'contract_signed', 'archived'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'page_view', 'project_view', 'whatsapp_click', 'inquiry_submit'
  path TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);
