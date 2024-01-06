import {Component} from "react";


export default class ApiSevice extends Component {
    constructor() {
        super();
        this.url = 'https://conduit.productionready.io/api/articles?limit=10&offset='
        this.newUserUrl = 'https://conduit.productionready.io/api/users'
        this.getExistingUserUrl  = 'https://conduit.productionready.io/api/users/login'
    };




    async getExistingUser(email, password) {
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
    async addNewUser(username, email, password) {
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
    async newUser(username, email, password) {
        return await this.addNewUser(username, email, password);
    }
    async existingUser(email, password) {
        return await this.getExistingUser(email, password);
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
