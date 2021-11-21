var mylist=[];

const myform = document.getElementById('formvalue')

myform.addEventListener('submit',function(e){
    e.preventDefault();

    const formdata = getforminput();
    //console.log(formdata);
    const options={
        method:'POST',
        headers:{'Content-Type':'application/json' },
        body:JSON.stringify(formdata)
    };
    var res=fetch('http://localhost:8080/addbook',options).then(response => {
        return response.json()
    })
    .then(data=>{
       // mylist=data;
        console.log("success")
        displaydata(data);
       //displaydata();
        resetvalue();
    })
   
})



function getbookdata(){
   // console.log("hy");
    var response=fetch('http://localhost:8080/getbook')
      .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      mylist=myJson;
      mylist.forEach((b)=>displaydata(b));
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });

    deletetabledata();
}

 function displaydata(book)
  {
     const list=document.querySelector('#booklist');
     const row=document.createElement('tr');
     row.innerHTML=`
        <td>${book.id}</td>
        <td>${book.bookname}</td>
        <td>${book.authorname}</td>
        <td>${book.issuedate}</td>
        <td><button class="danger" onclick="deletebook(${book.id})">DELETE</button></td>`;
     list.appendChild(row);
  }

  function deletebook(id){
      console.log(id);
      const option={
        method: 'DELETE',
    }
       fetch(`http://localhost:8080/delete/${id}`,option)  
       .then(function (response) {
        return response.json();
      }) .then(data => {
        console.log('Success:', data);
        displaydata(data);
      })
      .then(()=> {
        console.log("data deleted");
      })
  }

  function updatebook(){
    const data = getforminput();

  //  console.log(data.id);
    const option={
      method: 'PUT',
      headers: {
       "Content-type": "application/json; charset=UTF-8",},
     body: JSON.stringify(data)
  }
  resetvalue();
 var response= fetch('http://localhost:8080/updatebooks/',option)
      .then(response => {
        return response.json( )
    })
      .then(data => {
        console.log('Success:', data);
        displaydata(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
   }
  
   function getdataid(){
       console.log("jj")
        var a = document.getElementById('ids').value;
        console.log(a);
        const option={
            method:'GET'
        }
        var response=fetch(`http://localhost:8080/getbook/${a}`,option)
      .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
        deletetabledata();
        displaydata(myJson);
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });

   }
  

  function getforminput(){
    const bookobj={};
    bookobj["id"]=document.getElementById('id').value;
     bookobj["bookname"]=document.getElementById('bookname').value;
     bookobj["authorname"]=document.getElementById('authorname').value;
     bookobj["issuedate"]=document.getElementById('issuedate').value;

    return bookobj;
}


function resetvalue(){
    document.querySelector('#id').value='';
    document.querySelector('#bookname').value='';
    document.querySelector('#authorname').value='';
    document.querySelector('#issuedate').value='';

}


function deletetabledata() {
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
  }