//cotação de moedas hoje
const USD = 5.75
const EUR = 6.27
const GBP = 7.32

//pegando o form
const form = document.querySelector("form")

//pegando o elemento
const amount = document.getElementById("amount")

//pegando o valor do select 
const currency = document.getElementById("currency")

//pegando o footer dentro do main 
const footer = document.querySelector("main footer")

//pegando o span com o id description
const description = document.getElementById("description")

//pegando o H1 com o ID result
const result = document.getElementById("result")

//Manipulando o input amount para receber somente números
amount.addEventListener("input",() => {
//procura no input todos os caractere
const hascharacterRegex = /\D+/g
//substitui os caractere por nada
amount.value = amount.value.replace(hascharacterRegex, "")


})

//captando o evento de submit do formulario
form.onsubmit = () => {
    //usando para nao atualizar a pagina
    event.preventDefault()

    switch(currency.value){
        case "USD":
            convergCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convergCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convergCurrency(amount.value, GBP, "£")
            break         
    }
}


//função para converter a moeda
function convergCurrency(amount, price,symbol){
 try {

    //atualizando o conteudo a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formmatCurrencyBRL(price)}`


    let total = amount * price
    result.textContent = `${formmatCurrencyBRL(total)} Reais`


    //aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result")


 } catch (error) {
    
    //remove a classe  e assim remove o footer
    footer.classList.remove("show-result")
    console.log(error)
    alert('Esse erro:',error)
 }
}

//formata a moeda em real Brasileiro
function formmatCurrencyBRL(value){
 //converte para número para utilizar o toLocalString para formatar no padrão BRL   
 return Number(value).toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL"
 })
}