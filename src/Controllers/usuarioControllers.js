import { Blog } from "../js/blog.js";
import { criarModal } from "../Models/errorModal.js";

class UsuarioController{
    static REGISTER_URL = "https://api-blog-m2.herokuapp.com/user/register"
    static LOGIN_URL = "https://api-blog-m2.herokuapp.com/user/login"

    static async registrarUsuario(data){
           const response = await  fetch(this.REGISTER_URL,{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })
            const newData = await response.json()
            if(newData.status !== undefined){
                criarModal(newData.message)
            }else{
                window.location = `./../Pages/loginPages.html`
            }
            return newData;
    }

    static async logarUsuario(data){
        const response = await fetch(this.LOGIN_URL,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        const token = await response.json()
        if(token.status !== undefined){
            criarModal(token.message)
        }else{
            localStorage.setItem("Token", token.token)
            localStorage.setItem("UserId", token.userId)
            window.location = `./../Pages/blogPages.html`
        }
    }

    static async listarUsuario(){
        fetch(
            `https://api-blog-m2.herokuapp.com/user/${localStorage.getItem("UserId")}`,
        {
            method : "GET",
                headers : {
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                }
        })
        .then((res)=>res.json())
        .then((res) =>{
            Blog.modalBlog(res)
        })
        .catch((err)=> console.error(err))
    }

    static async deslogarUsuario(){
        localStorage.clear()
        window.location = `./../Pages/loginPages.html`
    }
}



export default UsuarioController