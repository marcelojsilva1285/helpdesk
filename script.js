const formulario = document.querySelector("#form-chamado");
const listaChamados = document.querySelector("#lista-chamados");

const chamados = JSON.parse(localStorage.getItem("chamados")) || [];

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  // Lógica para enviar o formulário
  const titulo = document.querySelector("#titulo").value;
  const descricao = document.querySelector("#descricao").value;
  const prioridade = document.querySelector("#prioridade").value;

  //Criar o objeto
  const novoChamado = {
    titulo,
    descricao,
    prioridade,
    status: "aberto",
  };

  //Adicionar ao array.
  chamados.push(novoChamado);

  // Salvar no localStorage
  localStorage.setItem("chamados", JSON.stringify(chamados));

  //Renderizar na interface.
  renderizarChamado(novoChamado);

  //Limpar o formulário.
  formulario.reset();
});

function renderizarChamado(chamado) {
  const nomesPrioridades = {
    baixa: "Baixa",
    media: "Media",
    alta: "Alta",
  };

  const item = document.createElement("li");
  item.classList.add("chamado");

  const conteudo = document.createElement("div");
  conteudo.classList.add("chamado__descricao");

  const titulo = document.createElement("h3");
  titulo.textContent = chamado.titulo;

  const textoDescricao = document.createElement("p");
  textoDescricao.textContent = chamado.descricao;

  const prioridade = document.createElement("span");
  prioridade.classList.add(
    "chamado__prioridade",
    `chamado__prioridade--${chamado.prioridade}`,
  );

  prioridade.textContent = nomesPrioridades[chamado.prioridade];

  const status = document.createElement("span");
  status.textContent = chamado.status;
  status.classList.add("chamado__status", `chamado__status--${chamado.status}`);

  conteudo.appendChild(titulo);
  conteudo.appendChild(textoDescricao);
  conteudo.appendChild(prioridade);

  item.appendChild(conteudo);
  item.appendChild(status);

  listaChamados.appendChild(item);
}

chamados.forEach((chamado) => {
  renderizarChamado(chamado);
});
