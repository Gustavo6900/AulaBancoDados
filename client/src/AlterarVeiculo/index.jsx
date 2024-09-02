import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateVeiculo() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [cor, setCor] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atualizacao = { nome, marca, cor };

    try {
      const response = await fetch(`http://localhost:5000/matriculas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atualizacao),
      });
      if (response.ok) {
        alert('veiculo atualizado com sucesso!');
        navigate("/matriculas");
      } else {
        alert('Erro ao atualizar veiculo.');
      }
    } catch (error) {
      console.error('Erro ao atualizar veiculo:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Atualizar veiculo</h2>
      <input
        type="text"
        placeholder="ID do veiculo"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome do veiculo"
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
      <button type="submit">Atualizar veiculo</button>
    </form>
    </div>
  );
}
