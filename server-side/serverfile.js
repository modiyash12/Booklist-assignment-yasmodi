const express = require('express');
var fs = require('fs');
const { request } = require('http');
const app = express();  
const path = require('path');
var cors = require('cors')

let data=fs.readFileSync('data.json');
let booksdetails=JSON.parse(data);

app.listen(8080,()=>console.log("Server started"));

app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hy yASH mODI sERVER iS lOADING");
})
app.post('/addbook',(req,res)=>{
   // console.log(req.body);
    var bookdata = req.body;
    let check= booksdetails.find(e=>{return e.id===req.body.id});
    if(!check){
        booksdetails.push(bookdata);
        var jdata = JSON.stringify(booksdetails);
        //adding data into file
            fs.writeFileSync('data.json', jdata) 
             res.send(booksdetails);    
    }else{
        res.send("")
    }
      
})

app.get('/getbook',(req,res)=>{
        res.send(booksdetails);
        console.log("sent")
})



app.get('/getbook/:id',(req,res)=>{
         lower_id=req.params.id.toLowerCase();
         upper_id=req.params.id.toUpperCase();



    let bookinfo= booksdetails.find(c=>{ return (c.id ===req.params.id || c.bookname  ===req.params.id || c.bookname===lower_id ||c.bookname===upper_id ||c.authorname===upper_id ||c.authorname===lower_id ||c.authorname  ===req.params.id)});
    console.log(req.params.id);
    if(!bookinfo){
       console.log("data not found with this id")
       res.send("")
    }else{
        console.log(bookinfo);
        res.send(bookinfo);
    }
 })


app.delete('/delete/:id',(req,res)=>{   
    const index1 = booksdetails.findIndex(c=>c.id===req.params.id);
    if(index1>=0){
        booksdetails.splice(index1,1);
        var jdata = JSON.stringify(booksdetails);
        fs.writeFileSync('data.json', jdata);
        res.send(booksdetails);
    }else{
        console.log("id not find");
    }
   })

   app.delete('/delete',(req,res)=>{
       let l=booksdetails.length;
       console.log(l);
       if(l>0){
           booksdetails.splice(0,l);
           var jdata = JSON.stringify(booksdetails);
           fs.writeFileSync('data.json', jdata);
           res.send(booksdetails);
       }else{
           console.log("no books found");
           res.send("");
       }
   })

   
 app.put('/updatebooks/',(req,res)=>{
    const index=booksdetails.findIndex(c=>{
    return c.id === req.body.id;
    });
    //console.log(index)
    if(index>=0){
        let book={
            id:req.body.id,
       bookname:req.body.bookname,
       authorname:req.body.authorname,
       issuedate:req.body.issuedate
        }
       booksdetails.splice(index,1,book);
       var data=JSON.stringify(booksdetails);
       fs.writeFileSync('data.json',data);
       res.send(booksdetails);
    }else{
        res.send("");
      // console.log("data not present")
    }
})


