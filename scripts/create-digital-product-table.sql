-- Criar tabela de produtos digitais
CREATE TABLE IF NOT EXISTS public.digital_product (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BRL',
  product_type VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.digital_product ENABLE ROW LEVEL SECURITY;

-- Criar políticas de segurança
-- Política de leitura pública (todos podem ver produtos ativos)
DROP POLICY IF EXISTS "Anyone can read active products" ON public.digital_product;
CREATE POLICY "Anyone can read active products" ON public.digital_product
  FOR SELECT USING (is_active = true);

-- Política de leitura para o dono (pode ver todos os seus produtos)
DROP POLICY IF EXISTS "Owners can read their products" ON public.digital_product;
CREATE POLICY "Owners can read their products" ON public.digital_product
  FOR SELECT USING (auth.uid() = owner_id);

-- Política de atualização (apenas o dono pode atualizar)
DROP POLICY IF EXISTS "Owners can update their products" ON public.digital_product;
CREATE POLICY "Owners can update their products" ON public.digital_product
  FOR UPDATE USING (auth.uid() = owner_id);

-- Política de inserção (usuários autenticados podem criar produtos)
DROP POLICY IF EXISTS "Users can create products" ON public.digital_product;
CREATE POLICY "Users can create products" ON public.digital_product
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Política de deleção (apenas o dono pode deletar)
DROP POLICY IF EXISTS "Owners can delete their products" ON public.digital_product;
CREATE POLICY "Owners can delete their products" ON public.digital_product
  FOR DELETE USING (auth.uid() = owner_id);

-- Criar função para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar o campo updated_at
DROP TRIGGER IF EXISTS update_digital_product_updated_at ON public.digital_product;
CREATE TRIGGER update_digital_product_updated_at
BEFORE UPDATE ON public.digital_product
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
