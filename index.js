const root=document.querySelector('.autocomplete')
root.innerHTML=`
   <label><b>serach movies</b></label>
   <input class="input"/>
   <div class="dropdown">
   <div class="dropdown-menu">
    <div class="dropdown-content results">
    </div>
   </div>
   </div>`
const dropdown=document.querySelector('.dropdown')
const resultswrapper=document.querySelector('.results')
const request = async (search) => {
  const data = await axios.get("http://www.omdbapi.com/", {
    params: { apikey: "2f35ac16", s: search },
  });
  if(data.data.Error){
    return []
  }
  return data.data.Search;
};
const input = document.querySelector("input");
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
const s = async (e) => {
  const s1 = await request(e.target.value);
  if(!s1.length){
    dropdown.classList.remove('is-active')
    return;
  }
  dropdown.classList.add('is-active')
  for (const s of s1) {
    const option = document.createElement("a");
    option.classList.add('dropdown-item')
    option.innerHTML = `
   ${s.Title}<img src=${s.Poster}/>

   `;`
   `
   option.addEventListener('click',function () {
     dropdown.classList.remove('is-active')
     input.value=s.Title
     selectedmovie(s)
   })
    resultswrapper.appendChild(option);
  }
};
input.addEventListener("input", debounce(s, 500));

document.addEventListener('click',event=>{
  if(!root.contains(event.target)){
    dropdown.classList.remove('is-active')
  }
})

const selectedmovie=async(moc)=>{
  const s=await axios.get('http://www.omdbapi.com/',{
    params:{apikey:"d9835cc5",i:moc.imdbID}
  })
  console.log(s.data);
  const boxoffice=s.data.BoxOffice
  const imdbRating=s.data.imdbRating
  const li=document.querySelector('.li')
  const lo=document.querySelector('.lo')
  const po=document.querySelector('.po')
  
  if(!(boxoffice>=10000000)){
    lo.innerHTML=`<b>boxoffice:</b>
    `
      li.src=s.data.Poster
    lo.append(boxoffice)
  }
  if(!(imdbRating<=6)){
    po.innerHTML=`<b>imdbrating:</b>`
    po.style.padding="10px"
    po.style.backgroundColor="green"
    po.style.width="220px"
    po.append(imdbRating)
  }
  if(!(imdbRating>=5)){
    po.innerHTML=`<b>rating</b>`
    po.style.backgroundColor="red"
    po.style.width="150px"
    po.append(imdbRating)
  }
}

