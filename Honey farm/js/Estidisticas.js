function EstPolen(){
    return 1 * multiAmorAbeja.MultuAPolen.act;
} 
function EstPolenAzul(){
    return 1 * multiMasAzul.MultuAPolenA.act;
} 
function EstPolenRojo(){
    return 1 * multiMasRojo.MultuAPolenR.act;
} 
function EstPolenBlanco(){
    return 1;
} 
//abejas
function EstRecolecionAbeja(){
    return 1 * multiAmorAbeja.MultuAbeja.act;
} 
function EstConvercion(){
    return (1 + MochilaEsta.ConvercionMas);
} 
function EstConvercionAzul(){
    return (1 + multiLagrima.MasConvercionAzul.act);
} 
//criticos
function EstProCrit(){
    return 0 + MultiMasCritico.MasCritico.act;
} 
function EstPoderCrit(){
    return 2;
} 



function EstExplocion(){
    return 1 * multiExplociones.MultuExplociones.act;
} 

