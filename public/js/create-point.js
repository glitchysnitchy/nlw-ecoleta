function populateState() //função responsável por mostrar os estados na seleção
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

function populateCity(event) //função responsável por mostrar as cidades na seleção
{
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('input[name=state');
  
  const indexSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexSelectedState].text
  const stateValue = event.target.value

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/municipios`

  citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>"
  citySelect.disabled = true;

  fetch(url)
  .then( res => res.json() )
  .then(cities => {
    for(const city of cities)
    {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled = false;
  })
}

document
  .querySelector('select[name=state]')
  .addEventListener("change", populateCity);

const itensCollect = document.querySelectorAll('.itens-grid li');

for (const item of itensCollect)
{
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector('input[name=itens]');

let selectedItens = [] //lista de itens selecionados no formulário

function handleSelectedItem() //manipulação dos itens selecionados
{
  const itemLi = event.target;
  itemLi.classList.toggle("selected");
  const itemId = event.target.dataset.id;
  const alreadySelected = selectedItens.findIndex( (item) =>
  {
    const itemFound = item == itemId;
    return itemFound;
  })

  if(alreadySelected >= 0)
  {
    const filteredItems = selectedItens.filter(item => 
      {
        const itemIsDifferent = item != itemId;
        return itemIsDifferent;
      })
      selectedItens = filteredItems;
  }
  else
  {
    selectedItens.push(itemId);
  }
  collectedItems.value = selectedItens;
}