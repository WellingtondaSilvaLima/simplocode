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