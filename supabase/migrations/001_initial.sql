-- PayArk Academy - Initial Schema
-- Run this in Supabase SQL Editor after creating the project

-- Profiles (extends Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Learner'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Module progress
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_pct INT DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, module_id)
);

-- Content step progress (individual videos, readings, labs)
CREATE TABLE content_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id TEXT NOT NULL,
  step_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, module_id, step_id)
);

-- Quiz attempts
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id TEXT NOT NULL,
  score INT NOT NULL,
  total INT NOT NULL,
  passed BOOLEAN NOT NULL,
  answers JSONB,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own module progress" ON module_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own module progress" ON module_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own module progress" ON module_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own content progress" ON content_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own content progress" ON content_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own content progress" ON content_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz attempts" ON quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
