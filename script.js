const tg = window.Telegram.WebApp
tg.expand()

const user = tg.initDataUnsafe?.user
const username = user?.first_name || "Player"
document.getElementById("username").innerText = username

let coins=0
let perClick=1
let energy=100
let maxEnergy=100
let autoClick=0
let upgradePrice=10

const ranks=[
{name:"Beginner",coins:0},
{name:"Bronze",coins:200},
{name:"Silver",coins:800},
{name:"Gold",coins:2000},
{name:"Diamond",coins:5000}
]

function clickCoin(){

if(energy<=0)return

coins+=perClick
energy--

updateUI()
save()

}

document.getElementById("clickBtn").onclick=clickCoin

function buyUpgrade(){

if(coins>=upgradePrice){

coins-=upgradePrice
perClick++
upgradePrice=Math.floor(upgradePrice*1.7)

}

}

function buyAuto(){

if(coins>=200){

coins-=200
autoClick++

}

}

setInterval(()=>{

coins+=autoClick
updateUI()

},1000)

setInterval(()=>{

if(energy<maxEnergy){
energy++
updateUI()
}

},1000)

function updateRank(){

let rank=ranks[0]

for(let r of ranks){

if(coins>=r.coins){
rank=r
}

}

document.getElementById("rank").innerText="Rank: "+rank.name

}

function rankProgress(){

let current=0
let next=0

for(let i=0;i<ranks.length;i++){

if(coins>=ranks[i].coins){

current=ranks[i].coins
next=ranks[i+1]?.coins||current

}

}

let progress=(coins-current)/(next-current)*100
document.getElementById("rankBar").style.width=progress+"%"

}

function openPage(page){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"))
document.getElementById(page).classList.add("active")

}

function updateUI(){

document.getElementById("coins").innerText=coins
document.getElementById("profileCoins").innerText=coins
document.getElementById("energy").innerText=energy
document.getElementById("perClick").innerText=perClick
document.getElementById("upgradePrice").innerText=upgradePrice

updateRank()
rankProgress()

}

function share(){

const text="Я играю в этот кликер!"

tg.openTelegramLink(
`https://t.me/share/url?url=https://t.me/YOURBOT&text=${text}`
)

}

function save(){

localStorage.setItem("coins",coins)
localStorage.setItem("perClick",perClick)

}

function load(){

coins=Number(localStorage.getItem("coins"))||0
perClick=Number(localStorage.getItem("perClick"))||1

}

load()
updateUI()
