import axios from "axios";

const base = axios.create({
    baseURL:`http://localhost:8000/`,
})

export const api = {

    async login(email, password){
        try{
            return await base.post('api/auth/login', {email, password})
        }catch (err){
            alert(err.response.data.message)
        }
    },
    async auth(){
        try{
            return await base.get('api/auth/auth', {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){

        }
    },
    async signup(email, password){
        try{
            const response = await base.post('api/auth/signup', {email, password})
            return response.data
        }catch (err){
            console.log(err.response.data.message)
        }
    },

    async addPost(text, author){
        console.log("api add post", author)
        try{
            return await base.post('api/posts', {text, author})
        }catch (err){
            alert(err.response.data.message)
        }
    },
    async getPosts(id){
        try{
            return await base.get('api/posts', {headers:{id}})
        }catch (err){
            alert(err.response.data.message)
        }
    }
}

