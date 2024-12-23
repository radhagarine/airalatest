-- Create a trigger to automatically insert user data when a new auth.users record is created
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public."User" (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Row Level Security (RLS)
alter table public."User" enable row level security;

-- Create policies
create policy "Users can view their own data" on public."User"
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public."User"
  for update using (auth.uid() = id);

