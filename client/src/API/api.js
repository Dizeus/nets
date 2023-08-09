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
    async signup(email, password, fullname){
        try{
            const response = await base.post('api/auth/signup', {email, password, fullname})
            return response.data
        }catch (err){
            console.log(err.response.data.message)
        }
    },
    async updateUserData(values, id){
        try{
            const response = await base.put('api/user/', {fullname: values.fullname, username: values.username, status: values.status, id})
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
    },
    async like(id){
        try{
            return await base.put(`api/posts/like/${id}`)
        }catch (err){
            alert(err.response.data.message)
        }
    },
    async deletePost(id){
        try{
            return await base.delete(`api/posts/${id}`)
        }catch (err){
            alert(err.response.data.message)
        }
    },
    async getPeople(){
        try{
            return await base.get(`api/friends/`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            alert(err.response.data.message)
        }
    },

}

