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
  if(dane){
  for(var i=0;i<dane.length;i++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this)" type="text" class="block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white  focus:border-slate-500/30" value="'+dane[i]+'">'
  }
}
}
function generuj_przyciski2D(element,dane,id){
  element.innerHTML="";
  if(dane){
  for(var i=0;i<dane.length;i++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this);autosave()" type="text" class="'+id+' block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white  focus:border-slate-500/30" value="'+dane[i]+'">'
  }
}
}
function generuj_przyciski3D(element,dane){
  element.innerHTML="";
  if(dane){
  for(var i=0;i<dane.length;i++){
    for(var j=0;j<dane[i].length;j++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this)" type="text" class="block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white focus:border-slate-500/30" value="'+dane[i][j]+'">'
  }
}
}
}
function generuj_przyciski3D(element,dane,id){
  element.innerHTML="";
  if(dane){
  for(var i=0;i<dane.length;i++){
    for(var j=0;j<dane[i].length;j++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this);autosave()" type="text" class="'+id+i+' block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white focus:border-slate-500/30" value="'+dane[i][j]+'">'
  }
  if(dane.length-1!=0)element.innerHTML+="<hr>";
  }
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
  if(listaPytan[id].typ==="DOKONCZ"){
      typ_zadania = DOKONCZ;
      listaPytanChanged[id].id = typ_zadania.getElementsByClassName("id")[0].value;
      listaPytanChanged[id].pkt = typ_zadania.getElementsByClassName("pkt")[0].value;
      listaPytanChanged[id].poprawna = get2DValues("poprawna_generated");
      listaPytanChanged[id].polecenie = get2DValues("polecenia_generated");
      listaPytanChanged[id].info = get2DValues("info_generated");
      listaPytanChanged[id].tresc = get2DValues("tresc_generated");
      listaPytanChanged[id].wyjasnienie = get2DValues("wyjasnienie_generated");
  }
  updateCode();
  check_if_diff();
}
function addZadanie(){
  console.log('{"typ":"'+document.getElementById("typ_zadania").value+'","id":'+(listaPytanChanged.length-1)+' }');
  listaPytanChanged.push(new PytaniaNewFormat(JSON.parse('{"typ":"'+document.getElementById("typ_zadania").value+'","id":'+(listaPytanChanged.length-1)+' }')));
  let code =  document.getElementById("output");
  code.innerHTML+="<a href='#display_math' class='code_object' onclick='selectpytanie("+(listaPytanChanged.length-1)+")'>nowe zadanie</a>";
}
function reset_to_default(){
  if(listaPytan[selected_global]){
      listaPytanChanged[selected_global]=JSON.parse(JSON.stringify(listaPytan[selected_global]));
  }
  else{
    listaPytanChanged[selected_global] = new PytaniaNewFormat();
  }
  document.getElementById("resetbtn").disabled = true;
  document.getElementById("resetbtn").style.cursor = "no-drop";
  selectpytanie(selected_global);
  updateCode();
}
function addInfo(){
  if(!listaPytanChanged[selected_global].info){
    listaPytanChanged[selected_global].info = new Array();
  }
  listaPytanChanged[selected_global].info.push("");
  selectpytanie(selected_global);
  autosave();
}
function addTresc(){
  if(!listaPytanChanged[selected_global].tresc){
    listaPytanChanged[selected_global].tresc = new Array();
  }
  listaPytanChanged[selected_global].tresc.push("");
  selectpytanie(selected_global);
  autosave();
}
function addPolecenie(){
  if(!listaPytanChanged[selected_global].polecenie){
    listaPytanChanged[selected_global].polecenie = new Array();
  }
  listaPytanChanged[selected_global].polecenie.push("");
  selectpytanie(selected_global);
  autosave();
}
function addWyjasnienie(){
  if(!listaPytanChanged[selected_global].wyjasnienie){
    listaPytanChanged[selected_global].wyjasnienie = new Array();
  }
  listaPytanChanged[selected_global].wyjasnienie.push("");
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
  if(listaPytan[selected_global].typ==="ZLOZONE"){
    mainblock.innerHTML="";
    document.getElementById("typ_zadania").value = listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].typ;
    console.log(listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].typ);
    switch(listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].typ){
      case "DOKONCZ":{
        mainblock.append(DOKONCZ);
        typ_zadania = DOKONCZ;
        typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[selected_global].id;
        typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].pkt;
        let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].poprawna,"poprawna_generated");
        let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].polecenie,"polecenia_generated");
        let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].info,"info_generated");
        let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].tresc,"tresc_generated");
        let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].odp,"odpowiedzi_generated");
        let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].wyjasnienie,"wyjasnienie_generated");
      }break;
      case "PF":{
        mainblock.append(PF);
        typ_zadania = PF;
        typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[selected_global].id;
        typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].pkt;
        let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].poprawna);
        let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].polecenie);
        let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].info);
        let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].tresc);
        let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].odp);
        let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].wyjasnienie);
      }break;
      case "OTWARTE":{
        mainblock.append(OTWARTE);
        typ_zadania = OTWARTE;
        typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[selected_global].id;
        typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].pkt;
        let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].polecenie);
        let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].info);
        let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].tresc);
        let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].wyjasnienie);
        let wyjasnieniemini = document.getElementsByClassName("wyjasnieniemini")[0]; generuj_przyciski2D(wyjasnieniemini,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].poprawna);
      }break;
      case "DOPASUJ_NTO1":{
        mainblock.append(DOPASUJ_NTO1);
        typ_zadania = DOPASUJ_NTO1;
        typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[selected_global].id;
        typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].pkt;
        let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].polecenie);
        let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].info);
        let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].tresc);
        let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[selected_global].ListaZlozone[id_podpunktu].wyjasnienie);
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
  document.getElementById("typ_zadania").value = listaPytanChanged[id].typ;
  let typ_zadania;
  switch(listaPytanChanged[id].typ){
    case "DOKONCZ":{
      mainblock.append(DOKONCZ);
      typ_zadania = DOKONCZ;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[id].id;
      typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[id].pkt;
      let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,listaPytanChanged[id].poprawna,"poprawna_generated");
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[id].polecenie,"polecenia_generated");
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[id].info,"info_generated");
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[id].tresc,"tresc_generated");
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[id].odp,"odpowiedzi_generated");
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[id].wyjasnienie,"wyjasnienie_generated");
    }break;
    case "PF":{
      mainblock.append(PF);
      typ_zadania = PF;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[id].id;
      typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[id].pkt;
      let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,listaPytanChanged[id].poprawna);
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[id].polecenie);
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[id].info);
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[id].tresc);
      if(!listaPytanChanged[id].hasInfo) info.classList.add("hidden");
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[id].odp);
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[id].wyjasnienie);
    }break;
    case "OTWARTE":{
      mainblock.append(OTWARTE);
      typ_zadania = OTWARTE;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[id].id;
      typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[id].pkt;
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[id].polecenie);
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[id].info);
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[id].tresc);
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[id].wyjasnienie);
      let wyjasnieniemini = document.getElementsByClassName("wyjasnieniemini")[0]; generuj_przyciski2D(wyjasnieniemini,listaPytanChanged[id].poprawna);
    }break;
    case "DOPASUJ_NTO1":{
      mainblock.append(DOPASUJ_NTO1);
      typ_zadania = DOPASUJ_NTO1;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[selected_global].id;
      typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[selected_global].pkt;
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[selected_global].polecenie);
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[selected_global].info);
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[selected_global].tresc);
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[id].odp);
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[selected_global].wyjasnienie);
    }break;
    case "DOPASUJ_1TO1":{
      mainblock.append(DOPASUJ_1TO1);
      typ_zadania = DOPASUJ_1TO1;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[selected_global].id;
      typ_zadania.getElementsByClassName("pkt")[0].value = listaPytanChanged[selected_global].pkt;
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,listaPytanChanged[selected_global].polecenie);
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,listaPytanChanged[selected_global].info);
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,listaPytanChanged[selected_global].tresc);
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_przyciski3D(odpowiedzi,listaPytanChanged[id].odp);
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,listaPytanChanged[selected_global].wyjasnienie);
    
    }
    case "ZLOZONE":{
      mainblock.append(ZLOZONE);
      typ_zadania = ZLOZONE;
      typ_zadania.getElementsByClassName("id")[0].value = listaPytanChanged[id].id;
      typ_zadania.getElementsByClassName("podpkt")[0].value = listaPytanChanged[id].Podpunkty;
      let podpunkty = document.getElementsByClassName("podpunkty")[0];
      podpunkty.innerHTML="";
      for(var i=0;i<listaPytanChanged[id].Podpunkty;i++){
        podpunkty.innerHTML+="<button onclick='read_podpunkt("+i+")' class='bg-slate-700/50  border border-slate-500/30 hover:bg-slate-500/40 active:bg-slate-600 rounded-full pl-6 pr-6 p-2 m-2 text-white font-semibold ml-2 block'>Podpunkt ["+i+"] ["+listaPytanChanged[id].ListaZlozone[i].typ+"]</button>";
      }
      }break;
  }
  show_div();
}
function copy_to_clip(){
  if(isFetch){
    let finalString="API[{";
    for(var i=0;i<listaPytanChanged.length;i++){
      finalString+=JSON.stringify(listaPytanChanged[i]);
    }
    finalString+="}]";
    navigator.clipboard.writeText(finalString);
  }
}isFetch = false;
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
      for(var i=0;i<listaPytanChanged.length;i++){
        code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(jsondata.API[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(jsondata.API[i]))+"</pre></a>";
      }
    }else{
      for(var i=0;i<listaPytanChanged.length;i++){
        code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(jsondata.API[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(jsondata.API[i],undefined, 2))+"</pre></a>";
      }
    }
    if(selected_global) code.children[selected_global].classList.add("currently_selected");
  }
}
function updateCode(){
  let code =  document.getElementById("output");
  let checkbox = document.getElementById("prettyjson");
  let i = selected_global;
  if(code.children.length<selected_global) code.innerHTML+="<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(listaPytanChanged[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(listaPytanChanged[i],undefined, 2))+"</pre></a>";
  if(checkbox.checked){
      code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object currently_selected' title='"+sanitize(JSON.stringify(listaPytanChanged[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(listaPytanChanged[i]))+"</pre></a>";
    }else{
      code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object currently_selected' title='"+sanitize(JSON.stringify(listaPytanChanged[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(listaPytanChanged[i],undefined, 2))+"</pre></a>";
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
      id;
      pkt;
      typ;
      kat;
      katID;
      info;
      zdj;
      polecenie;
      tresc;
      odp;
      odp_zdj;
      poprawna;
      wyjasnienie;
      Tabela;
      Podpunkty;
      translatable_info;
    constructor(pytanie) {
      
  
      try {
        this.typ = pytanie.typ;
        this.id = pytanie.id;
  
        if (this.typ === "DOKONCZ") {
          this.initializeDokoncz(pytanie);
        } else if (this.typ === "PF") {
          this.initializePF(pytanie);
        } else if (this.typ === "OTWARTE") {
          this.initializeOtwarte(pytanie);
        } else if (this.typ === "DOPASUJ_NTON") {
          this.initializeDopasujNTON(pytanie);
        } else if (this.typ === "DOPASUJ_NTO1" || this.typ === "DOPASUJ_1TO1") {
          this.initializeDopasujNTO1(pytanie);
        } else if (this.typ === "DOPASUJ_TABELA") {
          this.initializeDopasujTabela(pytanie);
        } else if (this.typ === "ZLOZONE") {
          this.initializeZlozone(pytanie);
        }
      } catch (error) {
        console.error("Error initializing PytaniaNewFormat:", error);
      }
    }
  
    initializeDokoncz(pytanie) {
      if (pytanie.pkt) this.pkt = pytanie.pkt;
      if (pytanie.kat) this.kat = pytanie.kat;
      if (pytanie.katID) this.katID = pytanie.katID;
      if (pytanie.poprawna) this.poprawna = this.initI1D(pytanie.poprawna);
      if (pytanie.wyjasnienie) this.wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      if (pytanie.polecenie) this.polecenie = this.initS1D(pytanie.polecenie);
      if (pytanie.tresc) { this.tresc = this.initS1D(pytanie.tresc);  }
      if (pytanie.odp) { this.odp = this.initS2D(pytanie.odp);  }
      if (pytanie.odp_zdj) this.odp_zdj = this.initS1D(pytanie.odp_zdj);
      if (pytanie.info) { this.info = this.initS1D(pytanie.info); }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj;  }
      if (pytanie.translatable_info) { this.translatable_info = pytanie.translatable_info; }
    }
  
    initializePF(pytanie) {
      this.pkt = pytanie.pkt;
      this.kat = pytanie.kat;
      this.katID = pytanie.katID;
      this.poprawna = this.initI1D(pytanie.poprawna);
      this.wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.polecenie = this.initS1D(pytanie.polecenie);
      if (pytanie.tresc) { this.tresc = this.initS1D(pytanie.tresc);  }
      if (pytanie.info) { this.info = this.initS1D(pytanie.info);  }
      if (pytanie.odp) { this.odp = this.initS2D(pytanie.odp);  }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj;  }
    }
  
    initializeOtwarte(pytanie) {
      this.pkt = pytanie.pkt;
      this.kat = pytanie.kat;
      this.katID = pytanie.katID;
      if (pytanie.tresc) { this.tresc = this.initS1D(pytanie.tresc);  }
      this.poprawna = this.initS1D(pytanie.poprawna);
      this.wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.polecenie = this.initS1D(pytanie.polecenie);
      if (pytanie.info) { this.info = this.initS1D(pytanie.info);  }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj;  }
    }
  
    initializeDopasujNTON(pytanie) {
      this.pkt = pytanie.pkt;
      this.kat = pytanie.kat;
      this.katID = pytanie.katID;
      this.poprawna = this.initI1D(pytanie.poprawna);
      this.wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.polecenie = this.initS1D(pytanie.polecenie);
      if (pytanie.tresc) { this.tresc = this.initS1D(pytanie.tresc);  }
      if (pytanie.info) { this.info = this.initS1D(pytanie.info);  }
      if (pytanie.odp) { this.odp = this.initS2D(pytanie.odp); }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj;  }
    }
  
    initializeDopasujNTO1(pytanie) {
      this.pkt = pytanie.pkt;
      this.kat = pytanie.kat;
      this.katID = pytanie.katID;
      this.poprawna = this.initI1D(pytanie.poprawna);
      this.wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.polecenie = this.initS1D(pytanie.polecenie);
      if (pytanie.tresc) { this.tresc = this.initS1D(pytanie.tresc); }
      if (pytanie.info) { this.info = this.initS1D(pytanie.info);  }
      if (pytanie.odp) { this.odp = this.initS2D(pytanie.odp);  }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj;  }
    }
  
    initializeDopasujTabela(pytanie) {
      this.pkt = pytanie.pkt;
      this.kat = pytanie.kat;
      this.katID = pytanie.katID;
      this.poprawna = this.initI1D(pytanie.poprawna);
      this.wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.polecenie = this.initS1D(pytanie.polecenie);

      this.Tabela = this.initS3D(pytanie.tabela);
      if (pytanie.tresc) { this.tresc = this.initS1D(pytanie.tresc);}
      if (pytanie.info) { this.info = this.initS1D(pytanie.info); }
      if (pytanie.odp) { this.odp = this.initS2D(pytanie.odp);  }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj;  }
    }
  
    initializeZlozone(pytanie) {
      this.Podpunkty = pytanie.ilosc_podpunktow;
      if (pytanie.info) { this.info = this.initS1D(pytanie.info);  }
      if (pytanie.zdj) { this.Zdj = pytanie.zdj;  }
      if (pytanie.tresc) { this.tresc = this.initS1D(pytanie.tresc);  }
  
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
