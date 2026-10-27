'use strict';
const articleDialog = document.querySelector('#article-dialog');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navegacao');
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
articleDialog.addEventListener('click', event => {
  const bounds = articleDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (event.target === articleDialog && outside) articleDialog.close();
});
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a, button').forEach(item => item.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}));
const articles = {
  repeticoes: {
    category: 'REFLEXÕES',
    title: 'Quando a mesma história parece se repetir.',
    paragraphs: [
      'Às vezes, as pessoas e os cenários mudam, mas uma situação parece familiar: um tipo de conflito, uma escolha ou uma maneira de se colocar nas relações.',
      'Perceber essa semelhança pode abrir perguntas sobre a própria experiência. Isso não significa que toda repetição tenha a mesma origem ou que uma frase seja suficiente para explicá-la.',
      'No trabalho psicanalítico, essas questões podem ser investigadas a partir da história singular de cada pessoa.'
    ]
  },
  contato: {
    category: 'COMECE AQUI',
    title: 'Como pode começar o primeiro contato?',
    paragraphs: [
      'Você pode escrever uma mensagem simples para perguntar sobre o atendimento. Não é necessário enviar, de início, um relato detalhado de situações pessoais.',
      'Vale esclarecer a proposta de trabalho, as modalidades, a frequência, os valores e os horários disponíveis. Essas informações ajudam a decidir os próximos passos.',
      'O contato por mensagem não confirma uma sessão. O agendamento e as condições de atendimento precisam ser combinados diretamente com o profissional.'
    ]
  },
  perguntas: {
    category: 'PSICANÁLISE NA PRÁTICA',
    title: 'O que perguntar antes de iniciar?',
    paragraphs: [
      'Conhecer as condições do atendimento também faz parte de uma escolha informada. Você pode levar dúvidas objetivas ao primeiro contato.'
    ],
    items: [
      'Como o profissional descreve sua formação e sua proposta de trabalho?',
      'Quais modalidades e horários estão disponíveis?',
      'Como são combinados frequência, valores e eventuais remarcações?',
      'Como funciona a conversa inicial e a decisão sobre seguir?'
    ],
    ending: 'Faça as perguntas que considerar importantes. Clareza sobre o processo ajuda a construir um primeiro contato mais consciente.'
  }
};
function openArticle(key) {
  const article = articles[key];
  if (!article) return;
  document.querySelector('#article-category').textContent = article.category;
  document.querySelector('#article-title').textContent = article.title;
  const body = document.querySelector('#article-body');
  body.replaceChildren();
  article.paragraphs.forEach(text => { const p = document.createElement('p'); p.textContent = text; body.append(p); });
  if (article.items) {
    const ul = document.createElement('ul');
    article.items.forEach(text => { const li = document.createElement('li'); li.textContent = text; ul.append(li); });
    body.append(ul);
  }
  if (article.ending) { const p = document.createElement('p'); p.textContent = article.ending; body.append(p); }
  const note = document.createElement('p');
  note.className = 'article-meta-note';
  note.textContent = 'Conteúdo conceitual de demonstração. A versão final será validada pelo profissional.';
  body.append(note);
  articleDialog.showModal();
}
document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => openArticle(button.dataset.article)));
