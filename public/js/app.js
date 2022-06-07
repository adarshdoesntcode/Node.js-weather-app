
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherIcon = document.querySelector(".weather-icon");

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const location = searchInput.value;
  messageOne.textContent = 'Loading....';
  messageTwo.textContent = '';
  fetchCall(location);
})

const fetchCall = (address)=>{

const url =`/weather?address=${address}`;

fetch(url).then((response)=>{
  response.json().then((data)=>{
    if(data.error)
    {
      messageOne.textContent=data.error;
    }
    else
    {
      messageOne.textContent = data.location;
      messageTwo.textContent = `Time:${data.time}:: ${data.forecast}. It is ${data.temperature} degrees, feels like ${data.feelslike} degrees.`;
      weatherIcon.setAttribute('src', data.icon);
      weatherIcon.classList.remove('hide');
    }
  }
  )
})
}