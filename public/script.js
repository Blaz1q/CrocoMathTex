var canuload=true;
const DOKONCZ = document.getElementById("DOKONCZ");
const PF = document.getElementById("PF");
const OTWARTE = document.getElementById("OTWARTE");
const DOPASUJ_NTO1 = document.getElementById("DOPASUJ_NTO1");
const DOPASUJ_1TO1 = document.getElementById("DOPASUJ_1TO1");
const DOPASUJ_TABELA = document.getElementById("DOPASUJ_TABELA");
const ZLOZONE = document.getElementById("ZLOZONE");

function setUnloadTrigger(){
  if(!canuload){
  window.onbeforeunload = function(){
    return 'Are you sure you want to leave?';
  };
}
}
function updatelatex(input){
    try{
        document.getElementById("display_math").innerHTML = katex.renderToString(input);
        isCorrect=true;
    }catch (error) {
        document.getElementById("display_math").innerHTML = error;
        isCorrect=false;
    }
}
function show_div(){
  shouldhide = document.getElementsByClassName("shouldhide");
  for(var i=0;i<shouldhide.length;i++){
    shouldhide[i].style.display = "none";
  }
  document.getElementById(document.getElementById("typ_zadania").value).style.display = "block";
  document.getElementById("main_div").style.display = "block";
}
function setupdatelatex(){
  updatelatex(document.getElementById("input").value);
}
function setLatexId(inputID){
  let input = inputID.value;
  let output = document.getElementById("display_math");
  try{
    output.innerHTML = katex.renderToString(input);
  }catch(error){
    output.innerHTML = error;
  } 
}
function setLatex(input,output){
  try{
    output.innerHTML = katex.renderToString(input);
  }catch(error){
    output.innerHTML = error;
  }
}
var setonce = false;
var isshown = false;
function toggle_przyciski(){
  let buttons = document.getElementsByClassName("function-button");
  if(!isshown){
    if(!setonce){
      for(var i=0;i<buttons.length;i++){
        setLatex(buttons[i].innerHTML,buttons[i]);
      }
      setonce = true;
    }
    document.getElementById("przyciski").style.display = "block";
    isshown = true;
  }
  else{
    document.getElementById("przyciski").style.display = "none";
    isshown = false;
  }
  
}
let jsondata;
let listaPytan = [];
let listaPytanChanged = [];
function generuj_przyciski2D(element,dane){
  element.innerHTML="";
  for(var i=0;i<dane.length;i++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this)" type="text" class="block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white  focus:border-slate-500/30" value="'+dane[i]+'">'
  }
}
function generuj_przyciski2D(element,dane,id){
  element.innerHTML="";
  for(var i=0;i<dane.length;i++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this);autosave()" type="text" class="'+id+' block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white  focus:border-slate-500/30" value="'+dane[i]+'">'
  }
}
function generuj_przyciski3D(element,dane){
  element.innerHTML="";
  for(var i=0;i<dane.length;i++){
    for(var j=0;j<dane[i].length;j++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this)" type="text" class="block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white focus:border-slate-500/30" value="'+dane[i][j]+'">'
  }
}
}
function generuj_przyciski3D(element,dane,id){
  element.innerHTML="";
  for(var i=0;i<dane.length;i++){
    for(var j=0;j<dane[i].length;j++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this);autosave()" type="text" class="'+id+i+' block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white focus:border-slate-500/30" value="'+dane[i][j]+'">'
  }
  if(dane.length-1!=0)element.innerHTML+="<hr>";
}
function getDepth(dane){
  return dane.length;
}
}
function check_if_diff(){
  if(listaPytanChanged[selected_global]!=listaPytan[selected_global]){
    document.getElementById("resetbtn").disabled = false;
    document.getElementById("resetbtn").style.cursor = "pointer";
  }else{
    document.getElementById("resetbtn").disabled = true;
    document.getElementById("resetbtn").style.cursor = "no-drop";
  }
}
function autosave(){
  if(document.getElementById("autosave").checked){
    save_changes();
  }
}
function save_changes(){
  let id = selected_global;
  if(listaPytan[id].Typ==="DOKONCZ"){
      typ_zadania = DOKONCZ;
      listaPytanChanged[id].Id = typ_zadania.getElementsByClassName("id")[0].value;
      listaPytanChanged[id].Pkt = typ_zadania.getElementsByClassName("pkt")[0].value;
      listaPytanChanged[id].PoprawnaOdp = get2DValues("poprawna_generated");
      listaPytanChanged[id].Polecenie = get2DValues("polecenia_generated");
      listaPytanChanged[id].Info = get2DValues("info_generated");
      listaPytanChanged[id].Tresc = get2DValues("tresc_generated");
      listaPytanChanged[id].Wyjasnienie = get2DValues("wyjasnienie_generated");
  }
  check_if_diff();
}
function reset_to_default(){
  listaPytanChanged[selected_global]=JSON.parse(JSON.stringify(listaPytan[selected_global]));
  document.getElementById("resetbtn").disabled = true;
  document.getElementById("resetbtn").style.cursor = "no-drop";
  selectpytanie(selected_global);
}
function addInfo(){
  listaPytanChanged[selected_global].Info.push("");
  selectpytanie(selected_global);
  autosave();
}
function addTresc(){
  listaPytanChanged[selected_global].Tresc.push("");
  selectpytanie(selected_global);
  autosave();
}
function addPolecenie(){
  listaPytanChanged[selected_global].Polecenie.push("");
  selectpytanie(selected_global);
  autosave();
}
function addWyjasnienie(){
  listaPytanChanged[selected_global].Wyjasnienie.push("");
  selectpytanie(selected_global);
  autosave();
}
function get2DValues(classname){
  let arr = [];
  let btns = document.getElementsByClassName(classname);
  for(var i=0;i<btns.length;i++){
    arr.push(btns[i].value);
  }
  return arr;
}
function read_podpunkt(id_podpunktu){
  if(listaPytan[selected_global].Typ==="ZLOZONE"){
    mainblock.innerHTML="";
    document.getElementById("typ_zadania").value = listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Typ;
    console.log(listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Typ);
    switch(listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Typ){
      case "DOKONCZ":{
        mainblock.append(DOKONCZ);
        typ_zadania = DOKONCZ;
        typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[selected_global].Id;
        typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Pkt;
        let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].PoprawnaOdp,"poprawna_generated");
        let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Polecenie,"polecenia_generated");
        let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Info,"info_generated");
        let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Tresc,"tresc_generated");
        let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Odpowiedzi,"odpowiedzi_generated");
        let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Wyjasnienie,"wyjasnienie_generated");
      }break;
      case "PF":{
        mainblock.append(PF);
        typ_zadania = PF;
        typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[selected_global].Id;
        typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Pkt;
        let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].PoprawnaOdp);
        let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Polecenie);
        let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Info);
        let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Tresc);
        let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Odpowiedzi);
        let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Wyjasnienie);
      }break;
      case "OTWARTE":{
        mainblock.append(OTWARTE);
        typ_zadania = OTWARTE;
        typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[selected_global].Id;
        typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Pkt;
        let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Polecenie);
        let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Info);
        let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Tresc);
        let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].Wyjasnienie);
        let wyjasnieniemini = document.getElementsByClassName("wyjasnieniemini")[0]; generuj_przyciski2D(wyjasnieniemini,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].PoprawnaOdpMini);
      }break;
    }
  }
  show_div();
}
let mainblock=document.getElementById("main_div");
function selectpytanie(id){
  selected_global = id;
  console.log(listaPytanChanged[id]);
  update_code_object(id);
  mainblock.innerHTML="";
  document.getElementById("typ_zadania").value = listaPytanChanged[id].Typ;
  let typ_zadania;
  switch(listaPytanChanged[id].Typ){
    case "DOKONCZ":{
      mainblock.append(DOKONCZ);
      typ_zadania = DOKONCZ;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[id].Id;
      typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[id].Pkt;
      let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,listaPytanChanged[id].PoprawnaOdp,"poprawna_generated");
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[id].Polecenie,"polecenia_generated");
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[id].Info,"info_generated");
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[id].Tresc,"tresc_generated");
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[id].Odpowiedzi,"odpowiedzi_generated");
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[id].Wyjasnienie,"wyjasnienie_generated");
    }break;
    case "PF":{
      mainblock.append(PF);
      typ_zadania = PF;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[id].Id;
      typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[id].Pkt;
      let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,listaPytanChanged[id].PoprawnaOdp);
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[id].Polecenie);
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[id].Info);
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[id].Tresc);
      if(!listaPytanChanged[id].hasInfo) info.classList.add("hidden");
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[id].Odpowiedzi);
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[id].Wyjasnienie);
    }break;
    case "OTWARTE":{
      mainblock.append(OTWARTE);
      typ_zadania = OTWARTE;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[id].Id;
      typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[id].Pkt;
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[id].Polecenie);
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[id].Info);
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[id].Tresc);
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[id].Wyjasnienie);
      let wyjasnieniemini = document.getElementsByClassName("wyjasnieniemini")[0]; generuj_przyciski2D(wyjasnieniemini,listaPytanChanged[id].PoprawnaOdpMini);
    }break;
    case "ZLOZONE":{
      mainblock.append(ZLOZONE);
      typ_zadania = ZLOZONE;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[id].Id;
      typ_zadania.getElementsByClassName("podpkt")[0].value = listaPytanChanged[id].Podpunkty;
      let podpunkty = document.getElementsByClassName("podpunkty")[0];
      podpunkty.innerHTML="";
      for(var i=0;i<listaPytanChanged[id].Podpunkty;i++){
        podpunkty.innerHTML+="<button onclick='read_podpunkt("+i+")' class='bg-slate-700/50  border border-slate-500/30 hover:bg-slate-500/40 active:bg-slate-600 rounded-full pl-6 pr-6 p-2 m-2 text-white font-semibold ml-2 block'>Podpunkt ["+i+"] ["+listaPytanChanged[id].ListaZlozone[i].Typ+"]</button>";
      }
      }break;
  }
  show_div();
}
function copy_to_clip(){
  if(isFetch){
    let finalString;
    for(var i=0;i<listaPytan.length;i++){
      finalString+=JSON.stringify(jsondata.API[i])
    }
    navigator.clipboard.writeText(finalString);
  }
}
isFetch = false;
function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}
function toggle_compact(){
  if(isFetch){
    let checkbox = document.getElementById("prettyjson");
    let code =  document.getElementById("output");
    if(checkbox.checked){
      for(var i=0;i<listaPytan.length;i++){
        code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(jsondata.API[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(jsondata.API[i]))+"</pre></a>";
      }
    }else{
      for(var i=0;i<listaPytan.length;i++){
        code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(jsondata.API[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(jsondata.API[i],undefined, 2))+"</pre></a>";
      }
    }
    if(selected_global) code.children[selected_global].classList.add("currently_selected");
  }
}

let selected_global;
function update_code_object(id){
  let selected = document.getElementsByClassName("currently_selected");
  for(var i=0;i<selected.length;i++){
    selected[i].classList.remove("currently_selected");
  }
  document.getElementsByClassName("code_object")[id].classList.add("currently_selected");
  selected_global=id;
}
function fetch_json(){
  if(!isFetch){
    let url = 'https://blaz1q.github.io/crocodingo/androidAPIVER2.json';
    let code =  document.getElementById("output");
    fetch(url).then(Response => {return Response.json();}).then(function (json){
        jsondata = json;
        for(var i=0;i<jsondata.API.length;i++){
            code.innerHTML += "<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(jsondata.API[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(jsondata.API[i]))+"</pre></a>"+"\n";
            listaPytan.push(new PytaniaNewFormat(jsondata.API[i]));
            listaPytanChanged.push(new PytaniaNewFormat(jsondata.API[i]));
        }
        for(var i=0;i<listaPytan.length;i++){
          console.log(listaPytan[i]);
        }
        isFetch = true;
    })
    .catch(err => {code.innerHTML=err});
    
  }
}
class PytaniaNewFormat {
    constructor(pytanie) {
      this.Id = 0;
      this.Pkt = 0;
      this.Typ = "";
      this.Kategoria = "";
      this.KatID = 0;
      this.Info = [];
      this.Zdj = "";
      this.Polecenie = [];
      this.Tresc = [];
      this.Odpowiedzi = [];
      this.OdpowiedziZdj = [];
      this.PoprawnaOdp = [];
      this.PoprawnaOdpMini = [];
      this.OdpowiedziUzytkownika = [];
      this.Wyjasnienie = [];
      this.Tabela = [];
      this.Podpunkty = 0;
      this.hasInfo = false;
      this.hasTresc = false;
      this.hasPolecenie = false;
      this.hasZdj = false;
      this.hasOdpowiedzi = false;
      this.translatable = null;
  
      try {
        this.Typ = pytanie.typ;
        this.Id = pytanie.id;
  
        if (this.Typ === "DOKONCZ") {
          this.initializeDokoncz(pytanie);
        } else if (this.Typ === "PF") {
          this.initializePF(pytanie);
        } else if (this.Typ === "OTWARTE") {
          this.initializeOtwarte(pytanie);
        } else if (this.Typ === "DOPASUJ_NTON") {
          this.initializeDopasujNTON(pytanie);
        } else if (this.Typ === "DOPASUJ_NTO1" || this.Typ === "DOPASUJ_1TO1") {
          this.initializeDopasujNTO1(pytanie);
        } else if (this.Typ === "DOPASUJ_TABELA") {
          this.initializeDopasujTabela(pytanie);
        } else if (this.Typ === "ZLOZONE") {
          this.initializeZlozone(pytanie);
        }
      } catch (error) {
        console.error("Error initializing PytaniaNewFormat:", error);
      }
    }
  
    initializeDokoncz(pytanie) {
      this.Pkt = pytanie.pkt;
      this.Kategoria = pytanie.kat;
      this.KatID = pytanie.katID;
      this.PoprawnaOdp = this.initI1D(pytanie.poprawna);
      this.OdpowiedziUzytkownika = new Array(this.PoprawnaOdp.length).fill(-1);
      this.Wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.Polecenie = this.initS1D(pytanie.polecenie);
      this.hasPolecenie = true;
      if (pytanie.tresc) { this.Tresc = this.initS1D(pytanie.tresc); this.hasTresc = true; }
      if (pytanie.odp) { this.Odpowiedzi = this.initS2D(pytanie.odp); this.hasOdpowiedzi = true; }
      if (pytanie.odp_zdj) this.OdpowiedziZdj = this.initS1D(pytanie.odp_zdj);
      if (pytanie.info) { this.Info = this.initS1D(pytanie.info); this.hasInfo = true; }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj; this.hasZdj = true; }
      if (pytanie.translatable_info) { this.translatable = pytanie.translatable_info; }
    }
  
    initializePF(pytanie) {
      this.Pkt = pytanie.pkt;
      this.Kategoria = pytanie.kat;
      this.KatID = pytanie.katID;
      this.PoprawnaOdp = this.initI1D(pytanie.poprawna);
      this.Wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.Polecenie = this.initS1D(pytanie.polecenie);
      this.hasPolecenie = true;
      this.OdpowiedziUzytkownika = new Array(this.PoprawnaOdp.length).fill(-1);
      if (pytanie.tresc) { this.Tresc = this.initS1D(pytanie.tresc); this.hasTresc = true; }
      if (pytanie.info) { this.Info = this.initS1D(pytanie.info); this.hasInfo = true; }
      if (pytanie.odp) { this.Odpowiedzi = this.initS2D(pytanie.odp); this.hasOdpowiedzi = true; }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj; this.hasZdj = true; }
    }
  
    initializeOtwarte(pytanie) {
      this.Pkt = pytanie.pkt;
      this.Kategoria = pytanie.kat;
      this.KatID = pytanie.katID;
      this.OdpowiedziUzytkownika = new Array(1).fill(-1);
      if (pytanie.tresc) { this.Tresc = this.initS1D(pytanie.tresc); this.hasTresc = true; }
      this.PoprawnaOdpMini = this.initS1D(pytanie.poprawna);
      this.Wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.Polecenie = this.initS1D(pytanie.polecenie);
      this.hasPolecenie = true;
      if (pytanie.info) { this.Info = this.initS1D(pytanie.info); this.hasInfo = true; }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj; this.hasZdj = true; }
    }
  
    initializeDopasujNTON(pytanie) {
      this.Pkt = pytanie.pkt;
      this.Kategoria = pytanie.kat;
      this.KatID = pytanie.katID;
      this.PoprawnaOdp = this.initI1D(pytanie.poprawna);
      this.Wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.Polecenie = this.initS1D(pytanie.polecenie);
      this.hasPolecenie = true;
      this.OdpowiedziUzytkownika = new Array(this.PoprawnaOdp.length).fill(-1);
      if (pytanie.tresc) { this.Tresc = this.initS1D(pytanie.tresc); this.hasTresc = true; }
      if (pytanie.info) { this.Info = this.initS1D(pytanie.info); this.hasInfo = true; }
      if (pytanie.odp) { this.Odpowiedzi = this.initS2D(pytanie.odp); this.hasOdpowiedzi = true; }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj; this.hasZdj = true; }
    }
  
    initializeDopasujNTO1(pytanie) {
      this.Pkt = pytanie.pkt;
      this.Kategoria = pytanie.kat;
      this.KatID = pytanie.katID;
      this.PoprawnaOdp = this.initI1D(pytanie.poprawna);
      this.Wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.Polecenie = this.initS1D(pytanie.polecenie);
      this.hasPolecenie = true;
      this.OdpowiedziUzytkownika = new Array(this.PoprawnaOdp.length).fill(-1);
      if (pytanie.tresc) { this.Tresc = this.initS1D(pytanie.tresc); this.hasTresc = true; }
      if (pytanie.info) { this.Info = this.initS1D(pytanie.info); this.hasInfo = true; }
      if (pytanie.odp) { this.Odpowiedzi = this.initS2D(pytanie.odp); this.hasOdpowiedzi = true; }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj; this.hasZdj = true; }
    }
  
    initializeDopasujTabela(pytanie) {
      this.Pkt = pytanie.pkt;
      this.Kategoria = pytanie.kat;
      this.KatID = pytanie.katID;
      this.PoprawnaOdp = this.initI1D(pytanie.poprawna);
      this.Wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.Polecenie = this.initS1D(pytanie.polecenie);
      this.hasPolecenie = true;
      this.Tabela = this.initS3D(pytanie.tabela);
      this.OdpowiedziUzytkownika = new Array(this.PoprawnaOdp.length).fill(-1);
      if (pytanie.tresc) { this.Tresc = this.initS1D(pytanie.tresc); this.hasTresc = true; }
      if (pytanie.info) { this.Info = this.initS1D(pytanie.info); this.hasInfo = true; }
      if (pytanie.odp) { this.Odpowiedzi = this.initS2D(pytanie.odp); this.hasOdpowiedzi = true; }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj; this.hasZdj = true; }
    }
  
    initializeZlozone(pytanie) {
      this.Podpunkty = pytanie.ilosc_podpunktow;
      if (pytanie.info) { this.Info = this.initS1D(pytanie.info); this.hasInfo = true; }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj; this.hasZdj = true; }
      if (pytanie.tresc) { this.Tresc = this.initS1D(pytanie.tresc); this.hasTresc = true; }
  
      this.ListaZlozone = [];
      for (let i = 0; i < this.Podpunkty; i++) {
        let podpunkt = pytanie[`podpunkt${i + 1}`];
        let pytanieObj = new PytaniaNewFormat(podpunkt);
        this.ListaZlozone.push(pytanieObj);
      }
    }
    initS3D(array) {
        const zmienna = new Array(array.length);
        for (let j = 0; j < array.length; j++) {
            const Innerarray = array[j];
            zmienna[j] = new Array(Innerarray.length);
            for (let k = 0; k < Innerarray.length; k++) {
                const InnerInnerarray = Innerarray[k];
                zmienna[j][k] = new Array(InnerInnerarray.length);
                for (let h = 0; h < InnerInnerarray.length; h++) {
                    zmienna[j][k][h] = InnerInnerarray[h];
                    console.log("cos+sie+dzieje", zmienna[j][k][h]);
                }
            }
        }
        return zmienna;
    }
    
    initS2D(array) {
        const zmienna = new Array(array.length);
        for (let j = 0; j < array.length; j++) {
            const Innerarray = array[j];
            zmienna[j] = new Array(Innerarray.length);
            for (let k = 0; k < Innerarray.length; k++) {
                zmienna[j][k] = Innerarray[k];
                console.log("cos+sie+dzieje", zmienna[j][k]);
            }
        }
        return zmienna;
    }
    
    initS1D(array) {
        const zmienna = new Array(array.length);
        for (let i = 0; i < array.length; i++) {
            zmienna[i] = array[i];
            console.log("cos+sie+dzieje", zmienna[i]);
        }
        return zmienna;
    }
    
    initI1D(array) {
        const zmienna = new Array(array.length);
        for (let i = 0; i < array.length; i++) {
            zmienna[i] = array[i];
        }
        return zmienna;
    }
}
