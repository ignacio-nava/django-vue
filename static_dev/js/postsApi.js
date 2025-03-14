import{a,r as e}from"./index.js";const t=a.create({baseURL:e.api.path}),n=async()=>(await t.get("posts/")).data,p=async s=>(await t.get(`posts/${s}/`)).data;export{n as a,p as g};
