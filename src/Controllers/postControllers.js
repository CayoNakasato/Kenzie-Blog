class PostControllers{

    static async criarPost(content){
        const token = localStorage.getItem("Token")
        const response = await fetch(
           "https://api-blog-m2.herokuapp.com/post",
           {
            "method" : "POST",
            "headers": {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            "body": JSON.stringify(content)
           }
           )
           const data = await response.json()
           location.reload()
        console.log(data)
        return data
    }

    static async listarProprioPost(idPost){
        const response = await fetch(
            `https://api-blog-m2.herokuapp.com/post/${idPost}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
            })
            const data = await response.json();
            return data;
    }

    static async listarPaginaPost(pages=1){
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post?page=${pages}`,
        {
            method: "GET",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            },
        })
        const data = await response.json()
        return data;
    }

    static async atualizarPost(content, idPost){
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post/${idPost}`,
        {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            },
            body: JSON.stringify(content)
        })
        return response;
    }

    static async deletarPost(idPost){
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post/${idPost}`,
        {
            method: "DELETE",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        })
        return response;
    }
}

export default PostControllers