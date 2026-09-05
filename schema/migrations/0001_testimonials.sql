CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL,
  name TEXT,
  role TEXT,
  company TEXT,
  relationship TEXT,
  profile_url TEXT,
  quote TEXT,
  status TEXT NOT NULL DEFAULT 'unused' CHECK (status IN ('unused', 'pending', 'approved', 'rejected')),
  submitted_at TEXT,
  decided_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_testimonials_token ON testimonials(token);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
