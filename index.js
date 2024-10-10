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

function functionCopy() {
  // Get the text field
  var copyText = output;

  // Select the text field
  
  copyText.setSelectionRange(0, 99999); // For mobile devices
  copyText.select();

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}

copyDugme.addEventListener('click',(e)=>{
   e.preventDefault();
   functionCopy();
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
   //console.log(pomeraj);
   let kljuc='';
   inicV=inicV.toLowerCase();
   while(kljuc.length<duzina){
      kljuc+=inicV;
   }
   console.log(kljuc);
   return kljuc;
}

const sifruj = (poruka,inicV) => {
   const date=new Date(Date.now());
   let pomeraj=date.getDate()*(date.getDay()+1)*date.getFullYear()*(date.getMonth()+1);
   pomeraj=pomeraj%27;
   poruka=poruka.toLowerCase();
   let kljuc=kreirajKljuc(poruka.length,inicV);
   console.log('Generisan kljuc:',kljuc);
   let sifrat='';
   for(i=0;i<poruka.length;i++){
      //.charat[],indexOf
      let slovo=poruka[i];
      if(false){
        //If treba da bude sa slovo=="PA SAD OVDE PROVERA ZA SPACE"
        //I ako jeste space samo prebaci takav kakav je
        //A mi cemo da idemo na resenje da je space samo slovo
        sifrat+=" ";
      }
      else{
         let indexSlova=alfabet.indexOf(slovo);
         let indexKljuca=alfabet.indexOf(kljuc[i]);
         let sifrovanindex=(indexSlova+indexKljuca+pomeraj)%27;
         console.log("Slovo, Indeks slova, kljuca, sifrovanIndeks -> ",slovo,indexSlova,indexKljuca,sifrovanindex);
         sifrat+=alfabet.charAt(sifrovanindex);
      }
   }
   console.log('Sifrat:',sifrat);
   return sifrat;
}

const desifruj=(sifrat,inicV)=>{
   const date=new Date(Date.now());
   let pomeraj=date.getDate()*(date.getDay()+1)*date.getFullYear()*(date.getMonth()+1);
   pomeraj=pomeraj%27;
   let kljuc=kreirajKljuc(sifrat.length,inicV);
   console.log(kljuc);
   let OT='';
   for(i=0;i<sifrat.length;i++){
      //.charat[],indexOf
      let slovo=sifrat[i];
      if(false){
         //If treba da bude sa slovo=="PA SAD OVDE PROVERA ZA SPACE"
        //I ako jeste space samo prebaci takav kakav je
        //A mi cemo da idemo na resenje da je space samo slovo
         OT+=" ";
      }
      else{
         let indexSlova=alfabet.indexOf(slovo);
         let indexKljuca=alfabet.indexOf(kljuc[i]);
         if((indexSlova-indexKljuca-pomeraj)>=0){
            rezultat=(indexSlova-indexKljuca-pomeraj)%27;
           console.log(rezultat);
         }else{
            rezultat=Math.abs((27-(-(indexSlova-indexKljuca-pomeraj))))%27;
           console.log(rezultat);
         }
         let desifrovaniIndeks=rezultat;
            //console.log(indexSlova,indexKljuca,desifrovaniIndeks);
         OT+=alfabet.charAt(desifrovaniIndeks);
         console.log("Slovo,Indeks slova, kljuca, sifrovanIndeks -> ",slovo,indexSlova,indexKljuca,desifrovaniIndeks);
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
