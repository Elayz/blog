import {Component} from "react";

export default class ApiSevice extends Component {
    constructor() {
        super();
        this.url = 'https://blog.kata.academy/api/articles?limit=10&offset='
        this.newUserUrl = 'https://blog.kata.academy/api/users'
        this.getExistingUserUrl  = 'https://blog.kata.academy/api/users/login'
        this.updateUserUrl  = 'https://blog.kata.academy/api/user'
    };




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
    async updateUser(username, email, password, api_key, Avatar) {
        return await this.server_updateUserData(username, email, password, api_key, Avatar);
    }
    async newUser(username, email, password) {
        return await this.server_addNewUser(username, email, password);
    }
    async existingUser(email, password) {
        return await this.server_getExistingUser(email, password);
    }






    async getInfo(url, page) {
        try{
            return (await fetch(url+page)).json();
        }
        catch (e) {
            throw new Error("trouble in fetch((((");
        }
    }

    async getRes(page = 1) {
        return await this.getInfo(this.url, page);
    }
}
