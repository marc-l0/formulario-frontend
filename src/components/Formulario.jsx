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
       <>
        {!enviado ? (
        <form 
        onSubmit={(e) => {        
            e.preventDefault();

            const datos = new FormData(e.currentTarget);

            const formulario = Object.fromEntries(datos);

            console.log(formulario);

            const postulacionesGuardadas =
                JSON.parse(localStorage.getItem("Postulaciones")) || [];
            
            postulacionesGuardadas.push(formulario);

            localStorage.setItem(
                "postulaciones",
                JSON.stringify(postulacionesGuardadas)
            );

            e.currentTarget.reset();
            setFechaNacimiento("");
            setTelefono("");
            setTelefonoApoderado("");
            setEnviado(true);
        }}

        onChange={() => setEnviado(false)}
        className="max-w-xl mx-auto min-h-screen bg-[#f3edf9] px-4 pb-6 mt-10 rounded-xl shadow-md">

        <div className="-mx-4 mb-4 bg-[#673ab7] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"
                >
                    ❮
                </button>

                <h1 className="text-base font-semibold">
                    Vista previa del formulario
                </h1>
            </div>
        </div>

        <div className="mb-5 h-2 w-full rounded-full bg-white">
            <div className="h-2 w-full rounded-full bg-[#673ab7]"></div>
        </div>

        {claseFormulario && (
            <div className="mb-5 rounded-xl bg-white p-4">
                <div className="mb-4 flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-[#673ab7]"></span>

                    <h2 className="text-sm font-bold text-gray-800">
                        Clase y horario asignado
                    </h2>
                </div>

            <div className="rounded-2xl bg-[#f3dff7] p-4">
                <p className="text-sm font-bold text-[#542078]">
                    {claseFormulario.nombre} — Sede {claseFormulario.sede}
                </p>

                <p className="mt-1 text-xs text-[#7b4b8f]">
                    Prof. {claseFormulario.profesor}
                </p>

                <p className="mt-1 text-xs text-[#7b4b8f]">
                    📅 {claseFormulario.frecuencia.join(" y ")}
                </p>
            </div>

            <div className="mt-3 rounded-2xl bg-[#f1f5f9] p-3">
                <p className="text-xs text-gray-600">
                    🔒 Horario: {claseFormulario.horaInicio} -{" "}
                    {claseFormulario.horaFin}
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                    Vacantes estrictamente limitadas
                </p>
            </div>
        </div>
    )}

            <div className="mb-5 rounded-xl bg-white p-4">
                <div className="mb-4 flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-[#673ab7]"></span>

                    <h2 className="text-sm font-bold text-gray-800">
                        Datos del postulante
                    </h2>
                </div>

            <div className="mb-4">
                <label className="block text-xs font-medium text-[#673ab7]">
                    Nombres y Apellidos completos *
                    <input
                        type="text"
                        name="nombre"
                        required
                        placeholder="Ej. Mateo Javier Morales"
                        className="mt-1 w-full rounded-lg border-0 bg-[#f8f6fc] p-3 text-sm outline-none focus:ring-2 focus:ring-[#673ab7]/30"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-xs font-medium text-[#673ab7]">
                    Número de WhatsApp *
                    <input
                        type="tel"
                        required
                        name="telefono"
                        pattern="[0-9]{9}"
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(e.target.value.replace(/\D/g, "").slice(0, 9))
                        }
                        placeholder="Ej. 999 888 111"
                        className="mt-1 w-full rounded-lg border-0 bg-[#f8f6fc] p-3 text-sm outline-none focus:ring-2 focus:ring-[#673ab7]/30"
                    />
                </label>
            </div>

            <div>
                <label className="block text-xs font-medium text-[#673ab7]">
                    Correo electrónico *
                    <input
                        type="email"
                        name="correo"
                        required
                        placeholder="correo@ejemplo.com"
                        className="mt-1 w-full rounded-lg border-0 bg-[#f8f6fc] p-3 text-sm outline-none focus:ring-2 focus:ring-[#673ab7]/30"
                    />
                </label>
            </div>
        </div>

        <div className="mb-5 rounded-xl bg-white p-4">
            <div className="mb-4 flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-[#673ab7]"></span>

                    <h2 className="text-sm font-bold text-gray-800">
                        Fecha de nacimiento
                    </h2>
                </div>

            <label className="block text-xs font-medium text-[#673ab7]">
                Fecha de nacimiento *
                <input
                    type="date"
                    name="fechaNacimiento"
                    required
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    min={fechaMinimaFormato}
                    max={hoy}
                    className="mt-1 w-full rounded-lg border-0 bg-[#f8f6fc] p-3 text-sm outline-none focus:ring-2 focus:ring-[#673ab7]/30"
                />
            </label>

            <p className="mt-3 text-sm text-gray-500">
                Edad: {fechaNacimiento ? edad + " años" : ""}
            </p>
        </div>

        {esMenor && (
            <div className="mb-5 rounded-xl bg-white p-4">
                <div className="mb-4 flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-[#673ab7]"></span>

                    <h2 className="text-sm font-bold text-gray-800">
                        Datos del apoderado
                    </h2>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium text-[#673ab7]">
                        Nombre completo del apoderado *
                        <input
                            type="text"
                            name="nombreCompletoApoderado"
                            required
                            placeholder="Ej. Juan Carlos Morales"
                            className="mt-1 w-full rounded-lg border-0 bg-[#f8f6fc] p-3 text-sm outline-none focus:ring-2 focus:ring-[#673ab7]/30"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium text-[#673ab7]">
                        Correo del apoderado *
                        <input
                            type="email"
                            name="correoApoderado"
                            required
                            placeholder="Ej. correo@ejemplo.com"
                            className="mt-1 w-full rounded-lg border-0 bg-[#f8f6fc] p-3 text-sm outline-none focus:ring-2 focus:ring-[#673ab7]/30"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-xs font-medium text-[#673ab7]">
                        Teléfono del apoderado *
                        <input
                            type="tel"
                            name="telefonoApoderado"
                            required
                            placeholder="Ej. 999 888 111"
                            pattern="[0-9]{9}"
                            value={telefonoApoderado}
                            onChange={(e) =>
                                setTelefonoApoderado(
                                    e.target.value.replace(/\D/g, "").slice(0, 9)
                                )
                            }
                            className="mt-1 w-full rounded-lg border-0 bg-[#f8f6fc] p-3 text-sm outline-none focus:ring-2 focus:ring-[#673ab7]/30"
                        />
                    </label>
                </div>
            </div>
        )}

        <button
            type="submit"
            className="w-full rounded-xl bg-[#673ab7] py-3 text-sm font-semibold text-white shadow-sm cursor-pointer transition hover:bg-[#5b2fa8] active:scale-[0.98]"
        >
            Enviar postulación
        </button>

        </form>
        ) : (
            <div className="min-h-screen bg-[#f3edf9] px-4 pb-6">
                <div className="-mx-4 mb-6 bg-[#673ab7] px-5 py-4 text-white">
                    <h1 className="text-base font-semibold">
                        Postulación enviada
                    </h1>
                </div>

                <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-center shadow-sm">
                    <div className="mb-4 text-5xl">
                        ✅
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800">
                        ¡Postulación enviada!
                    </h2>

                    <p className="mt-3 text-sm text-gray-600">
                        Gracias por completar el formulario.
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                        Recuerda tomar una captura de esta pantalla y
                        presentarla el día de tu clase.
                    </p>
                </div>
            </div>

                    )}
            </>      
    )
}