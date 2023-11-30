import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './App.css'

type IBGEUFResponse = {
  id: string;
  sigla: string;
  nome: string;
};

type IBGECITYResponse = {
  id: string;
  nome: string;
};

type IBGEREGIAOResponse = {
  id: string;
  nome: string;
}

type IBGEINTERMEDIARIAResponse = {
  nome: string;
 
}
function App() {
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [regioes, setRegioes] = useState<IBGEREGIAOResponse[]>([]);
  const [intermediaria, setIntermediaria] = useState<IBGEINTERMEDIARIAResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState ("0");
  const [selectedCity, setSelectedCity] = useState ("0");
  const [selectedRegiao, setSelectedRegiao] = useState("0");
  const [selectedIntermediaria, setSelectedIntermediaria] = useState("0");

  
  useEffect(() => { axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then((response) => {
    setUfs(response.data);
   
    });
  }, []);

 

  useEffect(() => { axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then((response) => {
    setCities(response.data);
   
    });
  }, [selectedUf]);

  useEffect(() => { axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/regioes-imediatas`).then((response) => {
    setRegioes(response.data);
   
    });
  }, [selectedUf]);

  useEffect(() => { axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/regioes-intermediarias`).then((response) => {
    setIntermediaria(response.data);
   
    });
  }, [selectedUf]);

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
    setSelectedCity("0");
    setSelectedRegiao("0");
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
    setSelectedRegiao("0");
  }

  function handleSelectedRegiao(event: ChangeEvent<HTMLSelectElement>) {
    const regiao = event.target.value;
    setSelectedRegiao(regiao);
    setSelectedIntermediaria("0");
  }

  function handleSelectedIntermediaria(event: ChangeEvent<HTMLSelectElement>) {
    const intermediaria = event.target.value;
    setSelectedIntermediaria(intermediaria);
  }

  return (
  <>
  <h1>Seletor de Uf, Municipio, Regiões e Regiões Intermediarias.</h1>
  <div className="container">
  <FormControl fullWidth>
          <InputLabel id="uf-label">Selecione a UF</InputLabel>
          <Select
            labelId="uf-label"
            id="uf"
            value={selectedUf}
            label="Selecione a UF"
            onChange={handleSelectedUf}
          >
            <MenuItem value="0">Selecione a UF</MenuItem>
            {ufs.map((uf) => (
              <MenuItem key={uf.id} value={uf.sigla}>
                {uf.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="city-label">Selecione a cidade</InputLabel>
          <Select
            labelId="city-label"
            id="city"
            value={selectedCity}
            label="Selecione a cidade"
            onChange={handleSelectedCity}
          >
            <MenuItem value="0">Selecione a cidade</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.nome}>
                {city.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="regiao-label">Selecione a Região</InputLabel>
          <Select
            labelId="regiao-label"
            id="regiao-imediata"
            value={selectedRegiao}
            label="Selecione a Região"
            onChange={handleSelectedRegiao}
          >
            <MenuItem value="0">Selecione a Região-imediata</MenuItem>
            {regioes.map((regiao) => (
              <MenuItem key={regiao.id} value={regiao.nome}>
                {regiao.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="intermediaria-label">Selecione a Região-Intermediária</InputLabel>
          <Select
            labelId="intermediaria-label"
            id="intermediaria"
            value={selectedIntermediaria}
            label="Selecione a Região-Intermediária"
            onChange={handleSelectedIntermediaria}
          >
            <MenuItem value="0">Selecione a Região-Intermediária</MenuItem>
            {intermediaria.map((intermediaria) => (
              <MenuItem key={intermediaria.nome} value={intermediaria.nome}>
                {intermediaria.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  </div>



  
  </>
  )
}

export default App;
