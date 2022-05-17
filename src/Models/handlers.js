import UsuarioController from "../Controllers/usuarioControllers.js";

class Register{
    static adicionaSubmitRegistrar(){
        const formRegistrar = document.querySelector(".form__register")
        const btnSubmit = document.querySelector(".btn__Cadastrar")
        btnSubmit.addEventListener("click", ()=>{ this.receberDados(formRegistrar) });
    }

    static registrarUsuario(dados){
        UsuarioController.registrarUsuario(dados)
    }

    static receberDados(dados){
        const formItens = [...dados];
        const values = {};
        formItens.forEach(input =>{
            if(input.value === ''){
                throw "Preencha todos os campos, por favor!"
            }else
            if(input.name!= ''){
                values[input.name] = input.value
            }
        })
        if(values.username){
            this.registrarUsuario(values)
        }else{
            UsuarioController.logarUsuario(values)
        }
    }
}

class Login{
    static adicionaSubmitLogin(){
        const formLogin = document.querySelector(".form_Login")
        const btnLogar = document.querySelector(".btn__Login")
        btnLogar.addEventListener("click", ()=>{
            Register.receberDados(formLogin)
        });
    }
}

export { Register, Login}






