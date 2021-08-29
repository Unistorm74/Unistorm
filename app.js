const koa = require("koa");
const json = require('koa-json');
const Router = require("koa-router");
const helper = require('./helper');
const fs = require('fs');

const app = new koa();
const router = new Router;

//fromat json data
app.use(json());

//Router midlleware
app.use(router.routes()).use(router.allowedMethods());

router.get("/message", (ctx) => {
     let params =ctx.request.query;
     params.role ==="admin" ? ctx.body = {
         message: helper.jsonReader('./data/message.json')
        } :  ctx.response.redirect('/logout');
})

router.post("/message", (ctx) =>{
    try{
        helper.jsonWriter('./data/message.json');
        ctx.redirect('/logout');
    }
    catch(e){
        console.log(e);
    }
})

router.get("/login", ctx =>{
    ctx.body = {
        name:"This is Login page"
    }
})

router.get("/logout", ctx =>{
    ctx.body = {
        name:"This is logout page"
    }
})


app.listen(3000);
