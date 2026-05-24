const mdpAdmin = "xandiaenzo76";

const jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];

// 10h → 01h
const heures = [
"10:00","11:00","12:00","13:00",
"14:00","15:00","16:00","17:00",
"18:00","19:00","20:00","21:00",
"22:00","23:00","00:00","01:00"
];

let planning = {};
let reservations = [];

/* INIT */
jours.forEach(j=>{
heures.forEach(h=>{
planning[`${j}-${h}`] = {
statut:"libre",
discord:"",
motif:""
};
});
});

/* NAV */
function cacherTout(){
document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
}

function retourAccueil(){
cacherTout();
document.getElementById("accueil").classList.remove("hidden");
}

function ouvrirReservation(){
cacherTout();
document.getElementById("reservation").classList.remove("hidden");
remplirSelects();
}

function ouvrirConnexionAdmin(){
cacherTout();
document.getElementById("connexionAdmin").classList.remove("hidden");
}

/* ADMIN */
function connexionAdmin(){
const mdp = document.getElementById("mdp").value;

if(mdp === mdpAdmin){
cacherTout();
document.getElementById("panelAdmin").classList.remove("hidden");
afficherTout();
} else {
alert("Mot de passe incorrect");
}
}

function deconnexion(){
retourAccueil();
}

/* SELECTS */
function remplirSelects(){

const j = document.getElementById("jour");
const h = document.getElementById("heure");

j.innerHTML="";
h.innerHTML="";

jours.forEach(x=>{
j.innerHTML += `<option>${x}</option>`;
});

updateHeures();

j.onchange = updateHeures;
}

function updateHeures(){

const jour = document.getElementById("jour").value;
const h = document.getElementById("heure");

h.innerHTML="";

heures.forEach(x=>{
if(planning[`${jour}-${x}`].statut === "libre"){
h.innerHTML += `<option>${x}</option>`;
}
});
}

/* RESERVER */
function reserver(){

const discord = document.getElementById("discord").value;
const motif = document.getElementById("motif").value;
const jour = document.getElementById("jour").value;
const heure = document.getElementById("heure").value;

if(!discord) return alert("Nom Discord requis");

const key = `${jour}-${heure}`;

planning[key] = {
statut:"reserve",
discord,
motif
};

reservations.push({discord,motif,jour,heure});

alert("Réservation confirmée");
retourAccueil();
}

/* PLANNING */
function afficherPlanning(){

const p = document.getElementById("planning");
p.innerHTML="";

p.innerHTML += `<div class="header">Heure</div>`;
jours.forEach(j=>p.innerHTML += `<div class="header">${j}</div>`);

heures.forEach(h=>{
p.innerHTML += `<div class="hour">${h}</div>`;

jours.forEach(j=>{

const key = `${j}-${h}`;
const slot = planning[key];

if(slot.statut === "libre"){
p.innerHTML += `
<div class="slot libre" onclick="toggleSlot('${key}')">
🟢 Libre
</div>
`;
}

else if(slot.statut === "ferme"){
p.innerHTML += `
<div class="slot ferme" onclick="toggleSlot('${key}')">
⚫ Fermé
</div>
`;
}

else{
p.innerHTML += `
<div class="slot reserve">
🔴 Réservé
<small>${slot.discord}</small>
<small>${slot.motif}</small>
<button onclick="supprimer('${key}')">Suppr</button>
</div>
`;
}

});

});
}

/* TOGGLE */
function toggleSlot(key){

if(planning[key].statut === "reserve") return;

planning[key].statut =
planning[key].statut === "libre"
? "ferme"
: "libre";

afficherTout();
}

/* SUPPRIMER */
function supprimer(key){

reservations = reservations.filter(r =>
`${r.jour}-${r.heure}` !== key
);

planning[key] = {
statut:"libre",
discord:"",
motif:""
};

afficherTout();
}

/* LISTE */
function afficherReservations(){

const c = document.getElementById("listeReservations");
c.innerHTML="";

reservations.forEach(r=>{
c.innerHTML += `
<div class="resCard">
<b>${r.discord}</b>
<p>${r.motif}</p>
<p>${r.jour} - ${r.heure}</p>
</div>
`;
});
}

/* MASTER */
function afficherTout(){
afficherPlanning();
afficherReservations();
}

/* START */
retourAccueil();
