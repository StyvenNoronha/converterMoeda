async function getValues() {
  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"
    );
    const data = await response.json();
    console.log();
    //cotação de moedas hoje
    const USD = Number.parseFloat(data.USDBRL.bid);
    const EUR = Number.parseFloat(data.EURBRL.bid);
    const BTC = Number.parseFloat(data.BTCBRL.bid);

    //pegando o form
    const form = document.querySelector("form");

    //pegando o elemento
    const amount = document.getElementById("amount");

    //pegando o valor do select
    const currency = document.getElementById("currency");

    //pegando o footer dentro do main
    const footer = document.querySelector("main footer");

    //pegando o span com o id description
    const description = document.getElementById("description");

    //pegando o H1 com o ID result
    const result = document.getElementById("result");

    //Manipulando o input amount para receber somente números
    /*
    amount.addEventListener("input", () => {
      //procura no input todos os caractere
      const hascharacterRegex = /\D+/g;
      //substitui os caractere por nada
      amount.value = amount.value.replace(hascharacterRegex, "");
    });
    */

    //captando o evento de submit do formulario
    form.onsubmit = (event) => {
      //usando para nao atualizar a pagina
      event.preventDefault();

      switch (currency.value) {
        case "USD":
          convergCurrency(amount.value, USD, "US$");
          break;
        case "EUR":
          convergCurrency(amount.value, EUR, "€");
          break;
        case "BTC":
          convergCurrency(amount.value, BTC, "$");
          break;
      }
    };

    //função para converter a moeda
    function convergCurrency(amount, price, symbol) {
      try {
        //atualizando o conteudo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formmatCurrencyBRL(price)}`;

        let total = amount * price;
        result.textContent = `${formmatCurrencyBRL(total)} Reais`;

        //aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result");
      } catch (error) {
        //remove a classe  e assim remove o footer
        footer.classList.remove("show-result");
        console.log(error);
        alert("Esse erro:", error);
      }
    }

    //formata a moeda em real Brasileiro
    function formmatCurrencyBRL(value) {
      //converte para número para utilizar o toLocalString para formatar no padrão BRL
      return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

getValues();
