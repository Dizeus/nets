import axios from "axios";

export const api = {

    async login(email, password){
        try{
            const response = await axios.post('/api/auth/login', {email, password})
            console.log(response)
            return response
        }catch (err){
            console.error(err)
        }
    },
    async auth(){
        try{
            return await axios.get('/api/auth/auth', {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
        }
    },
    async signup(email, password, fullname){
        try{
            return await axios.post('/api/auth/signup', {email, password, fullname})
        }catch (err){
            console.error(err)
        }
    },
    async updateUserData(values, id){
        try{
            const response = await axios.put('/api/user/', {fullname: values.fullname, username: values.username, status: values.status, id})
            return response.data
        }catch (err){
            console.error(err)
        }
    },
    async getProfile(id){
        try{
            return await axios.get(`/api/user/${id}`)

        }catch (err){
            console.error(err)
        }
    },
    async addPost(text, author){
        try{
            return await axios.post('/api/posts', {text, author})
        }catch (err){
            console.error(err)
        }
    },
    async getPosts(id){
        try{
            return await axios.get(`/api/posts/${id}`)
        }catch (err){
            console.error(err)
        }
    },
    async like(id, userId){
        try{
            return await axios.put(`/api/posts/like/${id}`, {userId})
        }catch (err){
            console.error(err)
        }
    },
    async deletePost(id){
        try{
            return await axios.delete(`/api/posts/${id}`)
        }catch (err){
            console.error(err)
        }
    },
    async getPeople(){
        try{
            return await axios.get(`/api/friends/`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },
    async followUnfollow(id, isFollow){
        try {
            return await axios.put(`/api/friends/${id}`, {isFollow} ,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },
    async uploadAvatar(file){
        try{
            const formData = new FormData();
            formData.append("file", file)
            console.log(localStorage.getItem('token'))
            return await axios.post(`/api/user/avatar`, formData, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },
    async getConversation(id){
        try{
            return await axios.get(`/api/messages/${id}`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },
    async getMessageProfiles(id){
        try{
            return await axios.get(`/api/user/message/${id}`)
        }catch (err){
            console.error(err)
        }
    },
    async sendMessage(message, convId){
        try{
            return await axios.put(`/api/messages/`, {message, convId}, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },

}

