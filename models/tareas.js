/*
    _listado:
        { 'uuid-123712-123123-2: { id:12, desc:asd, completadoEN:92231} },
*/
import colors from 'colors';
import { Tarea } from "./tarea.js";

class Tareas{

    //Propiedad llamada listado
    _listado = { };


    //Uso de un get para retornar un nuevo arreglo
    get listadoArr() {

        //Se define el arreglo
        const listado = [];

        //Object.keys se encarga de llenar el arreglo "listado". Este metodo devuelve un array de las propiedades names de un objeto
        //Se utiliza un forEach para barrer cada strings
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];  //Se extrae la tarea que ya esta instanciada en "tarea"
            listado.push(tarea); //Se ingresa la tarea al listado
        })

        return listado; //Retorna el listado (array)
    }


    constructor(){
        this._listado = {};
    }

    borrarTarea( id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
    
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '') {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto( ){
        console.log('\n');
        this.listadoArr.forEach( (tarea , i) => {
            const idx = `${i +1}`.green;
            // console.log( colors.green(idx), this.listadoArr[i].desc);

            const {desc, completadoEn } = tarea;

            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);

        });
        console.log('\n');
    }

    listarPendientesCompletadas( completadas = true ){
        console.log();
        let contador = 0;
        this.listadoArr.forEach( (tarea) => {

            const {desc, completadoEn } = tarea;

            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            
            if (completadas) {
                //Mostrar completadas
                if(completadoEn){
                    contador = contador + 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${completadoEn.green}`);
                }
            } else{
                if (!completadoEn) {
                    contador = contador + 1;
                    console.log(`${contador.toString().red}. ${desc} :: ${estado}`);
                }
            }

        });
        console.log('\n');
    }


    toggleCompletadas( ids  = []){

        ids.forEach( id => {
            
            const tarea = this._listado[id];
            if ( !tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}
export { Tareas };