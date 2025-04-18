let MochilaEsta = {
    Espacio: 0,
    ConvercionMas: 0
} 


function ActulizarMochila() {
    for (const key in MochilaUsuarios) {
        const Mochila = MochilaUsuarios[key];
        if(Mochila.Equipado){
            MochilaEsta.Espacio = Mochila.ESTA.Espacio;
            MochilaEsta.ConvercionMas = Mochila.ESTA.ConvercionMas || 0;
            return
        }
    }
}