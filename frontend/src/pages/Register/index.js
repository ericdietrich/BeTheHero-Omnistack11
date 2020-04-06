import React, {useState} from 'react';
import './styles.css';
import LogoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Register () {
   //usar useState para armazenar os campos preenchidos do formulário
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [whatsapp, setWhatsapp] = useState(''); 
    const [city, setCity] = useState(''); 
    const [uf , setUf] = useState(''); 
    //Funcao resposável por realizar o cadastro da ONG

    const history = useHistory();
    
    async function handleRegister(e){
      //Previne que a página carregue se clicar em Cadastrar
      e.preventDefault();

      const data = {
        name,
        email,
        whatsapp,
        city,
        uf
      };

      try {
        const response = await api.post('ongs', data);
        alert(`Seu ID de acesso: ${response.data.id}`);
        history.push('/');
      } catch (err) {
        alert('Erro no cadastro, tente novamente.');
      }    
    }

  return(
    
    <div className="register-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos da sua ONG.</p>
          <Link className="back-link" to="/"><FiArrowLeft size={16} color="#E02041" />Voltar</Link>
        </section>
        <form onSubmit={handleRegister}>
            {/*e => setName(e.target.value) equivale a function(e) {setName(e.target.value)}*/}
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Nome da ONG"/>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" placeholder="E-mail"/>
            <input 
              value={whatsapp} 
              onChange={e => setWhatsapp(e.target.value)} 
              placeholder="WhatsApp"/>
            <div className="input-group">
              <input 
                value={city} 
                onChange={e => setCity(e.target.value)} 
                placeholder="Cidade"/>
              <input 
                value={uf} 
                onChange={e => setUf(e.target.value)} 
                placeholder="UF" 
                style={{ width: 80}}/>
            </div>
            <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
};