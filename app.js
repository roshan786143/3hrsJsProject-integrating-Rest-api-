function saveDataOnCloud(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

const obj = {
    amount,
    description,
    category
}

console.log(obj)

axios.post(`https://crudcrud.com/api/700cbf30f1504379abe6e963916c82a2/UserExpenseData`,obj)
.then(()=>{
    showUserExpenseOnScreen(obj)
}).catch((error)=>{
    console.log(error)
})

console.log(obj)
}

function showUserExpenseOnScreen(obj){
    const parentNode = document.getElementById("listOfExpenses");
    const childNode = `<li id=${obj._id}>${obj.amount} - ${obj.description} - ${obj.category}
    <button onclick = deleteUserExpenseOnServer('${obj._id}')>Delete Expense</button>
    <button onclick = editUserExpenseOnServer('${obj.amount}','${obj.description}','${obj.category}','${obj._id}')>Edit Expense</button></li>`
    parentNode.innerHTML += childNode;
}

window.addEventListener('DOMContentLoaded',getUserExpenses);

function getUserExpenses(){
    axios.get(`https://crudcrud.com/api/700cbf30f1504379abe6e963916c82a2/UserExpenseData`)
    .then((resolve)=>{
        // console.log(resolve)
        const data = resolve.data;
        // console.log(data)
    data.forEach(expense => {
        // console.log(expense)
        showUserExpenseOnScreen(expense)
    })
}).catch((error)=>{
    console.log(error)
})
}

function deleteUserExpenseOnServer(id){
    console.log(id + "//////////////////////////")
    axios.delete(`https://crudcrud.com/api/700cbf30f1504379abe6e963916c82a2/UserExpenseData/${id}`)
    .then(()=>{
        removeUserExpenseOnScreen(id)
        // console.log(id+"***************************************")
    }).catch((error)=>{
        console.log(error)
    })
}

function removeUserExpenseOnScreen(id){
    // console.log(id+"*************************");
    const parentNode = document.getElementById("listOfExpenses");
    const childNodeTobeDeleted = document.getElementById(id);
    if(childNodeTobeDeleted){
    parentNode.removeChild(childNodeTobeDeleted);
}
}

function editUserExpenseOnServer(amount,description,category,id){
    deleteUserExpenseOnServer(id);
    // deleteUserExpenseOnScreen(id);
    // console.log(amount);
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
}