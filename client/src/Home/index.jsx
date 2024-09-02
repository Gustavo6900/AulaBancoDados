import { Link } from 'react-router-dom';
import '../globals.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Home() {
    return (
        <div>
            <Header/>
        <div className='container'>
            <h2>Gerenciamento de veiculo</h2>
            <div className="card-container">
                <Link to="/matricula/cadastrar" className="card">
                    <div>Registrar veiculo</div>
                </Link>
                <Link to="/matriculas" className="card">
                    <div>Lista de Veiculos</div>
                </Link>
                <Link to="/matriculas/alterar" className="card">
                    <div>Editar veiculo</div>
                </Link>
            </div>
        </div>
        <Footer/>
        </div>
    );
}
