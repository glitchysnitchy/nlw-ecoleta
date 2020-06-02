function populateState()
{
  const stateSelect = document.querySelector('select[name=state]')
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then(states => {
    for(const state of states)
    {
      stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}
populateState();

function populateCity(event)
{
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('input[name=state');
  
  const indexSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexSelectedState].text
  const stateValue = event.target.value

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/municipios`

  fetch(url)
  .then( res => res.json() )
  .then(cities => {
    for(const city of cities)
    {
      citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
    }
    citySelect.disabled = false;
  })
}

document
  .querySelector('select[name=state]')
  .addEventListener("change", populateCity);