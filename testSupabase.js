import { supabase } from './services/supabase.js';


const testConnection = async () => {
  const { data, error } = await supabase.from('Alunos').select('*');
  if (error) {
    console.error('Erro ao acessar o Supabase:', error.message);
  } else {
    console.log('Conexão bem-sucedida:', data);
  }
};

testConnection();
