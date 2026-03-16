-- Opcional: executar no SQL Editor do Supabase antes de rodar o seed.
-- Permite que o script use upsert em experiences por (company, role, period).

alter table experiences
  add constraint experiences_company_role_period_key
  unique (company, role, period);
