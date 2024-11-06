document.addEventListener('DOMContentLoaded', function () {
    // URL da API do Mockapi.io
    const apiUrl = 'https://672b86f01600dda5a9f56423.mockapi.io/animal-api/Animal';
    const animalList = document.getElementById('animal-list');
    const addAnimalButton = document.getElementById('add-animal');

    // Função para carregar os animais da API e exibir na lista
    function loadAnimals() {
        axios.get(apiUrl)
            .then(response => {
                const animals = response.data;
                animalList.innerHTML = ''; // Limpar a lista antes de preencher
                animals.forEach(animal => {
                    const li = document.createElement('li');
                    li.textContent = `${animal.id} - ${animal.name} (${animal.age} anos) – ${animal.breed}`;
                    animalList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os animais:', error);
            });
    }

    // Função para adicionar um novo animal "hardcode" na API
    function addAnimal() {
        const newAnimal = {
            name: 'Totó',
            age: 12,
            breed: 'Cachorro'
        };

        axios.post(apiUrl, newAnimal)
            .then(response => {
                console.log('Animal cadastrado:', response.data);
                loadAnimals(); // Recarregar a lista após adicionar um novo animal
            })
            .catch(error => {
                console.error('Erro ao cadastrar o animal:', error);
            });
    }

    // Carregar a lista de animais ao carregar a página
    loadAnimals();

    // Adicionar evento para o botão de cadastrar animal
    addAnimalButton.addEventListener('click', addAnimal);
});
