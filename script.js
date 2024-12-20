// script.js

// Obtendo elementos do DOM
const openModalBtn = document.getElementById('open-modal-btn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');

// Função para abrir o modal
const openModal = () => {
  modal.style.display = 'block';
};

// Função para fechar o modal
const closeModal = () => {
  modal.style.display = 'none';
};

// Adicionando eventos aos botões
openModalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);


// Pegar o valor do campo
document.getElementById('confirmar').addEventListener('click', function () {
  let codigoBusca = document.getElementById('codigo').value;

  codigoBusca = codigoBusca.toUpperCase()

  if (codigoBusca) {
    buscaNoExcel(codigoBusca);
  } else {
    alert("Por favor, insira um código.");
  }
});

// Função para buscar no Excel (a partir do diretório raiz)
function buscaNoExcel(codigoBusca) {
  // A URL do arquivo Excel, que está na raiz do servidor
  const excelUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmDux6MQTacWEu9arFbNc2vo8gSHz4YkfzmNk2d20oul6AOEOiH3QyS--nUwzGng/pubhtml?gid=991075956&single=true';  // Substitua pelo caminho real do seu arquivo Excel

  // Requisição para buscar o arquivo Excel
  fetch(excelUrl)
      .then(response => response.arrayBuffer()) // Obtém o arquivo como um ArrayBuffer
      .then(data => {
          // Carregar o arquivo Excel usando a biblioteca xlsx.js
          const workbook = XLSX.read(data, { type: 'array' });

          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Buscar pelo código no Excel
          let resultado = jsonData.find(row => row.Codigo === codigoBusca);

          if (resultado) {
              document.getElementById('resultado').style.display = 'inline-block'
              // Exibir as informações na tela principal
              document.getElementById('localizacao').innerText = 'Localização da Avaria: ' + resultado.Localizacao;
              document.getElementById('causa').innerText = 'Causa da Avaria: ' + resultado.Causa;
              document.getElementById('capitulo').innerText = 'Capítulo/Origem: ' + resultado.Capitulo;

              closeModal()
          } else {
              alert("Código não encontrado.");
          }
      })
      .catch(error => {
          console.error("Erro ao carregar ou processar o arquivo Excel:", error);
          alert("Ocorreu um erro ao tentar carregar o arquivo Excel.");
      });
}