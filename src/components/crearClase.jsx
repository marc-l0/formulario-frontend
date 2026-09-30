import { useEffect, useState } from "react";

export default function crearClase() {
    const [nivel, setNivel] = useState("");
    const [sede, setSede] = useState("");
    const [frecuencia, setFrecuencia] = useState([]);
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [profesor, setProfesor] = useState("");
    const [tarifa, setTarifa] = useState("");
    const [cupos, setCupos] = useState("");

    const [fechaInicio, setFechaInicio] = useState("");
    const [duracion, setDuracion] = useState("");

    const [profesores, setProfesores] = useState([]);

    const obtenerFechaHoy = () => {
        const hoy = new Date();

        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        return año + "-" + mes + "-" + dia;
    };

    const seleccionarDia = (dia) => {
        if (frecuencia.includes(dia)) {
            setFrecuencia(
                frecuencia.filter(
                    (item) => item !== dia
                )
            );
        } else {
            setFrecuencia([
                ...frecuencia,
                dia,
            ]);
        }
    };

    useEffect(() => {

        const cargarProfesores = async () => {

            try {

                const respuesta = await fetch(
                    "http://127.0.0.1:3000/profesores"
                );

                if (!respuesta.ok) {
                    throw new Error(
                        "No se pudieron cargar los profesores"
                    );
                }

                const datos =
                    await respuesta.json();

                const profesoresActivos =
                    datos.filter(
                        (item) =>
                            item.estado === "activo"
                    );

                setProfesores(
                    profesoresActivos
                );

            } catch (error) {

                console.error(
                    "Error al cargar profesores:",
                    error
                );

            }
        };

        cargarProfesores();

    }, []);

    const crearClase = async () => {

        if (
            !nivel ||
            !sede ||
            frecuencia.length === 0 ||
            !horaInicio ||
            !horaFin ||
            !profesor ||
            !tarifa ||
            !cupos ||
            !fechaInicio ||
            !duracion
        ) {

            alert(
                "Por favor rellene todos los campos"
            );

            return;
        }

        const nuevaClase = {

            nivel,

            sede,

            frecuencia,

            horaInicio,

            horaFin,

            profesor,

            tarifa: Number(tarifa),

            cupos: Number(cupos),

            fechaInicio,

            duracion,
        };

        try {

            const respuesta = await fetch(
                "http://127.0.0.1:3000/clases",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(
                        nuevaClase
                    ),
                }
            );

            if (!respuesta.ok) {
                throw new Error(
                    "No se pudo crear la clase"
                );
            }

            const resultado =
                await respuesta.json();

            console.log(
                "Clase creada:",
                resultado
            );

            alert(
                "Clase creada correctamente"
            );

            setNivel("");
            setSede("");
            setFrecuencia([]);
            setHoraInicio("");
            setHoraFin("");
            setProfesor("");
            setTarifa("");
            setCupos("");
            setFechaInicio("");
            setDuracion("");

        } catch (error) {

            console.error(
                "Error al crear la clase:",
                error
            );

            alert(
                "No se pudo crear la clase"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] text-gray-800">

            <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">

                <h1 className="text-sm font-bold text-gray-900">
                    Ventas y Matrículas
                </h1>

                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500"
                    >
                        ♧

                        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[7px] font-bold text-white">
                            3
                        </span>

                    </button>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                        AC
                    </div>

                </div>

            </header>

            <main className="space-y-4 px-4 pb-24 pt-4">

                <section className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">

                    <div className="mb-3 flex items-center justify-between">

                        <div>

                            <p className="text-[10px] font-semibold text-gray-400">
                                CLASE ACTUAL
                            </p>

                            <h2 className="mt-1 text-xs font-bold text-gray-800">
                                {nivel
                                    ? "Karate · " + nivel
                                    : "Básico · Callao"}
                            </h2>

                        </div>

                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-[8px] font-semibold text-green-600">
                            Libre
                        </span>

                    </div>

                    <div className="rounded-xl bg-gray-50 px-3 py-2">

                        <div className="flex items-center justify-between">

                            <span className="text-[9px] text-gray-500">
                                👤 Miguel Torres
                            </span>

                            <button
                                type="button"
                                className="text-[8px] font-semibold text-red-500"
                            >
                                Liberar cupo
                            </button>

                        </div>

                    </div>

                    <div className="mt-3 flex items-center justify-between">

                        <div>

                            <p className="text-[11px] font-semibold text-gray-800">
                                {nivel || "Básico"} · {sede || "Callao"}
                            </p>

                            <p className="mt-0.5 text-[8px] text-gray-400">

                                {frecuencia.length > 0
                                    ? frecuencia.join(" y ")
                                    : "Lun y Mié"}

                                {" · "}

                                {horaInicio
                                    ? horaInicio
                                    : "5:00 PM"}

                                {" – "}

                                {horaFin
                                    ? horaFin
                                    : "6:30 PM"}

                            </p>

                        </div>

                        <button
                            type="button"
                            className="rounded-full border border-dashed border-gray-300 px-3 py-1.5 text-[8px] font-medium text-gray-400"
                        >
                            + Asignar profesor
                        </button>

                    </div>

                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">

                    <h2 className="text-[11px] font-bold text-gray-900">
                        Configurar siguiente período
                    </h2>

                    <div className="mt-4">

                        <p className="mb-2 text-[8px] font-medium tracking-wide text-gray-500">
                            VIGENCIA DE LA CLASE
                        </p>

                        <div className="grid grid-cols-2 gap-2">

                            <div>

                                <p className="mb-1 text-[7px] text-gray-400">
                                    FECHA DE INICIO
                                </p>

                                <input
                                    type="date"
                                    value={fechaInicio}
                                    onChange={(e) =>
                                        setFechaInicio(
                                            e.target.value
                                        )
                                    }
                                    min={obtenerFechaHoy()}
                                    className="block h-9 w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-3 text-[9px] text-gray-700 outline-none focus:border-blue-500"
                                />

                            </div>

                            <div>

                                <p className="mb-1 text-[7px] text-gray-400">
                                    DURACIÓN
                                </p>

                                <select
                                    value={duracion}
                                    onChange={(e) =>
                                        setDuracion(
                                            e.target.value
                                        )
                                    }
                                    className="block h-9 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-[9px] text-gray-700 outline-none focus:border-blue-500"
                                >

                                    <option value="">
                                        Seleccionar
                                    </option>

                                    <option value="1 semana">
                                        1 semana
                                    </option>

                                    <option value="2 semanas">
                                        2 semanas
                                    </option>

                                    <option value="3 semanas">
                                        3 semanas
                                    </option>

                                    <option value="1 mes">
                                        1 mes
                                    </option>

                                </select>

                            </div>

                        </div>

                        <p className="mt-2 text-[7px] leading-4 text-gray-400">
                            La fecha de finalización se calculará automáticamente.
                        </p>

                    </div>

                    <div className="mt-4">

                        <p className="mb-2 text-[8px] font-medium tracking-wide text-gray-500">
                            SEDE
                        </p>

                        <div className="grid grid-cols-3 gap-2">

                            {[
                                "Callao",
                                "San Miguel",
                                "Ventanilla"
                            ].map(
                                (item) => (

                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() =>
                                            setSede(item)
                                        }
                                        className={
                                            "h-8 rounded-full border text-[8px] transition " +
                                            (
                                                sede === item
                                                    ? "border-blue-500 bg-blue-50 font-semibold text-blue-600"
                                                    : "border-gray-200 bg-white text-gray-500"
                                            )
                                        }
                                    >
                                        {item}
                                    </button>

                                )
                            )}

                        </div>

                    </div>

                    <div className="mt-4">

                        <p className="mb-2 text-[8px] font-medium tracking-wide text-gray-500">
                            NIVEL
                        </p>

                        <div className="grid grid-cols-3 gap-2">

                            {[
                                "Básico",
                                "Intermedio",
                                "Avanzado"
                            ].map(
                                (item) => (

                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() =>
                                            setNivel(item)
                                        }
                                        className={
                                            "h-8 rounded-full border text-[8px] transition " +
                                            (
                                                nivel === item
                                                    ? "border-blue-500 bg-blue-50 font-semibold text-blue-600"
                                                    : "border-gray-200 bg-white text-gray-500"
                                            )
                                        }
                                    >
                                        {item}
                                    </button>

                                )
                            )}

                        </div>

                    </div>

                    <div className="mt-4">

                        <p className="mb-2 text-[8px] font-medium tracking-wide text-gray-500">
                            HORARIO
                        </p>

                        <div className="grid grid-cols-2 gap-2">

                            <div className="min-w-0">

                                <p className="mb-1 text-[7px] text-gray-400">
                                    HORA DE INICIO
                                </p>

                                <input
                                    type="time"
                                    value={horaInicio}
                                    onChange={(e) =>
                                        setHoraInicio(
                                            e.target.value
                                        )
                                    }
                                    className="block h-9 w-full min-w-0 appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 text-[9px] text-gray-700 outline-none focus:border-blue-500"
                                />

                            </div>

                            <div className="min-w-0">

                                <p className="mb-1 text-[7px] text-gray-400">
                                    HORA DE FIN
                                </p>

                                <input
                                    type="time"
                                    value={horaFin}
                                    onChange={(e) =>
                                        setHoraFin(
                                            e.target.value
                                        )
                                    }
                                    className="block h-9 w-full min-w-0 appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 text-[9px] text-gray-700 outline-none focus:border-blue-500"
                                />

                            </div>

                        </div>

                    </div>

                    <div className="mt-4">

                        <p className="mb-2 text-[8px] font-medium tracking-wide text-gray-500">
                            DÍAS
                        </p>

                        <div className="grid grid-cols-7 gap-1.5">

                            {[
                                ["Lunes", "L"],
                                ["Martes", "M"],
                                ["Miércoles", "X"],
                                ["Jueves", "J"],
                                ["Viernes", "V"],
                                ["Sábado", "S"],
                                ["Domingo", "D"]
                            ].map(
                                ([dia, abreviatura]) => (

                                    <button
                                        key={dia}
                                        type="button"
                                        onClick={() =>
                                            seleccionarDia(
                                                dia
                                            )
                                        }
                                        className={
                                            "h-8 rounded-full border text-[8px] font-semibold transition " +
                                            (
                                                frecuencia.includes(
                                                    dia
                                                )
                                                    ? "border-blue-500 bg-blue-50 text-blue-600"
                                                    : "border-gray-200 bg-white text-gray-400"
                                            )
                                        }
                                    >
                                        {abreviatura}
                                    </button>

                                )
                            )}

                        </div>

                    </div>

                    <div className="mt-4">

                        <p className="mb-2 text-[8px] font-medium tracking-wide text-gray-500">
                            PROFESOR DISPONIBLE
                        </p>

                        <select
                            value={profesor}
                            onChange={(e) =>
                                setProfesor(
                                    e.target.value
                                )
                            }
                            className="h-9 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-[9px] text-gray-700 outline-none"
                        >

                            <option value="">
                                Seleccionar profesor
                            </option>

                            {profesores.map(
                                (item) => (

                                    <option
                                        key={item.id}
                                        value={item.nombre}
                                    >
                                        {item.nombre}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    <div className="mt-4">

                        <p className="mb-2 text-[8px] font-medium tracking-wide text-gray-500">
                            TARIFA MENSUAL
                        </p>

                        <div className="grid grid-cols-3 gap-2">

                            {[
                                "150",
                                "300",
                                "450"
                            ].map(
                                (precio) => (

                                    <button
                                        key={precio}
                                        type="button"
                                        onClick={() =>
                                            setTarifa(
                                                precio
                                            )
                                        }
                                        className={
                                            "h-8 rounded-full border text-[9px] font-semibold " +
                                            (
                                                tarifa === precio
                                                    ? "border-blue-500 bg-blue-50 text-blue-600"
                                                    : "border-gray-200 text-gray-500"
                                            )
                                        }
                                    >
                                        S/ {precio}
                                    </button>

                                )
                            )}

                        </div>

                    </div>

                    <div className="mt-4">

                        <p className="mb-2 text-[8px] font-medium tracking-wide text-gray-500">
                            CUPOS DISPONIBLES
                        </p>

                        <input
                            type="number"
                            min="1"
                            value={cupos}
                            onChange={(e) =>
                                setCupos(
                                    e.target.value
                                )
                            }
                            placeholder="Ej. 10"
                            className="h-9 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-[9px] text-gray-700 outline-none focus:border-blue-500"
                        />

                    </div>

                    <button
                        type="button"
                        onClick={crearClase}
                        className="mt-5 h-9 w-full rounded-xl bg-blue-500 text-[9px] font-semibold text-white shadow-sm transition hover:bg-blue-600"
                    >
                        Aceptar y publicar ciclo
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            window.location.href =
                                "/calendario";
                        }}
                        className="mt-2 h-9 w-full rounded-xl border border-gray-200 bg-white text-[9px] font-semibold text-gray-600"
                    >
                        Ver calendario
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            window.location.href =
                                "/profesores";
                        }}
                        className="mt-2 h-9 w-full rounded-xl border border-gray-200 bg-white text-[9px] font-semibold text-gray-600"
                    >
                        Gestionar profesores
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            window.location.href =
                                "/clases";
                        }}
                        className="mt-2 h-9 w-full rounded-xl border border-gray-200 bg-white text-[9px] font-semibold text-gray-600"
                    >
                        Gestionar clases
                    </button>

                </section>

            </main>

            <nav className="fixed bottom-0 left-0 right-0 mx-auto flex h-14 max-w-82.5 items-center justify-around border-t border-gray-200 bg-white">

                <button
                    type="button"
                    className="flex flex-col items-center gap-1 text-blue-500"
                >
                    <span className="text-sm">
                        ⌂
                    </span>

                    <span className="text-[7px]">
                        Inicio
                    </span>
                </button>

                <button
                    type="button"
                    className="flex flex-col items-center gap-1 text-gray-400"
                >
                    <span className="text-sm">
                        ♧
                    </span>

                    <span className="text-[7px]">
                        Familias
                    </span>
                </button>

                <button
                    type="button"
                    className="flex flex-col items-center gap-1 text-gray-400"
                >
                    <span className="text-sm">
                        ▤
                    </span>

                    <span className="text-[7px]">
                        Sedes
                    </span>
                </button>

                <button
                    type="button"
                    className="flex flex-col items-center gap-1 text-gray-400"
                >
                    <span className="text-sm">
                        ▱
                    </span>

                    <span className="text-[7px]">
                        Atención
                    </span>
                </button>

                <button
                    type="button"
                    className="flex flex-col items-center gap-1 text-gray-400"
                >
                    <span className="text-sm">
                        ⚙
                    </span>

                    <span className="text-[7px]">
                        Ajustes
                    </span>
                </button>

            </nav>

        </div>
    );
}