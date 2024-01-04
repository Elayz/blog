import {Component} from "react";


export default class ApiSevice extends Component {
    constructor() {
        super();
        this.url = 'https://conduit.productionready.io/api/articles?limit=10&offset='
    };
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