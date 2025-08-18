-- Harden profiles schema to match frontend expectations and ensure reliability

-- Ensure required columns exist with correct defaults/types
alter table if exists public.profiles
  add column if not exists user_id uuid not null references auth.users(id) on delete cascade,
  add column if not exists email text not null,
  add column if not exists full_name text,
  add column if not exists role user_role default 'client',
  add column if not exists created_at timestamp with time zone not null default now(),
  add column if not exists updated_at timestamp with time zone not null default now();

-- Ensure unique user_id constraint for idempotency
create unique index if not exists profiles_user_id_key on public.profiles(user_id);

-- Ensure updated_at trigger exists
create or replace function public.update_profiles_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_profiles_updated_at_column();

-- Reinforce the on_auth_user_created trigger to insert role explicitly
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    'client'
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


