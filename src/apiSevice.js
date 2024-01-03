import {Component} from "react";


export default class ApiSevice extends Component {
    constructor() {
        super();
        this.url = 'https://conduit.productionready.io/api/articles'
    }
    async getInfo(url) {
        try{
            return (await fetch(url)).json()
        }
        catch (e) {
            throw new Error("trouble in fetch((((")
        }
    }

    async getRes() {
        return await this.getInfo(this.url);
    }
}