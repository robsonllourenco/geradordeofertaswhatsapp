function gerarTexto() {
  // Pegando os valores dos inputs
  const titulo = document.getElementById("titulo").value;
  const valor = document.getElementById("valor").value;
  const emoji = document.getElementById("emoji").value;
  const link = document.getElementById("link").value;
  const cupom = document.getElementById("cupom").value; // Campo de cupom
  const incluirFrase = document.getElementById("incluirFrase").value; // Select de incluir frase
  const exibirCarrinho = document.getElementById("exibirCarrinho").checked; // Checkbox para exibir link do carrinho

  // Link do carrinho fixo
  const linkCarrinho = "https://s.shopee.com.br/7fGt2BZA3U";

  // Gerando o texto no formato desejado com negrito para o WhatsApp
  let textoGerado = `*${titulo}* ${emoji}

*🔥 R$${valor}*`;

  // Adiciona a frase "vai acabar a qualquer momento" se a opção "sim" for selecionada
  if (incluirFrase === "sim") {
      textoGerado += `\n_vai acabar a qualquer momento_`;
  }

  // Adiciona o cupom logo abaixo do valor, se houver um
  if (cupom) {
      textoGerado += `\n\n🎟️ Use o cupom: ${cupom}`;
  }

  textoGerado += `\n\n👇 Link do produto p/ comprar:
${link}`;

  // Se a checkbox para exibir o link do carrinho estiver marcada, adiciona o link do carrinho
  if (exibirCarrinho) {
    textoGerado += `\n\n🛒 link para o carrinho:
${linkCarrinho}`;
  }

  // Exibindo o texto gerado no textarea
  document.getElementById("textoGerado").value = textoGerado.trim();
}

function copiarTexto() {
  const textoGerado = document.getElementById("textoGerado");

  // Seleciona o texto
  textoGerado.select();
  textoGerado.setSelectionRange(0, 99999); // Para mobile

  // Copia o texto selecionado
  document.execCommand("copy");

  // Exibe a notificação de sucesso
  mostrarNotificacao("Texto copiado com sucesso!");
}

function mostrarNotificacao(mensagem) {
  const notification = document.getElementById("notification");
  notification.textContent = mensagem;
  notification.classList.add("show");

  // Remove a notificação após 3 segundos
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}
