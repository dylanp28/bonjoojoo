-- Orders table for bonjoojoo
-- Run once against your Vercel Postgres (or any Postgres) database.
-- Connect via: psql $DATABASE_URL -f src/lib/database/schema.sql

CREATE TABLE IF NOT EXISTS orders (
  order_id          TEXT PRIMARY KEY,
  user_id           TEXT        NOT NULL,
  payment_intent_id TEXT        NOT NULL UNIQUE,   -- idempotency key
  items             JSONB       NOT NULL,
  shipping_info     JSONB       NOT NULL,
  billing           JSONB       NOT NULL,
  environmental_impact JSONB,
  status            TEXT        NOT NULL DEFAULT 'confirmed',
  tracking_number   TEXT,
  estimated_delivery TIMESTAMPTZ NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_intent_id ON orders (payment_intent_id);
