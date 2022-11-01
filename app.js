import colors from 'colors';
import { guardarDB , leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu,
          pausa,
          leerInput,
          listadoTareasBorrar,
          confirmar,
          mostrarListadoCheckList} from './helpers/inquirer.js';
import { Tareas  } from "./models/tareas.js";
import { Tarea } from "./models/tarea.js";
 
 
const main = async () => {
  let opt = '';

  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) { //Cargar tareas
    tareas.cargarTareasFromArray( tareasDB );
  }

  do {

    opt = await inquirerMenu(); //Esta funcion imprime el menu principal

    switch (opt) {
        case '1':
             //Creacion de tarea
             const desc = await leerInput('Descripcion: ');
             tareas.crearTarea( desc );
        break;

        case '2': //Muestra todas las tareas completadas y pendientes.
            tareas.listadoCompleto();

        break;

        case '3': //Listar tareas completadas
            tareas.listarPendientesCompletadas(true);
        break;

        case '4': //Listar Pendientes
            tareas.listarPendientesCompletadas(false);
        break;

        case '5': //Completado o pendiente
           const ids = await mostrarListadoCheckList( tareas.listadoArr);
           tareas.toggleCompletadas(ids);
        break;

        case '6': //Borrar tarea
            const id = await listadoTareasBorrar( tareas.listadoArr );
            if (id !== '0') {
              const ok = await confirmar('Estas seguro?');   //TODO: Preguntar si esta seguro.
              if ( ok ) {
                tareas.borrarTarea( id );
                console.log('Tarea borrada');
              }
            }
        break;
    }

    guardarDB( tareas.listadoArr);


    await pausa(); 

  } while (opt !== '0'); // El menu principal se repite hasta que seleccionemos '0'
};
 
main();