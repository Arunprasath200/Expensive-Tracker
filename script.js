const Balance=document.querySelector("#Balance")
const Expensive=document.querySelector("#exp-amt")
const Income=document.querySelector("#inc-amt")
const amount=document.querySelector("#Amt")
const description=document.querySelector("#des")
const form=document.querySelector("#form")
const table=document.querySelector("#table")
const date=document.querySelector("#dat")
/*const dummy=[{
    id:1, description:"Money" ,amount:-2000},
   { id:2, description:"flower",amount:2000},
   { id:3, description:"coffe",amount:2000},
    {id:4, description:"gold",amount:2000},
    {id:5,description:"siver",amount:-250},
    {id:5,description:"siver",amount:-250}


]
let transaction=dummy;*/


const localStorageValue=JSON.parse(localStorage.getItem("track"))
let transaction=localStorage.getItem("track")!==null?localStorageValue:[]
function letstransaction(transaction){
    const sign=transaction.amount<0?"-":"+"
    
    table.classList.add(transaction.amount<0?"exp":"inc")
    let template=`<tr data-id="${transaction.id}">
                    <td>${transaction.description.toUpperCase()}</td>
                    <td><span>${sign} ${Math.abs(transaction.amount)}</span></td>
                    <td>${transaction.date}</td>
                    <td><button class="btn-del" onclick=removeTrans(${transaction.id})>Delet</button></td>
    </tr>
    `
    table.innerHTML+=template;
    

}
function removeTrans(id){
    if(confirm("are")){
        const index=transaction.findIndex((item)=>item.id===id)
        transaction.splice(index,1)
        const rowDelete=document.querySelector(`[data-id="${id}"]`);
        rowDelete.remove();
        update();
        updateLocalStorage()
        
    }
    else{
        return;
    }
}
function update(){
    const balance=transaction.map((transaction)=>transaction.amount)
    const total=balance.reduce((akk,item)=>(akk+=item),0).toFixed(2)
    Balance.innerHTML=` ₹${total}`;
    const incomes=balance.filter((balance)=>(balance>0))
    const incadd=incomes.reduce((akk,items)=>(akk+=items),0).toFixed(2)
    Income.innerHTML=`₹${incadd}`
    const expens=balance.filter((item)=>(item<0))
    const expensadd=expens.reduce((akk,item)=>(akk+=item),0).toFixed(2)
    Expensive.innerHTML=`₹${expensadd}`
    
    
}

function config(){
    
    transaction.forEach(letstransaction)
    update();
}
function addTransaction(e){
    e.preventDefault();
    if(description.value.trim()==""||amount.value.trim()==""){
        alert("enter the form values")
    }
    else{
        const transactions={id:unique(),
        description:description.value,
        amount:+amount.value,
        date:date.value};
        transaction.push(transactions)
        letstransaction(transactions)
        description.value="";
        amount.value="";
        update();
        updateLocalStorage();
        generatChart();
        
    }
}
 function updateLocalStorage(){
    localStorage.setItem("track",JSON.stringify(transaction))
 }
 function unique(){
    return Math.floor(Math.random()*100)
 }

 function generatChart(){
    const ctx=document.getElementById("myChart")
    let linechart=new Chart(ctx,{
        type:"line",
        data:{
            labels:transaction.map(item=>item.date),
            datasets:[{
                label:"Transaction amount",
                data:transaction.map(item => item.amount)
            }]}
    })
}

form.addEventListener("submit",addTransaction)


window.addEventListener("load",function(){
    config();
    generatChart();
    
})