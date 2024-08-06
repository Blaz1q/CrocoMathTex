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
  element.innerHTML+='<button onclick="addOdp('+i+')" class="bg-slate-700/50  border border-slate-500/30 hover:bg-slate-500/40 active:bg-slate-600 rounded-full pl-6 pr-6 p-2 text-white font-semibold ml-2">+</button>';
  if(dane.length-1!=0)
    if(dane.length-1!=i)
    element.innerHTML+="<hr>";
  }
}
}
function generuj_odp(element,dane,id){
  element.innerHTML="";
  if(dane){
  for(var i=0;i<dane.length;i++){
    for(var j=0;j<dane[i].length;j++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this);autosave()" type="text" class="'+id+i+' block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white focus:border-slate-500/30" value="'+dane[i][j]+'">'
  }
  element.innerHTML+='<button onclick="addOdp('+i+')" class="bg-slate-700/50  border border-slate-500/30 hover:bg-slate-500/40 active:bg-slate-600 rounded-full pl-6 pr-6 p-2 text-white font-semibold ml-2">+</button>';
  if(dane.length-1!=0)
    if(dane.length-1!=i)
    element.innerHTML+="<hr>";
  }
}
}
function generuj_odp_zdj(element,dane,id){
  element.innerHTML="";
  if(dane){
  for(var i=0;i<dane.length;i++){
    for(var j=0;j<dane[i].length;j++){
    element.innerHTML+='<input onclick="setLatexId(this)" onkeyup="setLatexId(this);autosave()" type="text" class="'+id+i+' block rounded-md bg-slate-700/50  border border-slate-500/30 p-2 overflow-hidden w-full m-auto mt-2 md-2 focus:bg-slate-500/40 focus:text-white focus:border-slate-500/30" value="'+dane[i][j]+'">'
  }
  element.innerHTML+='<button onclick="addOdpZdj('+i+')" class="bg-slate-700/50  border border-slate-500/30 hover:bg-slate-500/40 active:bg-slate-600 rounded-full pl-6 pr-6 p-2 text-white font-semibold ml-2">+</button>';
  if(dane.length-1!=0)
    if(dane.length-1!=i)
    element.innerHTML+="<hr>";
  }
}
}
function getDepth(dane){
  return dane.length;
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
      if(listaPytanChanged[id].typ!="ZLOZONE"){
      listaPytanChanged[id].id = parseInt(document.getElementsByClassName("id")[0].value);
      
      listaPytanChanged[id].pkt = parseInt(document.getElementsByClassName("pkt")[0].value);
      if(listaPytanChanged[id].typ=="OTWARTE"){
        listaPytanChanged[id].poprawna = get2DValues("poprawna_generated");
      }else{
        listaPytanChanged[id].poprawna = get2DValuesINT("poprawna_generated");
      }
      
      listaPytanChanged[id].polecenie = get2DValues("polecenia_generated");
      listaPytanChanged[id].info = get2DValues("info_generated");
      listaPytanChanged[id].tresc = get2DValues("tresc_generated");
      listaPytanChanged[id].wyjasnienie = get2DValues("wyjasnienie_generated");
      listaPytanChanged[id].zdj = get2DValues("zdj_generated");
      listaPytanChanged[id].katID = parseInt(document.getElementsByClassName("kategoria")[0].value);
      listaPytanChanged[id].kat = document.getElementsByClassName("kategoria")[0].options[document.getElementsByClassName("kategoria")[0].selectedIndex].text;
      if(listaPytanChanged[id].odp){
      for(var i=0;i<listaPytanChanged[id].odp.length;i++){
        let arr=[];
        for(var j=0;j<listaPytanChanged[id].odp[i].length;j++){
           arr.push(document.getElementsByClassName("odpowiedzi_generated"+i)[j].value);
        }
        listaPytanChanged[id].odp[i] = arr;
      }
      }
      if(listaPytanChanged[id].odp_zdj){
      for(var i=0;i<listaPytanChanged[id].odp_zdj.length;i++){
        let arr=[];
        for(var j=0;j<listaPytanChanged[id].odp_zdj[i].length;j++){
            arr.push(document.getElementsByClassName("odpowiedzi_zdj_generated"+i)[j].value);
        }
        listaPytanChanged[id].odp_zdj[i] = arr;
      }
  }
}
else{
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].id = parseInt(document.getElementsByClassName("id")[0].value);
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].pkt = document.getElementsByClassName("pkt")[0].value;
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].poprawna = get2DValues("poprawna_generated");
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].polecenie = get2DValues("polecenia_generated");
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].info = get2DValues("info_generated");
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].tresc = get2DValues("tresc_generated");
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].wyjasnienie = get2DValues("wyjasnienie_generated");
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].zdj = get2DValues("zdj_generated");
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].katID = document.getElementsByClassName("kategoria")[0].value;
  listaPytanChanged[id].ListaZlozone[id_podpunktu_global].kat = document.getElementsByClassName("kategoria")[0].options[document.getElementsByClassName("kategoria")[0].selectedIndex].text;
  if(listaPytanChanged[id].ListaZlozone[id_podpunktu_global].odp){
  for(var i=0;i<listaPytanChanged[id].ListaZlozone[id_podpunktu_global].odp.length;i++){
    let arr=[];
    for(var j=0;j<listaPytanChanged[id].ListaZlozone[id_podpunktu_global].odp[i].length;j++){
       arr.push(document.getElementsByClassName("odpowiedzi_generated"+i)[j].value);
    }
    listaPytanChanged[id].ListaZlozone[id_podpunktu_global].odp[i] = arr;
  }
  }
  if(listaPytanChanged[id].ListaZlozone[id_podpunktu_global].odp_zdj){
  for(var i=0;i<listaPytanChanged[id].ListaZlozone[id_podpunktu_global].odp_zdj.length;i++){
    let arr=[];
    for(var j=0;j<listaPytanChanged[id].ListaZlozone[id_podpunktu_global].odp_zdj[i].length;j++){
        arr.push(document.getElementsByClassName("odpowiedzi_zdj_generated"+i)[j].value);
    }
    listaPytanChanged[id].ListaZlozone[id_podpunktu_global].odp_zdj[i] = arr;
  }
}
}
  updateCode();
  check_if_diff();
}
function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj
}
function validate(obj){

}
function usunZadanie(){
  if(selected_global||selected_global==0){
    console.log(selected_global);
    listaPytanChanged.splice(selected_global,1);
    listaPytan.splice(selected_global,1);
    let code =  document.getElementById("output");
    code.removeChild(code.children[selected_global])
    selected_global=undefined;
  }
}
function addZadanie(){
  console.log('{"typ":"'+document.getElementById("typ_zadania").value+'","id":'+(listaPytanChanged.length)+' }');
  listaPytanChanged.push(new PytaniaNewFormat(JSON.parse('{"typ":"'+document.getElementById("typ_zadania").value+'","id":'+(listaPytanChanged.length)+' }')));
  let code =  document.getElementById("output");
  code.innerHTML+="<a href='#display_math'onclick='selectpytanie("+(listaPytanChanged.length-1)+")'><pre class='code_object'>nowe zadanie</pre></a>";
}
function reset_to_default(){
  if(listaPytan[selected_global]){
      listaPytanChanged[selected_global]=JSON.parse(JSON.stringify(listaPytan[selected_global]));
  }
  else{
    listaPytanChanged[selected_global] = new PytaniaNewFormat(JSON.parse('{"typ":"'+document.getElementById("typ_zadania").value+'","id":'+(listaPytanChanged.length-1)+' }'));
  }
  document.getElementById("resetbtn").disabled = true;
  document.getElementById("resetbtn").style.cursor = "no-drop";
  selectpytanie(selected_global);
  updateCode();
}
function addInfo(){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].info){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].info = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].info.push("");
    read_podpunkt(id_podpunktu_global);
      }else{
    if(!listaPytanChanged[selected_global].info){
      listaPytanChanged[selected_global].info = new Array();
    }
    listaPytanChanged[selected_global].info.push("");
    selectpytanie(selected_global);
  }
  autosave();
}
function addPodpunkt(){
  if(!listaPytanChanged[selected_global].ListaZlozone){
    listaPytanChanged[selected_global].ListaZlozone = new Array();
  }
  listaPytanChanged[selected_global].ListaZlozone.push(new PytaniaNewFormat(JSON.parse('{"typ":"'+document.getElementById("typ_zadania").value+'","id":'+(listaPytanChanged.length-1)+' }')));
  selectpytanie(selected_global);
}
function addTresc(){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].tresc){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].tresc = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].tresc.push("");
    read_podpunkt(id_podpunktu_global);
    }else{
    if(!listaPytanChanged[selected_global].tresc){
      listaPytanChanged[selected_global].tresc = new Array();
    }
    listaPytanChanged[selected_global].tresc.push("");
    selectpytanie(selected_global);
  }
  autosave();
}
function addZdj(){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].zdj){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].zdj = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].zdj.push("");
    read_podpunkt(id_podpunktu_global);
  }else{
    if(!listaPytanChanged[selected_global].zdj){
      listaPytanChanged[selected_global].zdj = new Array();
    }
    listaPytanChanged[selected_global].zdj.push("");
    selectpytanie(selected_global);
  }
  autosave();
}
function addOdp(scope){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp[scope]){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp[scope] = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp[scope].push("");
    read_podpunkt(id_podpunktu_global);
  }else{
    if(!listaPytanChanged[selected_global].odp[scope]){
      listaPytanChanged[selected_global].odp[scope] = new Array();
    }
    listaPytanChanged[selected_global].odp[scope].push("");
    selectpytanie(selected_global);
  }
  autosave();
}
function normalizuj(){
  let code =  document.getElementById("output");
  let checkbox = document.getElementById("prettyjson");
  for(var i=0;i<listaPytanChanged.length;i++){
    listaPytanChanged[i].id=i;
    if(checkbox.checked){
      code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(clean(listaPytanChanged[i])))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(clean(listaPytanChanged[i])))+"</pre></a>";
    }else{
      code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(clean(listaPytanChanged[i])))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(clean(listaPytanChanged[i]),undefined, 2))+"</pre></a>";
    }
  }
}
function addOdpScope(){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp.push("");
    read_podpunkt(id_podpunktu_global);
  }else{
    if(!listaPytanChanged[selected_global].odp){
      listaPytanChanged[selected_global].odp = new Array();
    }
    listaPytanChanged[selected_global].odp.push(new Array);
    selectpytanie(selected_global);
  }
  autosave();
}
function addOdpZdj(scope){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp_zdj[scope]){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp_zdj[scope] = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp_zdj[scope].push("");
    read_podpunkt(id_podpunktu_global);
  }else{
    if(!listaPytanChanged[selected_global].odp_zdj[scope]){
      listaPytanChanged[selected_global].odp_zdj[scope] = new Array();
    }
    listaPytanChanged[selected_global].odp_zdj[scope].push("");
    selectpytanie(selected_global);
  }
  autosave();
}
function addOdpZdjScope(){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp_zdj){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp_zdj = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].odp_zdj.push("");
    read_podpunkt(id_podpunktu_global);
  }else{
    if(!listaPytanChanged[selected_global].odp_zdj){
      listaPytanChanged[selected_global].odp_zdj = new Array();
    }
    listaPytanChanged[selected_global].odp_zdj.push(new Array);
    selectpytanie(selected_global);
  }
  autosave();
}
function addPolecenie(){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].polecenie){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].polecenie = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].polecenie.push("");
    read_podpunkt(id_podpunktu_global);
  }else{
    if(!listaPytanChanged[selected_global].polecenie){
      listaPytanChanged[selected_global].polecenie = new Array();
    }
    listaPytanChanged[selected_global].polecenie.push("");
    selectpytanie(selected_global);
  }
  autosave();
}
function addPoprawna(){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].poprawna){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].poprawna = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].poprawna.push(0);
    read_podpunkt(id_podpunktu_global);
  }else{
    if(!listaPytanChanged[selected_global].poprawna){
      listaPytanChanged[selected_global].poprawna = new Array();
    }
    listaPytanChanged[selected_global].poprawna.push(0);
    selectpytanie(selected_global);
  } 
  autosave();

}
function addWyjasnienie(){
  if(isPodpunkt){
    if(!listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].wyjasnienie){
      listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].wyjasnienie = new Array();
    }
    listaPytanChanged[selected_global].ListaZlozone[id_podpunktu_global].wyjasnienie.push("");
    read_podpunkt(id_podpunktu_global);
  }else{
    if(!listaPytanChanged[selected_global].wyjasnienie){
      listaPytanChanged[selected_global].wyjasnienie = new Array();
    }
    listaPytanChanged[selected_global].wyjasnienie.push("");
    selectpytanie(selected_global);
  }
  autosave();
}
function get2DValues(classname){
  let arr = [];
  let btns = document.getElementsByClassName(classname);
  for(var i=0;i<btns.length;i++){
    if(btns[i].value!="")
      arr.push(btns[i].value);
  }
  if(arr.length==0) return undefined;
  return arr;
}
function get2DValuesINT(classname){
  let arr = [];
  let btns = document.getElementsByClassName(classname);
  for(var i=0;i<btns.length;i++){
    if(btns[i].value!="")
      arr.push(parseInt(btns[i].value));
  }
  if(arr.length==0) return undefined;
  return arr;
}
var id_podpunktu_global;
var isPodpunkt;
function read_podpunkt(id_podpunktu){
  if(listaPytan[selected_global].typ==="ZLOZONE"){
    id_podpunktu_global = id_podpunktu;
    getZadanie(listaPytanChanged[selected_global].ListaZlozone[id_podpunktu]);
    isPodpunkt=true;
  }
    
}
function getZadanie(pytanie){
  update_code_object(selected_global);
  mainblock.innerHTML="";
  document.getElementById("typ_zadania").value = pytanie.typ;
  let typ_zadania;
  switch(pytanie.typ){
    case "DOKONCZ":{
      mainblock.append(DOKONCZ);
      typ_zadania = DOKONCZ;
      typ_zadania.getElementsByClassName("id")[0].value = pytanie.id;
      typ_zadania.getElementsByClassName("pkt")[0].value = pytanie.pkt;
      let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,pytanie.poprawna,"poprawna_generated");
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,pytanie.polecenie,"polecenia_generated");
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,pytanie.info,"info_generated");
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,pytanie.tresc,"tresc_generated");
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_odp(odpowiedzi,pytanie.odp,"odpowiedzi_generated");
      let zdj = document.getElementsByClassName("zdj")[0]; generuj_przyciski2D(zdj,pytanie.zdj,"zdj_generated");
      let odpowiedzi_zdj = document.getElementsByClassName("odpowiedzi_zdj")[0]; generuj_odp_zdj(odpowiedzi_zdj,pytanie.odp_zdj,"odpowiedzi_zdj_generated");
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,pytanie.wyjasnienie,"wyjasnienie_generated");
      let kategoria = typ_zadania.getElementsByClassName("kategoria")[0];
      kategoria.value = pytanie.katID;
    }break;
    case "PF":{
      mainblock.append(PF);
      typ_zadania = PF;
      typ_zadania.getElementsByClassName("id")[0].value = pytanie.id;
      typ_zadania.getElementsByClassName("pkt")[0].value = pytanie.pkt;
      let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,pytanie.poprawna,"poprawna_generated");
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,pytanie.polecenie,"polecenia_generated");
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,pytanie.info,"info_generated");
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,pytanie.tresc,"tresc_generated");
      let zdj = document.getElementsByClassName("zdj")[0]; generuj_przyciski2D(zdj,pytanie.zdj,"zdj_generated");
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_odp(odpowiedzi,pytanie.odp,"odpowiedzi_generated");
      let odpowiedzi_zdj = document.getElementsByClassName("odpowiedzi_zdj")[0]; generuj_odp_zdj(odpowiedzi_zdj,pytanie.odp_zdj,"odpowiedzi_zdj_generated");
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,pytanie.wyjasnienie,"wyjasnienie_generated");
      let kategoria = typ_zadania.getElementsByClassName("kategoria")[0];
      kategoria.value = pytanie.katID;
    }break;
    case "OTWARTE":{
      mainblock.append(OTWARTE);
      typ_zadania = OTWARTE;
      typ_zadania.getElementsByClassName("id")[0].value = pytanie.id;
      typ_zadania.getElementsByClassName("pkt")[0].value = pytanie.pkt;
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,pytanie.polecenie,"polecenia_generated");
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,pytanie.info,"info_generated");
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,pytanie.tresc,"tresc_generated");
      let zdj = document.getElementsByClassName("zdj")[0]; generuj_przyciski2D(zdj,pytanie.zdj,"zdj_generated");
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,pytanie.wyjasnienie,"wyjasnienie_generated");
      let wyjasnieniemini = document.getElementsByClassName("wyjasnieniemini")[0]; generuj_przyciski2D(wyjasnieniemini,pytanie.poprawna,"poprawna_generated");
      let kategoria = typ_zadania.getElementsByClassName("kategoria")[0];
      kategoria.value = pytanie.katID;
    }break;
    case "DOPASUJ_NTO1":{
      mainblock.append(DOPASUJ_NTO1);
      typ_zadania = DOPASUJ_NTO1;
      typ_zadania.getElementsByClassName("id")[0].value = pytanie.id;
      typ_zadania.getElementsByClassName("pkt")[0].value = pytanie.pkt;
      let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,pytanie.poprawna,"poprawna_generated");
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,pytanie.polecenie,"polecenia_generated");
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,pytanie.info,"info_generated");
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,pytanie.tresc,"tresc_generated");
      let zdj = document.getElementsByClassName("zdj")[0]; generuj_przyciski2D(zdj,pytanie.zdj,"zdj_generated");
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_odp(odpowiedzi,pytanie.odp,"odpowiedzi_generated");
      let odpowiedzi_zdj = document.getElementsByClassName("odpowiedzi_zdj")[0]; generuj_odp_zdj(odpowiedzi_zdj,pytanie.odp_zdj,"odpowiedzi_zdj_generated");
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,pytanie.wyjasnienie,"wyjasnienie_generated");
      let kategoria = typ_zadania.getElementsByClassName("kategoria")[0];
      kategoria.value = pytanie.katID;
    }break;
    case "DOPASUJ_1TO1":{
      mainblock.append(DOPASUJ_1TO1);
      typ_zadania = DOPASUJ_1TO1;
      typ_zadania.getElementsByClassName("id")[0].value = pytanie.id;
      typ_zadania.getElementsByClassName("pkt")[0].value = pytanie.pkt;
      let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,pytanie.poprawna,"poprawna_generated");
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,pytanie.polecenie,"polecenia_generated");
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,pytanie.info,"info_generated");
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,pytanie.tresc,"tresc_generated");
      let zdj = document.getElementsByClassName("zdj")[0]; generuj_przyciski2D(zdj,pytanie.zdj,"zdj_generated");
      let odpowiedzi = document.getElementsByClassName("odpowiedzi")[0]; generuj_odp(odpowiedzi,pytanie.odp,"odpowiedzi_generated");
      let odpowiedzi_zdj = document.getElementsByClassName("odpowiedzi_zdj")[0]; generuj_odp_zdj(odpowiedzi_zdj,pytanie.odp_zdj,"odpowiedzi_zdj_generated");
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,pytanie.wyjasnienie,"wyjasnienie_generated");
      let kategoria = typ_zadania.getElementsByClassName("kategoria")[0];
      kategoria.value = pytanie.katID;
    }break;
    case "DOPASUJ_TABELA":{
      mainblock.append(DOPASUJ_TABELA);
      typ_zadania = DOPASUJ_TABELA;
      typ_zadania.getElementsByClassName("id")[0].value = pytanie.id;
      typ_zadania.getElementsByClassName("pkt")[0].value = pytanie.pkt;
      let poprawna = document.getElementsByClassName("poprawne")[0]; generuj_przyciski2D(poprawna,pytanie.poprawna,"poprawna_generated");
      let polecenia = document.getElementsByClassName("polecenia")[0]; generuj_przyciski2D(polecenia,pytanie.polecenie,"polecenia_generated");
      let info = document.getElementsByClassName("info")[0]; generuj_przyciski2D(info,pytanie.info,"info_generated");
      let zdj = document.getElementsByClassName("zdj")[0]; generuj_przyciski2D(zdj,pytanie.zdj,"zdj_generated");
      let tresc = document.getElementsByClassName("tresc")[0]; generuj_przyciski2D(tresc,pytanie.tresc,"tresc_generated");
      let tabela = document.getElementsByClassName("tabela")[0]; 
      let str="";
      for(var i=0;i<pytanie.tabela.length;i++){
        str+="<table>";
        for(var j=0;j<pytanie.tabela[i].length;j++){
          str+="<tr>";
          for(var k=0;k<pytanie.tabela[i][j].length;k++){
            str+="<td>"+pytanie.tabela[i][j][k]+"</td>";
          }
          str+="</tr>";
        }
        str+="</table>";
      }
      tabela.innerHTML=str;
      let wyjasnienie = document.getElementsByClassName("wyjasnienie")[0]; generuj_przyciski2D(wyjasnienie,pytanie.wyjasnienie,"wyjasnienie_generated");
      let kategoria = typ_zadania.getElementsByClassName("kategoria")[0];
      kategoria.value = pytanie.katID;
    }break;
    case "ZLOZONE":{
      mainblock.append(ZLOZONE);
      typ_zadania = ZLOZONE;
      typ_zadania.getElementsByClassName("id")[0].value = pytanie.id;
      typ_zadania.getElementsByClassName("podpkt")[0].value = pytanie.Podpunkty;
      let podpunkty = document.getElementsByClassName("podpunkty")[0];
      podpunkty.innerHTML="";
      for(var i=0;i<pytanie.ListaZlozone.length;i++){
        podpunkty.innerHTML+="<button onclick='read_podpunkt("+i+")' class='bg-slate-700/50  border border-slate-500/30 hover:bg-slate-500/40 active:bg-slate-600 rounded-full pl-6 pr-6 p-2 m-2 text-white font-semibold ml-2 block'>Podpunkt ["+i+"] ["+listaPytanChanged[selected_global].ListaZlozone[i].typ+"]</button>";
      }
      }break;
  }
  show_div();
}
let mainblock=document.getElementById("main_div");
function selectpytanie(id){
  isPodpunkt=false;
  selected_global = id;
  console.log(listaPytanChanged[id]);
  update_code_object(id);
  document.getElementById("typ_zadania").value = listaPytanChanged[id].typ;
  getZadanie(listaPytanChanged[id]);
}
function copy_to_clip(){
  if(isFetch){
    let finalString="";
    for(var i=0;i<listaPytanChanged.length;i++){
      finalString+=JSON.stringify(listaPytanChanged[i]);
    }
    finalString+="";
    navigator.clipboard.writeText(finalString);
  }
}isFetch = true;
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
        code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(listaPytanChanged[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(listaPytanChanged[i]))+"</pre></a>";
      }
    }else{
      for(var i=0;i<listaPytanChanged.length;i++){
        code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object' title='"+sanitize(JSON.stringify(listaPytanChanged[i]))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(listaPytanChanged[i],undefined, 2))+"</pre></a>";
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
      code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object currently_selected' title='"+sanitize(JSON.stringify(clean(listaPytanChanged[i])))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(clean(listaPytanChanged[i])))+"</pre></a>";
    }else{
      code.children[i].innerHTML = "<a href='#display_math'><pre class='code_object currently_selected' title='"+sanitize(JSON.stringify(clean(listaPytanChanged[i])))+"' onclick='selectpytanie("+i+")' >"+sanitize(JSON.stringify(clean(listaPytanChanged[i]),undefined, 2))+"</pre></a>";
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
      if (pytanie.zdj) { this.zdj = pytanie.zdj;  }
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
      if (pytanie.zdj) { this.zdj = pytanie.zdj;  }
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
      if (pytanie.zdj) { this.zdj = pytanie.zdj;  }
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
      if (pytanie.zdj) { this.zdj = pytanie.zdj;  }
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
      if (pytanie.zdj) { this.zdj = pytanie.zdj;  }
    }
  
    initializeDopasujTabela(pytanie) {
      this.pkt = pytanie.pkt;
      this.kat = pytanie.kat;
      this.katID = pytanie.katID;
      this.poprawna = this.initI1D(pytanie.poprawna);
      this.wyjasnienie = this.initS1D(pytanie.wyjasnienie);
      this.polecenie = this.initS1D(pytanie.polecenie);

      this.tabela = this.initS3D(pytanie.tabela);
      if (pytanie.tresc) { this.tresc = this.initS1D(pytanie.tresc);}
      if (pytanie.info) { this.info = this.initS1D(pytanie.info); }
      if (pytanie.odp) { this.odp = this.initS2D(pytanie.odp);  }
      if (pytanie.zdj) { this.zdj = pytanie.zdj;  }
    }
  
    initializeZlozone(pytanie) {
      this.Podpunkty = pytanie.ilosc_podpunktow;
      if (pytanie.info) { this.info = this.initS1D(pytanie.info);  }
      if (pytanie.zdj) { this.zdj = pytanie.zdj;  }
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
