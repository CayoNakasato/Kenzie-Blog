const principal = document.querySelector(".root")
//setInterval, btn n precisa
function criarModal(mensagem){
    const divError = document.createElement("div")
    const titleError = document.createElement("h1")
    const pError = document.createElement("p")
    const btnError = document.createElement("button")

    divError.classList.add("box_error")
    titleError.classList.add("titleError")
    pError.classList.add("pError")
    btnError.classList.add("btnError")

    titleError.innerText = "Aconteceu um erro!"
    pError.innerText = mensagem
    btnError.innerText = "Voltar"

    btnError.addEventListener("click", ()=>{
        divError.classList.add("hidden")
    })

    divError.append(titleError, pError, btnError)

    principal.appendChild(divError)
}

export { criarModal }
