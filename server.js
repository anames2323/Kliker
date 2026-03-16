const tg=window.Telegram.WebApp; tg.expand();
const user=tg.initDataUnsafe?.user;
const avatar=user?.photo_url;
const username=user?.first_name||"Игрок";
const userId=user?.id||Math.floor(Math.random()*999999);
document.getElementById("username").innerText=username;
if(avatar)document.getElementById("avatar").src=avatar;

const ADMINS=[8795006636]; // <-- вставь сюда свой Telegram ID
if(ADMINS.includes(userId)){
  document.getElementById("adminBtn").style.display="block";
  document.getElementById("status").innerText="Админ";
  document.getElementById("status").style.color="red";
}

let coins=Number(localStorage.getItem("coins"))||0,perClick=Number(localStorage.getItem("perClick"))||1,energy=100,maxEnergy=100,autoClick=0,clickPrice=10;
const ranks=[{name:"Новичок",coins:0},{name:"Игрок",coins:200},{name:"Пёсик",coins:1000},{name:"Альфа Бобик",coins:5000},{name:"Легенда",coins:15000}];

function clickCoin(){if(energy<=0)return;coins+=perClick;energy--;updateUI();save();}
document.getElementById("clickBtn").onclick=clickCoin;

function buyClick(){if(coins>=clickPrice){coins-=clickPrice;perClick++;clickPrice=Math.floor(clickPrice*1.7);}}
function buyAuto(){if(coins>=200){coins-=200;autoClick++;}}

setInterval(()=>{coins+=autoClick;updateUI();},1000);
setInterval(()=>{if(energy<maxEnergy){energy++;updateUI();}},1000);

function updateRank(){let rank=ranks[0];for(let r of ranks)if(coins>=r.coins)rank=r;document.getElementById("rank").innerText=rank.name;}
function rankProgress(){let current=0,next=0;for(let i=0;i<ranks.length;i++){if(coins>=ranks[i].coins){current=ranks[i].coins;next=ranks[i+1]?.coins||current;}}let progress=(coins-current)/(next-current)*100;document.getElementById("rankBar").style.width=progress+"%";}
function openPage(page){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.getElementById(page).classList.add("active");if(page==="leaderPage")renderLeaderboard();}
function renderLeaderboard(){const board=document.getElementById("leaderboard");board.innerHTML="";let list=JSON.parse(localStorage.getItem("leaders")||"[]");list.push({name:username,coins:coins});list=list.sort((a,b)=>b.coins-a.coins).slice(0,10);localStorage.setItem("leaders",JSON.stringify(list));list.forEach(p=>{const div=document.createElement("div");div.className="leader";div.innerHTML=`<span>${p.name}</span><span>${p.coins}</span>`;board.appendChild(div);});}
function giveCoins(){const id=Number(document.getElementById("giveId").value);const amount=Number(document.getElementById("giveCoins").value);if(ADMINS.includes(userId)){coins+=amount;updateUI();}}
function updateUI(){document.getElementById("coins").innerText=coins;document.getElementById("profileCoins").innerText=coins;document.getElementById("energy").innerText=energy;document.getElementById("perClick").innerText=perClick;document.getElementById("clickPrice").innerText=clickPrice;updateRank();rankProgress();}
function save(){localStorage.setItem("coins",coins);localStorage.setItem("perClick",perClick);}
updateUI();
