// GEREKLİ HTML ELEMENTLERİNİ SEÇ
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");



// DÜZENLEME SEÇENEKLERİ
let editElement;
let editFlag = false;  //DÜZENLEME MODUNDA OLUP OLMADIĞINI BELİRTİR
let editId = ""

// OLAY İZLEYİCİLERİ
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

// FONKSİYONLAR
function displayAlert(text, action){
    console.log(text, action);
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}

function addItem(e) {
    e.preventDefault();  // FORMUN OTOMATİK OLARAK GÖNDERİLMESİNİ ENGELLE
    const value = grocery.value; // FORM İÇERİSİNDE BULUNAN İNPUTUN DEĞERİNİ ALMA
    const id = new Date().getTime().toString();
    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);  //OLUŞTURUDUĞUMUZ İG'Yİ ELEMENTE EKLEDİK
        element.classList.add("grocery-item");  //OLUŞTURDUĞUMUZ ELEMENTE CLASS EKLEDİK
        element.innerHTML = `
        <p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button type="button" class="delete-btn">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    `;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);

        //KAPSAYICIYA EKLEME YAPMA
        list.appendChild(element);
        displayAlert("Başarıyla eklendi","success");
        container.classList.add("show-container");
        //İÇERİK KISMINI SIFIRLAMA
        grocery.value = "";
    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Değer Değiştirildi", "success");
    } else {
    }
}
//SİLME FONKSİYONU
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
}
function clearItems (){
    const items = document.querySelectorAll(".grocery-item");
    console.log(items);
    if(items.length > 0){
        items.forEach((item) => list.removeChild(item));
    }
    container.classList.remove("show-container");
    displayAlert("Liste Boş", "danger");
}
// DÜZENLEME FONKSİYONU
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement);
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "Düzenle";
}
