import { useEffect, useState } from "react"


export default function Formulario(){
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [claseFormulario, setClaseFormulario] = useState(null);
    useEffect(() => {
        const claseGuardada = localStorage.getItem("claseFormulario");
        
        if (claseGuardada) {
            const clase = JSON.parse(claseGuardada);
            setClaseFormulario(clase);
            console.log("Clase recibida:", clase);
        }
    }, [])
    const [enviado, setEnviado] = useState(false);
    const [telefono, setTelefono] = useState("");
    const [telefonoApoderado, setTelefonoApoderado] = useState("");
    const clase= {
        nombre: "",
        sede: "",
        profesor: "",
        dias: "",
        horario: "",
    }

    const hoy = new Date().toISOString().split("T")[0];

    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 100);

    const fechaMinimaFormato = fechaMinima.toISOString().split("T")[0];
    
    const calcularEdad = () => {
        if (!fechaNacimiento) return 0;
        
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        
        let edad = hoy.getFullYear() - nacimiento.getFullYear();

        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (
            mes < 0 ||
            (mes === 0 && hoy.getDate() < nacimiento.getDate())
        ){
            edad--;   
        }

        return edad;
    };

        const edad = calcularEdad();

        const esMenor = fechaNacimiento !== "" && edad < 18;

    return (
       <form 
        onSubmit={(e) => {
            e.preventDefault();

            const datos = new FormData(e.currentTarget);

            const formulario = Object.fromEntries(datos);

            console.log(formulario);

            e.currentTarget.reset();
            setFechaNacimiento("");
            setTelefono("");
            setTelefonoApoderado("");
            setEnviado(true);
        }}

        onChange={() => setEnviado(false)}
        className="max-w-xl max-auto p-6 mt-10 bg-white rounded-xl shadow-md">

        <h1 className="text-3xl font-bold mb-6">
            Formulario de clases de prueba
        </h1>

        {claseFormulario && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                    Clase y horario asignado
                </h2>

                <p><strong>Clase:</strong> {claseFormulario.nombre}</p>
                <p><strong>Sede:</strong> {claseFormulario.sede}</p>
                <p><strong>Profesor:</strong> {claseFormulario.profesor}</p>
                <p>
                    <strong>Días:</strong> {claseFormulario.frecuencia.join(" ")}
                </p>
                <p>
                    <strong>Horario:</strong> {claseFormulario.horaInicio} - {claseFormulario.horaFin}
                </p>
            </div>
        )}

        <div className="mb-4">
         <label className="block">
            Nombre
            <input type="text" 
             name="nombre"
             required
             className="w-full border rounded-md p-2 mt-1"
            />
         </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Apellido
            <input type="text" 
             name="apellido"
             required
             className="w-full border rounded-md p-2 mt-1"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Correo Electrónico
            <input type="email"
             name="correo"
             required 
             className="w-full border rounded-md p-2 mt-1"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block">
            Teléfono
            <input type="tel" 
             required
             name="telefono"
             pattern="[0-9]{9}"
             value={telefono}
             onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))}
             className="w-full border rounded-md p-2 mt-1"
            />
          </label>
        </div>

        <div>
            <div className="mb-4">
                <label className="block">
                Fecha de nacimiento
                <input 
                    type="date"
                    name="fechaNacimiento" 
                    required
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    min={fechaMinimaFormato}
                    max={hoy}
                    className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2"
                />
            </label>

                <p className="mt-6">
                    Edad: {fechaNacimiento ? `${edad} años` : " "}
                </p>
            </div>
        </div>

        {esMenor && (
            <div>
                <h2 className="text-pl font-semibold mt-10 mb-4">
                    Datos del apoderado
                    </h2>

                <div className="mb-4">
                    <label className="block">
                        Nombre del apoderado
                        <input type="text"
                         name="nombreApoderado"
                         required
                         className="w-full border rounded-md p-2 mt-1" 
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block">
                        Apellido del apoderado
                        <input type="text"
                         name="apellidoApoderado"
                         required
                         className="w-full border rounded-md p-2 mt-1" 
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block">
                        Correo del apoderado
                        <input type="email"
                         name="correoApoderado"
                         required
                         className="w-full border rounded-md p-2 mt-1" 
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block">
                        Teléfono del apoderado
                        <input type="tel"
                         name="telefonoApoderado"  
                         required
                         pattern="[0-9]{9}"
                         value={telefonoApoderado}
                         onChange={(e) =>
                            setTelefonoApoderado(e.target.value.replace(/\D/g, "").slice(0, 9))
                         }
                         className="w-full border rounded-md p-2 mt-1" 
                        />
                    </label>
                </div>              
            </div>
        )}

        <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md mt-6 cursor-pointer"
                >
                    Enviar
                </button>

                {enviado && (
                    <p className="mt-4 text-green-600">
                        Formulario enviado correctamente.
                    </p>
                )}
        </form>
       
    )
}