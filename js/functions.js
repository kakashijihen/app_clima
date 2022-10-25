import { form, result } from "./variables";

export function showError(message) {
    console.log(message);
    const alert=document.createElement('p');
    alert.classList.add('my-12','text-xs','text-white','font-bold');
    alert.innerHTML=message;
    form.appendChild(alert);
    setTimeout(()=>{
        alert.remove()
    },3000);
}

export function callApi(city, country) {
    const apiID='543b137e571c97b8abbf060503069869'
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`
    fetch(url)
        .then(data=>{
            return data.json()
        })
        .then(dataJSON=>{
            if(dataJSON.cod==='404'){
                showError('Ciudad no encontrada')
            }else{
                clearHtml()
                showWeather(dataJSON)
            }
            //console.log(dataJSON)
        })
        .catch(error=>{
            console.log(error);
        })
}

export function showWeather(data) {
    const {name, main:{temp, temp_max,temp_min},weather:[arr]} = data

    const grados=KtoC(temp)
    const min=KtoC(temp_min)
    const max=KtoC(temp_max)

    const content=document.createElement('div')
    content.classList.add('flex','flex-col','justify-center','items-center');
    content.innerHTML=`
        <h2 class="text-white text-base font-semibold">Clima en ${name}</h2>
        <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h3 class="text-white text-3xl">${grados}°C</h3>
        <div class="flex justify-center items-center">
            <h4 class="text-white text-center font-bold mx-1">Max</h4>
            <h4 class="text-white text-center font-bold mx-1">Min</h4>
        </div>     
        <div class="flex justify-center items-center">            
            <p class="text-white text-center font-light mx-1">${max} °C</p>
            <p class="text-white text-center font-light mx-1">${min} °C</p>
        </div>       
    `;
    result.appendChild(content)
}

function KtoC(temp) {
    return parseInt(temp-273.15);
}

function clearHtml() {
    result.innerHTML=''
}

