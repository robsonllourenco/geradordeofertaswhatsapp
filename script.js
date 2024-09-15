let selectedImage = null;

function gerarTexto() {
  const titulo = document.getElementById("titulo").value;
  const valor = document.getElementById("valor").value;
  const emoji = document.getElementById("emoji").value;
  const link = document.getElementById("link").value;
  const cupom = document.getElementById("cupom").value;
  const incluirFrase = document.getElementById("incluirFrase").value;
  const exibirCarrinho = document.getElementById("exibirCarrinho").checked;

  const linkCarrinho = "https://s.shopee.com.br/1LN0ZvoeY4";
  let marcaOferta = "";

  // Adiciona a marcação com formatação estética logo acima do link
  if (link.includes("https://s.shopee.com.br")) {
    marcaOferta = `🟧 *Oferta da Shopee*`;
  } else if (link.includes("https://amzn.to")) {
    marcaOferta = `🟦 *Oferta da Amazon*`;
  } else if (link.includes("mercadolivre.com.br")) {
    marcaOferta = `🟨 *Oferta do Mercado Livre*`;
  }

  let textoGerado = `${emoji} *${titulo}*\n\n*🔥 R$${valor}*`;

  if (incluirFrase === "sim") {
    textoGerado += `\n_vai acabar a qualquer momento_`;
  }

  if (cupom) {
    textoGerado += `\n\n🎟️ Use o cupom: ${cupom}`;
  }

  // Adiciona a marcação de oferta antes do link do produto
  textoGerado += `\n\n${marcaOferta}\n\n👇 Link do produto p/ comprar:\n${link}`;

  if (exibirCarrinho) {
    textoGerado += `\n\n🛒 link para o carrinho:\n${linkCarrinho}`;
  }

  document.getElementById("textoGerado").value = textoGerado.trim();
}

// Função para remover os asteriscos ao enviar a mensagem para o Telegram
function limparAsteriscos(texto) {
  return texto.replace(/\*/g, ''); // Remove todos os * do texto
}

function enviarParaTelegram() {
  let textoGerado = document.getElementById("textoGerado").value;

  // Remove os * do texto apenas antes de enviar ao Telegram
  textoGerado = limparAsteriscos(textoGerado);

  const token = '6753980070:AAE0jfL0J7RL5EBXbnC8ooGXo7e6yQvmCKQ';
  const chatId = '-1002220689320';

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("caption", textoGerado); // Adiciona o texto como legenda da imagem

  if (selectedImage) {
    formData.append("photo", selectedImage, "image.jpg"); // Garante que o arquivo seja enviado com o nome correto
    fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        mostrarNotificacao("Mensagem com imagem enviada para o Telegram com sucesso!");
      } else {
        console.log(data); // Exibe a resposta para verificar o erro
        mostrarNotificacao("Erro ao enviar mensagem para o Telegram.");
      }
    })
    .catch(error => {
      mostrarNotificacao("Erro na solicitação: " + error);
    });
  } else {
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat_id: chatId, text: textoGerado, parse_mode: 'Markdown' }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        mostrarNotificacao("Mensagem enviada para o Telegram com sucesso!");
      } else {
        console.log(data); // Exibe a resposta para verificar o erro
        mostrarNotificacao("Erro ao enviar mensagem para o Telegram.");
      }
    })
    .catch(error => {
      mostrarNotificacao("Erro na solicitação: " + error);
    });
  }
}

function copiarTexto() {
  const textoGerado = document.getElementById("textoGerado");

  textoGerado.select();
  textoGerado.setSelectionRange(0, 99999);

  document.execCommand("copy");
  mostrarNotificacao("Texto copiado com sucesso!");
}

function mostrarNotificacao(mensagem) {
  const notification = document.getElementById("notification");
  notification.textContent = mensagem;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Manipulando a colagem de imagem
document.getElementById("image-preview").addEventListener("paste", function (e) {
  const items = e.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf("image") !== -1) {
      const blob = items[i].getAsFile();
      const reader = new FileReader();

      reader.onload = function (event) {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;
        document.getElementById("image-preview").innerHTML = "";
        document.getElementById("image-preview").appendChild(imgElement);
        selectedImage = blob; // Define a imagem selecionada
      };

      reader.readAsDataURL(blob);
    }
  }
});
