const alfabet='abcdefghijklmnopqrstuvwxyz ';

let input=document.querySelector("#in");
let output=document.querySelector("#out");
let sifDugme=document.querySelector("#sif");
let desifDugme=document.querySelector("#desif");
let inicijalnaVrednost=document.querySelector("#kljuc");

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
   let kljuc='';
   inicV=inicV.toLowerCase();
   while(kljuc.length<duzina){
      kljuc+=inicV;
   }
   return kljuc;
}

const sifruj = (poruka,inicV) => {
   poruka=poruka.toLowerCase();
   let kljuc=kreirajKljuc(poruka.length,inicV);
   console.log(kljuc);
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
         console.log(indexSlova,indexKljuca,sifrovanindex);
         sifrat+=alfabet.charAt(sifrovanindex);
      }
   }
   console.log(sifrat);
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