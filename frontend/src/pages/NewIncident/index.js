import React, { useState } from 'react';
import './styles.css';
import LogoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function NewIncident(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();
  const ongId = localStorage.getItem ('ongId');


  async function handleNewIncident (e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      const response = await api.post('incidents', data, {
        headers : {
          Authorization: ongId,
        } 
      });
      history.push('/profile');
    }
    catch (err){
      alert('Erro ao cadastrar caso. Tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero" />
          <h1>Cadastro novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile"><FiArrowLeft size={16} color="#E02041" />Voltar para home</Link>
        </section>
        <form onSubmit = {handleNewIncident} >
            <input
              name = {title}
              placeholder="Título do caso"
              onChange = {e => setTitle(e.target.value)}  
            />
            <textarea 
              name = {description}
              type="text-area" 
              placeholder="Descrição"
              onChange = {e => setDescription(e.target.value)}
            />
            <input 
              name = {value}
              placeholder="Valor em reais"
              onChange = {e => setValue(e.target.value)}
            />
            
            <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div> 
  )
};