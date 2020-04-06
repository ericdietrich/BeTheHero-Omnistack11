import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
  const [incidents, SetIncidents] = useState([]);
  const ongName = localStorage.getItem('ongName');
	const ongId = localStorage.getItem('ongId');
	const history = useHistory();

  //UseEffect recebe 2 parametros:
  //O primeiro é uma função a ser executada
  //O segundo diz respeito a quando a função acima será executada, usa-se um array com elementos
  //Todas as vezes que o array do segundo elemento for alterado a função é executada
  //Se o array ficar vazio, a função é executada uma única vez
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      SetIncidents(response.data);  
    })
	}, [ongId]); // ongId é o segundo parâmetro, quando é alterado, os incidentes são atualizados
	
	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId,
				}
			});
			SetIncidents(incidents.filter(incident => incident.id !== id)	)
		} 
		catch (err) {
			alert('Erro ao excluir caso. Tente novamente.');
		}
	}

	function handleLogout(){
		localStorage.clear();
		history.push('/');
	}

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
  <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => {
          return(
						<li key={incident.id} >
							<strong>CASO:</strong>
							<p>{incident.title}</p>
							
							<strong>DESCRIÇÃO:</strong>
							<p>{incident.description}</p>
							
							<strong>VALOR:</strong>
							<p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
							
							{//no evento onClick se colocar apenas hadleDeleteIncident(id), ela trará o retorno da função, podendo excluir todos os registros, como foi colocado abaixo, o código está execuntando uma função
							}	
							<button onClick={() => handleDeleteIncident(incident.id)} type="button">
								<FiTrash2 size={20} color="#a8a8b3"/>
							</button>
						</li>
          )
        })}
      </ul>
      
    </div>
  )
}