let Cantflor = 8;
function MejorarCantFlor() {
    if(!CompraTienda(MejorasItem.Campo)) return

    Cantflor++;
    if(Cantflor >= 12){
        Cantflor = 12;
        MejorasItem.Campo.Maximo = true;
    }
   generarFlores(Cantflor ** 2);

}
function CompraTienda(params) {
    if (params.Precio > Miel) {
        alert("No tienes La Miel Suficiente");
        return false;
    }
    const confirmacion = confirm(`¿Estás seguro de que quieres comprar ${params.item}? por 🍯${ForNu(params.Precio)} `);
    if (confirmacion) {
        Miel -= params.Precio;
        params.Precio = Math.round(params.Inflacion * params.Precio);
        MochilaZona("llave");
        InfromacionItenm2("Campo")
        return true;

    }else{
        return false;
    }
}