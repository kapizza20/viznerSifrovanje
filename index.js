const alfabet='abcdefghijklmnopqrstuvwxyz ';

const input=document.querySelector("#in");
const output=document.querySelector("#out");
const sifDugme=document.querySelector("#sif");
const desifDugme=document.querySelector("#desif");
const inicijalnaVrednost=document.querySelector("#kljuc");
const copyDugme=document.querySelector("#outCopy");

// function copyToClipboard(element) {
//   var $temp = $("<input>");
//   $("body").append($temp);
//   $temp.val($(element).text()).select();
//   document.execCommand("copy");
//   $temp.remove();
// }

function handleClick() {
    /* Save value of myText to copyTxt variable */
    var copyTxt = output.value;
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyTxt);
    alert("Kopiran tekst: " + copyTxt);
}

copyDugme.addEventListener('click',(e)=>{
   e.preventDefault();
   handleClick()
})

sifDugme.addEventListener('click',(e)=>{
   e.preventDefault();
   mainsif();
})

desifDugme.addEventListener('click',(e)=>{
   e.preventDefault();
   maindesif();
})

const upisi=()=>{
   //upis poruke u fajl sa timestampom
}

const kreirajKljuc=(duzina,inicV)=>{
   // Rand kljuc za sifrovanje koji bi trebao da se upise u bazu, implementirani funkciju upisi
   // Tako da desifrovanje se radi kao uneses tvoj sifrat i onda se nekako nadje tvoj random kljuc al jebiga sad....

   // let kljuc='';
   // for(i=0;i<duzina;i++){
   //    let index=Math.floor(Math.random()*26);
   //    kljuc+=alfabet.charAt(index);
   // }
   // console.log(kljuc);
   // return kljuc;
   const date=new Date(Date.now());
   let pomeraj=date.getDate()*(date.getDay()+1)*date.getFullYear();
   pomeraj=pomeraj%28;
   //console.log(pomeraj);
   let kljuc='';

   for(i=0;i<5;i++){
   kljuc+=alfabet[(pomeraj+i*(date.getDay()+1))%28];
   }

   inicV=inicV.toLowerCase();
   while(kljuc.length<duzina){
      kljuc+=inicV;
   }
   console.log(kljuc);
   return kljuc;
}

const sifruj = (poruka,inicV) => {
   poruka=poruka.toLowerCase();
   let kljuc=kreirajKljuc(poruka.length,inicV);
   console.log('Generisan kljuc:',kljuc);
   let sifrat='';
   for(i=0;i<poruka.length;i++){
      //.charat[],indexOf
      let slovo=poruka[i];
      if(slovo=="PROVERAZASPACE"){
         sifrat+=" ";
      }
      else{
         let indexSlova=alfabet.indexOf(slovo);
         let indexKljuca=alfabet.indexOf(kljuc[i]);
         let sifrovanindex=(indexSlova+indexKljuca)%27;
         console.log("Indeks slova, kljuca, sifrovanIndeks",indexSlova,indexKljuca,sifrovanindex);
         sifrat+=alfabet.charAt(sifrovanindex);
      }
   }
   console.log('Sifrat:',sifrat);
   return sifrat;
}

const desifruj=(sifrat,inicV)=>{
   let kljuc=kreirajKljuc(sifrat.length,inicV);
   console.log(kljuc);
   let OT='';
   for(i=0;i<sifrat.length;i++){
      //.charat[],indexOf
      let slovo=sifrat[i];
      if(slovo=="PROVERAZASPACE"){
         OT+=" ";
      }
      else{
         let indexSlova=alfabet.indexOf(slovo);
         let indexKljuca=alfabet.indexOf(kljuc[i]);
         if(indexSlova-indexKljuca>=0){
            rezultat=(indexSlova-indexKljuca)%27;
         }else{
            rezultat=(27-(-(indexSlova-indexKljuca)))%27;
         }
         let desifrovaniIndeks=rezultat;
            //console.log(indexSlova,indexKljuca,desifrovaniIndeks);
         OT+=alfabet.charAt(desifrovaniIndeks);
      }
   }
   console.log(OT);
   return OT;
}

const mainsif =()=> {
   output.value=sifruj(input.value,kljuc.value);
}

const maindesif =()=> {
   output.value=desifruj(input.value,kljuc.value);
}
//main();