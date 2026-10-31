-- ==============================================================================
-- Topic 09 Starter: PostgreSQL Schema with UUIDs & Constraints
-- ==============================================================================

-- 1. Organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Members (Belongs to Organization)
CREATE TABLE members (
  -- TODO: id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  -- TODO: org_id UUID REFERENCES organizations(id) ON DELETE CASCADE
  -- TODO: email VARCHAR(255) NOT NULL
  -- TODO: role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'member', 'viewer'))
  -- TODO: created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tasks
CREATE TABLE tasks (
  -- TODO: id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  -- TODO: org_id UUID REFERENCES organizations(id) ON DELETE CASCADE
  -- TODO: assignee_id UUID REFERENCES members(id) ON DELETE SET NULL
  -- TODO: title VARCHAR(255) NOT NULL
  -- TODO: status VARCHAR(50) NOT NULL CHECK (status IN ('todo', 'in_progress', 'done'))
  -- TODO: created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- TODO: Create Indexes on Foreign Keys (org_id, assignee_id)
