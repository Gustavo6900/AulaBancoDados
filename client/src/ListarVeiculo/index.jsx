import { useEffect, useState } from 'react';
import '../globals.css';

export default function ReadVeiculos() {
  const [veiculo, setVeiculo] = useState([]);


  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const response = await fetch('http://localhost:5000/veiculo');
        const data = await response.json();
        setVeiculo(data);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };

    fetchVeiculo();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/veiculo/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {

        setVeiculo(veiculo.filter((veiculo) => veiculo._id !== id));
        alert('veiculo excluída com sucesso!');
      } else {
        alert('Erro ao excluir veiculo.');
      }
    } catch (error) {
      console.error('Erro ao excluir veiculo:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Lista de veículos</h2>
      <table  className="table-container" border="1">
        <thead>
          <tr>
            <th>Código do carro</th>
            <th>Nome veículo</th>
            <th>Marca</th>
            <th>Cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculo.map((veiculo) => (
            <tr key={veiculo._id}>
              <td>{veiculo._id}</td>
              <td>{veiculo.nome}</td>
              <td>{veiculo.marca}</td>
              <td>{veiculo.cor}</td>
              <td>
                <button onClick={() => handleDelete(veiculo._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
