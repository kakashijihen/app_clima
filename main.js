import './style.css'

import { paises } from "./js/selector"
import { showError, callApi } from './js/functions';
import { form,nameCiudad,namePais } from "./js/variables";

paises.sort()

paises.forEach(function(departamento) {
  const newOption=document.createElement("option")
  newOption.text = departamento.nombre
  newOption.value = departamento.abreviatura
  slctPaises.appendChild(newOption)
})



form.addEventListener('submit',(e)=>{
  e.preventDefault();
  if (nameCiudad.value==''||namePais.value=='') {
    showError('Ambos Campos son obligatorios')
    return;
  }

  callApi(nameCiudad.value, namePais.value)
  
})

