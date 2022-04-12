const express = require('express')
const con_mysql = require('../models/MySqlConnect.js')
const app = express()

class Client{

    
    constructor(){
        
        var cli = rendClientFromList();
        this.id=cli[0];
        this.fName = cli[1];
        this.lName = cli[2];
        this.city = cli[3];
        this.birth_date = cli[4];
        this.gender = cli[5];
        this.prev_calls = cli[6];

    }
    get firstName() {
        return this.fName;
    }
    get lastName() {
        return this.lName
    }
    get id() {
        return this.id
    }
    get gender() {
        if(this.gender == f) return "female"
        return "male"
        
    }
    get city() {
        return this.city;
    }
    get birthDate() {
        return this.birth_date
    }
    get prevCalls() {
        return this.prev_calls
    }
    incrPrevCalls(){
        this.prev_calls++;
    }

}