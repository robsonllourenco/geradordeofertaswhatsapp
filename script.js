function gerarTexto() {
    // Pegando os valores dos inputs
    const titulo = document.getElementById("titulo").value;
    const valor = document.getElementById("valor").value;
    const emoji = document.getElementById("emoji").value;
    const link = document.getElementById("link").value;
  
    // Link do carrinho fixo
    const linkCarrinho = "https://s.shopee.com.br/4fd9IbIqvf";

    // Gerando o texto no formato desejado com negrito para o WhatsApp
    const textoGerado = `*${titulo}* ${emoji}

  *🔥 R$${valor}*

${titulo}
${link}
  
🛒 link para o carrinho:
${linkCarrinho}`;
  
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
  