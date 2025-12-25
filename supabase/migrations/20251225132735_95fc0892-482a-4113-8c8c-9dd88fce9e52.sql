-- Fix RLS policies for users table
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" 
ON public.users 
FOR SELECT 
USING (
  (telegram_id)::text = current_setting('app.current_user_telegram_id', true)
  OR current_setting('app.current_user_telegram_id', true) IS NULL
);

-- Fix RLS policies for subscriptions table
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (
  user_id IN (
    SELECT id FROM public.users 
    WHERE (telegram_id)::text = current_setting('app.current_user_telegram_id', true)
  )
);

-- Fix RLS policies for payments table
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
CREATE POLICY "Users can view own payments" 
ON public.payments 
FOR SELECT 
USING (
  user_id IN (
    SELECT id FROM public.users 
    WHERE (telegram_id)::text = current_setting('app.current_user_telegram_id', true)
  )
);