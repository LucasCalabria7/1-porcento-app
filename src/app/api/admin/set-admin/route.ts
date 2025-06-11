import { NextRequest, NextResponse } from 'next/server';
import { setUserAsAdmin } from '@/lib/databaseAdmin';

/**
 * API route para definir um usuário como administrador
 * Esta rota deve ser protegida em ambiente de produção
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar se a requisição tem um token de autorização válido
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.DB_ADMIN_KEY;
    
    // Verificação básica de segurança
    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Obter o email do usuário do corpo da requisição
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email do usuário é obrigatório' },
        { status: 400 }
      );
    }
    
    // Definir o usuário como administrador
    const result = await setUserAsAdmin(email);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Erro ao definir usuário como administrador', details: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: result.message },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro na API de definição de administrador:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error },
      { status: 500 }
    );
  }
}
