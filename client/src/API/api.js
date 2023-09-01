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
            console.error(err)
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
            return await base.post('api/auth/signup', {email, password, fullname})
        }catch (err){
            console.error(err)
        }
    },
    async updateUserData(values, id){
        try{
            const response = await base.put('api/user/', {fullname: values.fullname, username: values.username, status: values.status, id})
            return response.data
        }catch (err){
            console.error(err)
        }
    },
    async getProfile(id){
        try{
            return await base.get(`api/user/${id}`)

        }catch (err){
            console.error(err)
        }
    },
    async addPost(text, author){
        try{
            return await base.post('api/posts', {text, author})
        }catch (err){
            console.error(err)
        }
    },
    async getPosts(id){
        try{
            return await base.get(`api/posts/${id}`)
        }catch (err){
            console.error(err)
        }
    },
    async like(id, userId){
        try{
            return await base.put(`api/posts/like/${id}`, {userId})
        }catch (err){
            console.error(err)
        }
    },
    async deletePost(id){
        try{
            return await base.delete(`api/posts/${id}`)
        }catch (err){
            console.error(err)
        }
    },
    async getPeople(){
        try{
            return await base.get(`api/friends/`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },
    async followUnfollow(id, isFollow){
        try {
            return await base.put(`api/friends/${id}`, {isFollow} ,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },
    async uploadAvatar(file){
        try{
            const formData = new FormData();
            formData.append("file", file)
            return await base.post(`api/user/avatar`, formData, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },
    async getConversation(id){
        try{
            return await base.get(`api/messages/${id}`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },
    async getMessageProfiles(id){
        try{
            return await base.get(`api/user/message/${id}`)
        }catch (err){
            console.error(err)
        }
    },
    async sendMessage(message, convId){
        try{
            return await base.put(`api/messages/`, {message, convId}, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        }catch (err){
            console.error(err)
        }
    },

}

