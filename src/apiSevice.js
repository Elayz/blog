import {Component} from "react";

export default class ApiSevice extends Component {
    constructor() {
        super();
        this.url = 'https://blog.kata.academy/api/articles?limit=10&offset='
        this.newUserUrl = 'https://blog.kata.academy/api/users'
        this.getExistingUserUrl  = 'https://blog.kata.academy/api/users/login'
        this.updateUserUrl  = 'https://blog.kata.academy/api/user'
        this.createArticle  = 'https://blog.kata.academy/api/articles'
        this.favor  = 'https://blog.kata.academy/api/articles'
    };



    async server_getInfo(url, page, api_key) {
        try{
            return (await fetch(url+page, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${api_key}`,
                }
            })).json();
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }
    async server_getExistingUser(email, password) {
        try{
            return ((await fetch(this.getExistingUserUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        email: email,
                        password: password
                    }
                })

            })).json());
        }
        catch (e) {
            throw new Error("trouble in fetch((((", e);
        }
    }
    async server_addNewUser(username, email, password) {
        try{
            return ((await fetch(this.newUserUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        email: email,
                        password: password
                    }
                })

            })).json());
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }
    async server_updateUserData(username, email, password, api_key, Avatar) {
        try{
            return ((await fetch(this.updateUserUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${api_key}`,
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        email: email,
                        password: password,
                        image: Avatar
                    }
                })

            })).json());
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }
    async server_createNewArticle(title, description, body, tags, api_key) {
        try{
            return ((await fetch(this.createArticle, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${api_key}`,
                },
                body: JSON.stringify({
                    article: {
                        title: title,
                        description: description,
                        body: body,
                        tagList: tags,
                    }
                })

            })).json());
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }
    async server_favorArticle(api_key, slug) {
        try{
            return ((await fetch(`${this.favor}/${slug}/favorite`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${api_key}`,
                }

            })).json());
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }
    async server_UnfavorArticle(api_key, slug) {
        try{
            return ((await fetch(`${this.favor}/${slug}/favorite`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${api_key}`,
                }

            })).json());
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }
    async server_deleteAnArticle(api_key, slug) {
        try{
            return ((await fetch(`${this.favor}/${slug}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${api_key}`,
                }

            })).json());
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }
    async server_getExistingArticle(slug) {
        try{
            return ((await fetch(`${this.createArticle}/${slug}`)).json());
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }
    async server_updateAnArticle(title, description, body, tags, api_key, slug) {
        try{
            return ((await fetch(`${this.createArticle}/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${api_key}`,
                },
                body: JSON.stringify({
                    article: {
                        title: title,
                        description: description,
                        body: body,
                        tagList: tags,
                    }
                })

            })).json());
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }



    async deleteAnArticle(api_key, slug) {
        return await this.server_deleteAnArticle(api_key, slug);
    }
    async updateAnArticle(title, description, body, tags, api_key, slug) {
        return await this.server_updateAnArticle(title, description, body, tags, api_key, slug);
    }
    async getExistingArticle(slug) {
        return await this.server_getExistingArticle(slug);
    }
    async favorArticle(api_key, slug) {
        return await this.server_favorArticle(api_key, slug);
    }
    async unFavorArticle(api_key, slug) {
        return await this.server_UnfavorArticle(api_key, slug);
    }
    async createNewArticle(title, description, body, tags, api_key) {
        return await this.server_createNewArticle(title, description, body, tags, api_key);
    }
    async updateUser(username, email, password, api_key, Avatar) {
        return await this.server_updateUserData(username, email, password, api_key, Avatar);
    }
    async newUser(username, email, password) {
        return await this.server_addNewUser(username, email, password);
    }
    async existingUser(email, password) {
        return await this.server_getExistingUser(email, password);
    }
    async getRes(page = 1, api_key) {
        return await this.server_getInfo(this.url, page, api_key);
    }
}
