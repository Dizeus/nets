import axios from "axios";
import {API_URL} from "../config";

const base = axios.create({
    baseURL:API_URL,
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
            console.error(err)
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
    async getProfile(id){
        try{
            const response = await base.get(`api/user/${id}`)
            return response
        }catch (err){
            console.log(err.response.data.message)
        }
    },
    async addPost(text, author){
        try{
            return await base.post('api/posts', {text, author})
        }catch (err){
            alert(err.response.data.message)
        }
    },
    async getPosts(id){
        try{
            return await base.get(`api/posts/${id}`)
        }catch (err){
            alert(err.response.data.message)
        }
    },
    async like(id, userId){
        try{
            return await base.put(`api/posts/like/${id}`, {userId})
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
    async followUnfollow(id, isFollow){
        try {
            return await base.put(`api/friends/${id}`, {isFollow} ,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            alert(err.response.data.message)
        }
    },
    async uploadAvatar(file){
        try{
            const formData = new FormData();
            formData.append("file", file)
            return await base.post(`api/user/avatar`, formData, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            alert(err.response.data.message)
        }
    },
    async getConversation(id){
        try{
            return await base.get(`api/messages/${id}`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            alert(err.response.data.message)
        }
    },
    async getMessageProfiles(id){
        try{

            const response = await base.get(`api/user/message/${id}`)
            return response
        }catch (err){
            console.log(err.response.data.message)
        }
    },
    async sendMessage(message, convId){
        try{
            const response = await base.put(`api/messages/`, {message, convId}, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
            return response
        }catch (err){
            console.log(err.response.data.message)
        }
    },

}

