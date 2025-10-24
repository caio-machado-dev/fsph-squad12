// validação simples de email/senha
import { validateCredentials } from "./credentials"

export type GetLoginParams = {
  email: string
  senha: string
}

// Retorna apenas o resultado da tentativa de login.
export async function getLogin({ email, senha }: GetLoginParams) {
  try {
    // validação no cliente antes de simular requisição
    const validation = validateCredentials({ email, senha })

    if (!validation.valid) {
      return { success: false, message: validation.message }
    }

    // simula atraso de rede
    await new Promise<void>((res) => setTimeout(() => res(), 1200))

    // em caso de sucesso e tratamento de erro
    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false, message: "Erro desconhecido ao tentar logar." }
  }
}
