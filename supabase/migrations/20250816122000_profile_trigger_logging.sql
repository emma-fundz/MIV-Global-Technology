-- Logging and robustness for handle_new_user trigger

-- Log table to capture trigger executions and errors
create table if not exists public.profile_trigger_log (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  event text not null,
  user_id uuid,
  email text,
  meta jsonb,
  error text
);

-- Robust trigger function with logging and explicit search_path
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_full_name text;
begin
  v_full_name := coalesce(new.raw_user_meta_data->>'full_name', new.email);

  insert into public.profiles (user_id, email, full_name, role)
  values (new.id, new.email, v_full_name, 'client')
  on conflict (user_id) do nothing;

  insert into public.profile_trigger_log(event, user_id, email, meta)
  values ('inserted_profile', new.id, new.email, new.raw_user_meta_data);

  return new;

exception when others then
  insert into public.profile_trigger_log(event, user_id, email, meta, error)
  values ('error', new.id, new.email, new.raw_user_meta_data, SQLERRM);
  return new;
end;
$$;

-- Recreate trigger to ensure it points to the latest function
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


