import { useState } from 'react';
import '../globals.css';
import { useNavigate } from 'react-router-dom';


export default function CreateVeiculo() {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [cor, setCor] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoVeiculo = { nome, marca, cor };

    try {
      const response = await fetch('http://localhost:5000/matriculas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoVeiculo),
      });
      if (response.ok) {
        alert('veiculo registrado com sucesso!');
        setNome('');
        setMarca('');
        setCor('');
        navigate("/matriculas");
      } else {
        alert('Erro ao criar veiculo.');
      }
    } catch (error) {
      console.error('Erro ao criar veiculo:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Registrar veiculo</h2>
      <input
        type="text"
        placeholder="Nome do Veiculo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Marca"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="cor"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
        required
      />
      <button type="submit">Registrar veiculo</button>
    </form>
    </div>
  );
}
