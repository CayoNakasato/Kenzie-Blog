import PostControllers  from "../Controllers/postControllers.js"
import UsuarioController from "../Controllers/usuarioControllers.js"

export class Blog{
    static contador = 1;
    static async  modalBlog(data){
        const principal = document.querySelector(".root")

        const header = document.createElement("header")
        const divHeader = document.createElement("div")
        const avatar = document.createElement("img")
        const username = document.createElement("h2")
        const divBtn = document.createElement("div")
        const logout = document.createElement("button")
        const main = document.createElement("main")
        const divPost = document.createElement("div")
        const typeBox = document.createElement("textarea")
        const btnAddPost = document.createElement("button")
        const timeLine = document.createElement("ul")
        const controlePagina =document.createElement("div")
        const btnProximaPagina = document.createElement("button")
        const textoPagina = document.createElement("p")
        const btnVoltarPagina = document.createElement("button")

        divHeader.classList.add("userInfo")
        avatar.classList.add("userImg")
        username.classList.add("userName")
        divBtn.classList.add("btnLogout")
        timeLine.classList.add("timeLine")
        logout.classList.add("btn_Logout")
        divPost.classList.add("typeBox")
        typeBox.classList.add("inputTypeText")
        btnAddPost.classList.add("btn_add")
        controlePagina.classList.add("trocaPagina_box")
        btnProximaPagina.classList.add("proxPagina")
        textoPagina.classList.add("textoInfoPagina")
        btnVoltarPagina.classList.add("voltarPagina")
        
        
        avatar.src = data.avatarUrl
        username.innerText = data.username 
        logout.innerText = "Logout"
        typeBox.placeholder = "Diga algo interessante para as pessoas!"
        btnAddPost.innerText = "+"
        btnProximaPagina.innerText = ">"
        btnVoltarPagina.innerText = "<"
        
        btnAddPost.addEventListener("click", (e)=>{
            e.preventDefault()
            PostControllers.criarPost({"content": typeBox.value})
        })
        
        logout.addEventListener("click", ()=>{
            UsuarioController.deslogarUsuario()
        })

        btnProximaPagina.addEventListener("click",async ()=>{
            this.contador ++
            
            await PostControllers.listarPaginaPost(this.contador)
            timeLine.innerHTML = ''
            this.renderizarPost(await this.mostrarPosts())
        })
        
        btnVoltarPagina.addEventListener("click",async ()=>{
            this.contador --
                
            await PostControllers.listarPaginaPost(this.contador)
            timeLine.innerHTML = ''
            this.renderizarPost(await this.mostrarPosts())
        })

        divHeader.append(avatar, username)
        divBtn.append(logout)
        divPost.append(typeBox, btnAddPost)
        controlePagina.append(btnVoltarPagina, textoPagina, btnProximaPagina)
        header.append(divHeader,divBtn)
        main.append(divPost, timeLine, controlePagina)
        
        principal.append(header, main)

        this.renderizarPost(await this.mostrarPosts())
    }

    static async mostrarPosts(){
        let posts = await PostControllers.listarPaginaPost(this.contador)
        let paginaAtual = document.querySelector(".textoInfoPagina")
        paginaAtual.innerText = `${posts.page} de ${posts.lastPage} Paginas`;
        return posts.data;
    }

    static async renderizarPost(posts){
        const timeLine = document.querySelector(".timeLine")
        posts.forEach(userPost => {
            const post = document.createElement("li");
            const imgUsers = document.createElement("img");
            const nameAndContent = document.createElement("div")
            const usersName = document.createElement("h2");
            const content = document.createElement("p");
            const divInfo = document.createElement("div")
            const date = document.createElement("span")
            
            post.classList.add("post_box")
            imgUsers.classList.add("usersImg");
            usersName.classList.add("usersName");
            nameAndContent.classList.add("nameContent");
            content.classList.add("tweet");
            date.classList.add("date")
            divInfo.classList.add("edit")
            
            if(userPost.owner.id === localStorage.getItem("UserId")){
                const btn_editar = document.createElement("button")
                const btn_excluir = document.createElement("button")
                btn_editar.classList.add("btnAdd")
                btn_excluir.classList.add("btnRemove")
                btn_editar.innerText = "Editar"
                btn_excluir.innerText = "Apagar"

                btn_excluir.addEventListener("click", (e)=>{
                 PostControllers.deletarPost(localStorage.getItem("postId"))
                })

                btn_editar.addEventListener("click", ()=>{
                    const newTypebox = document.createElement("textarea")
                    const newButtonEdit = document.createElement("button")
                    newTypebox.placeholder = "Mude teu post antigo"
                    newButtonEdit.innerText = "Editar"
                        newButtonEdit.addEventListener("click", ()=>{
                            PostControllers.atualizarPost({"newContent": newTypebox.value}, localStorage.getItem("postId"))
                        })
                    divInfo.append(newTypebox, newButtonEdit)
                })

                divInfo.append(btn_editar, btn_excluir, date)
            }

            imgUsers.src = userPost.owner.avatarUrl;
            usersName.innerText = userPost.owner.username;
            content.innerText = userPost.post
            date.innerText = userPost.createdAt;

            divInfo.append(date)
            nameAndContent.append(usersName, content)
            post.append(imgUsers, nameAndContent, divInfo)

            timeLine.appendChild(post)
        });
    }
}

