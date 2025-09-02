-- Add 'free' to the subscription_plan enum
ALTER TYPE subscription_plan ADD VALUE 'free';

-- Update the handle_new_user function to support 'free' plan
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_full_name text;
  v_company_name text;
  v_phone text;
  v_plan public.subscription_plan;
begin
  v_full_name := coalesce(new.raw_user_meta_data->>'full_name', new.email);
  v_company_name := coalesce(new.raw_user_meta_data->>'company_name', '');
  v_phone := coalesce(new.raw_user_meta_data->>'phone', '');

  -- Safely determine plan from metadata; fallback to 'free' if invalid/missing
  v_plan := case
    when new.raw_user_meta_data ? 'plan'
     and (new.raw_user_meta_data->>'plan') in ('free','starter','basic','standard','premium')
      then (new.raw_user_meta_data->>'plan')::public.subscription_plan
    else 'free'::public.subscription_plan
  end;

  -- Insert profile if missing
  insert into public.profiles (user_id, email, full_name, role)
  values (new.id, new.email, v_full_name, 'client')
  on conflict (user_id) do nothing;

  -- Insert client if missing
  insert into public.clients (user_id, full_name, email, company_name, phone, plan)
  values (new.id, v_full_name, new.email, v_company_name, v_phone, v_plan)
  on conflict (user_id) do nothing;

  -- Optional: log success if log table exists
  begin
    insert into public.profile_trigger_log(event, user_id, email, meta)
    values ('inserted_profile_and_client', new.id, new.email, new.raw_user_meta_data);
  exception when undefined_table then
    -- ignore if log table hasn't been created in this environment
    null;
  end;

  return new;

exception when others then
  -- Log any errors if log table exists
  begin
    insert into public.profile_trigger_log(event, user_id, email, meta, error)
    values ('error', new.id, new.email, new.raw_user_meta_data, SQLERRM);
  exception when undefined_table then
    null;
  end;
  return new;
end;
$$;

-- Ensure trigger points to updated function
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
