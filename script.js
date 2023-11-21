document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    // Obtenha outros valores dos campos
  
    const formData = { nome, email }; // Crie um objeto com os dados do formulário
  
    // Armazenamento local
    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    submissions.push(formData);
    localStorage.setItem('submissions', JSON.stringify(submissions));
  
    // Atualize a tabela com as submissões
    const tabela = document.getElementById('tabela');
    tabela.classList.remove('hidden');
    const tabelaCorpo = document.getElementById('tabelaCorpo');
    const newRow = tabelaCorpo.insertRow();
    for (let key in formData) {
      const cell = newRow.insertCell();
      cell.innerHTML = formData[key];
    }
  
    // Limpe os campos do formulário após a submissão
    document.getElementById('form').reset();
  });
  
  // ...

// Função para preencher a tabela com os dados do localStorage
function preencherTabela() {
  const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
  const tabelaCorpo = document.getElementById('tabelaCorpo');
  tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de preencher novamente

  submissions.forEach((formData, index) => {
    const newRow = tabelaCorpo.insertRow();
    for (let key in formData) {
      const cell = newRow.insertCell();
      cell.innerHTML = formData[key];
    }

    // Adiciona um botão para remover a entrada
    const cellRemover = newRow.insertCell();
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.addEventListener('click', function() {
      submissions.splice(index, 1);
      localStorage.setItem('submissions', JSON.stringify(submissions));
      preencherTabela(); // Atualiza a tabela após a remoção
    });
    cellRemover.appendChild(btnRemover);
  });
}

// Evento de envio do formulário
document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  // Obtenha outros valores dos campos

  const formData = { nome, email }; // Crie um objeto com os dados do formulário

  // Armazenamento local
  let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
  submissions.push(formData);
  localStorage.setItem('submissions', JSON.stringify(submissions));

  // Atualize a tabela com as submissões
  preencherTabela();

  // Limpe os campos do formulário após a submissão
  document.getElementById('form').reset();
});

// Inicializa a tabela com os dados do localStorage ao carregar a página
preencherTabela();
