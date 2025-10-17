import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

export type GetLoginParams = {
  email: string;
  senha: string;
  router: ReturnType<typeof useRouter>;
  setLoading: (v: boolean) => void;
};

export async function getLogin({ email, senha, router, setLoading }: GetLoginParams) {
  try {
    setLoading(true);

    if (!email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    // Simula delay de login e navega
    setTimeout(() => {
      router.replace('/(home_page)/home_page');
      setLoading(false);
    }, 2000);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}
