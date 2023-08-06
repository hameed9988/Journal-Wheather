/* Global Variables */

// Create new date , updated dynamically
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Declare get  wheather button
const submit_btn = document.getElementById("generate");

// Declare user zip code input from html 
const zipCode = document.getElementById("zip");

// Personal API Key for OpenWeatherMap API
const apiKey = "3beb9dd691606355e126733cb487ffca";

// get API url
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}&units=metric`

const felingText= document.getElementById("feelings");
// get dtae,temp,and content
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content = document.getElementById("content");

// useing click event listener on the Generate Button 
submit_btn.addEventListener('click', handlBtnClk);

// Function called by event listener 
function handlBtnClk(){
    // const aipCode again to fix the If condition
    const zipCode = document.getElementById("zip");

    // Validation to check if the zip code is there 
    if( zipCode.value === ""){
        alert("kindly enter zip code in zip form!"); 
    } else {
        getData().then((data)=>{
            postData("/post", {temp:data.main.temp, date: newDate, feelings: felingText.value})
        })
        .then(()=> updateUi())
    }
}
const getData = async () => {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}&units=metric`
    const req = await fetch(apiUrl)
    try{
     const data = await req.json()
     console.log(data.main.temp)
     return data
    } catch (error) {
        console.log(error);
    }
};

const postData = async (url = "", data = {})=>{
    const res = await fetch(url,{
        "method": "POST",
        "credentials": "same-origin",
        headers:{
            "content-type": "application/json",
        },
        body:JSON.stringify(data),
    });
    try{
        return;
    } catch (error){
        console.log("Error",error);
    }
}

// Function to GET Project Data 
const updateUi = async()=>{
    const req = await fetch("/get")
    try{
        const udata = await req.json()
        console.log(udata)
        date.innerHTML = udata.date
        temp.innerHTML = udata.temp
        content.innerHTML = udata.feelings
    } catch (error) {
        console.log(error)
    }
}