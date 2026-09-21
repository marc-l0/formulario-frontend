import { useState } from "react";

export default function crearClase() {
    //Estados para almacenar los datos ingresados.
    const [nivel, setNivel] = useState("");
    const [sede, setSede] = useState("");
    const [frecuencia, setFrecuencia] = useState([]);
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [profesor, setProfesor] = useState("");
    const [tarifa, setTarifa] = useState("");

    /*
    Verificar que los datos estén completos
    antes de permitir que se cree la clase.
    */

    const crearClase = () => {
        if (
            !nivel ||
            !sede ||
            frecuencia.length === 0 ||
            !horaInicio ||
            !horaFin ||
            !profesor ||
            !tarifa
        ) {
            alert("Por favor rellene todos los campos");
            return;
        }

    //Mostrando datos en consola temporalmente.
    //PENDIENTE: Conectar con calendario.

        console.log({
            nivel,
            sede,
            frecuencia,
            horaInicio,
            horaFin,
            profesor,
            tarifa
        });

        const nuevaClase = {
            id: Date.now(),
            nombre: 'Karate ' + nivel,
            nivel,
            sede,
            frecuencia,
            horaInicio,
            horaFin,
            profesor,
            tarifa
        };

        const clasesGuardadas = JSON.parse(
            localStorage.getItem("claseCreada") || "[]"
        );
        clasesGuardadas.push(nuevaClase);
        localStorage.setItem(
            "claseCreada",
            JSON.stringify(clasesGuardadas)
        );
        window.dispatchEvent(new Event("claseCreada"));
    };

    return (
        <div>
            <h1>Pantalla Crear Clase</h1>

            <label>
                Nivel: 

                <select
                    value={nivel}
                    onChange={(e) => setNivel(e.target.value)}>
                    
                    <option value="">Seleccionar nivel</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                </select>
            </label>

            <label>
                Sede: 

                <select
                    value={sede}
                    onChange={(e) => setSede(e.target.value)}>
                    
                    <option value="">Seleccionar Sede</option>
                    <option value="Callao">Callao</option>
                    <option value="San Miguel">San Miguel</option>
                    <option value="Ventanilla">Ventanilla</option>
                </select>
            </label>

            <div>
                <p>Frecuencia:</p>

                <label>
                    <input 
                        type="checkbox" 
                        value="Lunes" 
                        onChange={(e) => {
                            if (e.target.checked) {
                                setFrecuencia([...frecuencia, e.target.value]);
                            } else {
                                setFrecuencia(
                                    frecuencia.filter((dia) => dia !== e.target.value)
                                );
                            }
                        } }
                    />
                    Lunes
                </label>

                <label>
                    <input 
                        type="checkbox" 
                        value="Miércoles" 
                        onChange={(e) => {
                            if (e.target.checked) {
                                setFrecuencia([...frecuencia, e.target.value]);
                            } else {
                                setFrecuencia(
                                    frecuencia.filter((dia) => dia !== e.target.value)
                                );
                            }
                        } }
                    />
                    Miércoles
                </label>

                <label>
                    <input 
                        type="checkbox" 
                        value="Viernes" 
                        onChange={(e) => {
                            if (e.target.checked) {
                                setFrecuencia([...frecuencia, e.target.value]);
                            } else {
                                setFrecuencia(
                                    frecuencia.filter((dia) => dia !== e.target.value)
                                );
                            }
                        } }
                    />
                    Viernes
                </label>
            </div>

            <p>
                Días Seleccionados: {frecuencia.join(", ")}
            </p>

            <div>
                <p>Horario:</p>

                <input 
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)} 
                />

                <input 
                    type="time"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)} 
                />
            </div>

            <label>
                Profesor: 

                <select
                    value={profesor}
                    onChange={(e) => setProfesor(e.target.value)}>
                    
                    <option value="">Seleccionar profesor</option>
                    <option value="Profesor 1">Profesor 1</option>
                    <option value="Profesor 2">Profesor 2</option>
                    <option value="Profesor 3">Profesor 3</option>
                </select>
            </label>

            <label>
                Tarifa Mensual:

                <select 
                    value={tarifa}
                    onChange={(e) => setTarifa(e.target.value)}
                >
                    <option value="">Seleccionar Tarifa</option>
                    <option value="150">S/. 150</option>
                    <option value="300">S/. 300</option>
                    <option value="450">S/. 450</option>
                </select>
            </label>

            <button type="button" onClick={crearClase}>
                Crear clase
            </button>
            
        </div>
    )
}