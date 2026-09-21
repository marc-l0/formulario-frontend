import { useEffect, useState } from "react";
import { Calendar, Badge, Modal, List, Button } from "antd";
import dayjs from "dayjs";

export default function Calendario({}) {
  const [clases, setClases] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  useEffect(() => {
    const cargarClase = () => {
        const clasesGuardadas = localStorage.getItem("claseCreada");
        if (clasesGuardadas) {
            const clases = JSON.parse(clasesGuardadas);
            const clasesConId = (Array.isArray(clases) ? clases : [clases]).map(
              (clase, index) => ({
                ...clase,
                id: clase.id || Date.now() + index
              })
            );
            console.log("Clases recuperadas:", clasesConId);
            setClases(clasesConId);
        }
    };
    cargarClase();
    window.addEventListener("claseCreada", cargarClase);
    return () => {
        window.removeEventListener("claseCreada", cargarClase);
    };
  }, []);

  const generarFechas = (clase) => {
    const fechas = [];
    const hoy = dayjs();

    const diasSemana = {
      Domingo: 0,
      Lunes: 1,
      Martes: 2,
      Miércoles: 3,
      Jueves: 4,
      Viernes: 5,
      Sábado: 6,
    };

    for (let i = 0; i < 28; i++) {
      const fecha = hoy.add(i, "day");

      const diaSemana = fecha.day();

      const diasSeleccionados = clase.frecuencia.map(
        (dia) => diasSemana[dia]
      );

      if (diasSeleccionados.includes(diaSemana)) {
        fechas.push({
          ...clase,
          fecha: fecha.format("YYYY-MM-DD"),
        });
      }
    }

    return fechas;
  };

  const clasesGeneradas = clases.flatMap((clase) =>
    generarFechas(clase)
  );

  const clasesPorFecha = clasesGeneradas.reduce((acc, clase) => {
    if (!acc[clase.fecha]) acc[clase.fecha] = [];
    acc[clase.fecha].push(clase);
    return acc;
  }, {});

  const obtenerClasesDelDia = (value) => {
    const key = value.format("YYYY-MM-DD");
    return clasesPorFecha[key] || [];
  };

  const cellRender = (value, info) => {
    if (info.type !== "date") return info.originNode;

    const clasesDelDia = obtenerClasesDelDia(value);

    if (clasesDelDia.length === 0) return info.originNode;

    return (
      <div className="events">
        <Badge
        status="success"
        text={
          clasesDelDia.length === 1
            ? "1 clase activa"
            : clasesDelDia.length + " clases activas"
        }
        />
      </div>
    );
  };

  const eliminarClase = (id) => {
    const clasesActualizadas = clases.filter(
      (clase) => clase.id !== id
    );
    setClases(clasesActualizadas);
    localStorage.setItem(
      "claseCreada", JSON.stringify(clasesActualizadas)
    );
    setClaseSeleccionada(null);
  }

  const onSelect = (value) => {
    const clasesDelDia = obtenerClasesDelDia(value);
    setFechaSeleccionada(value);
    setClaseSeleccionada(null);
    if (clasesDelDia.length > 0) {
      setModalVisible(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Calendario de clases</h1>

      <Calendar cellRender={cellRender} onSelect={onSelect} />

      <Modal
        title={
          fechaSeleccionada
            ? `Clases del ${fechaSeleccionada.format("DD/MM/YYYY")}`
            : "Clases"
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <List
          dataSource={
            fechaSeleccionada ? obtenerClasesDelDia(fechaSeleccionada) : []
          }
          renderItem={(clase) => (
            <List.Item
                onClick={() => {
                  setClaseSeleccionada(clase);
                  console.log("Clase Seleccionada:", clase);
                }}
                style={{ cursor: "pointer" }}
                actions={[
                  <button className="cursor-pointer"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarClase(clase.id);
                      }}
                      title="Eliminar clase"
                  >
                    🗑️
                  </button>
                ]}
              >
              <List.Item.Meta
                title={clase.nombre}
                description={clase.horaInicio + " - " + clase.horaFin + " . " + clase.sede + " . " + clase.profesor}
              />
            </List.Item>
          )}
        />
        {claseSeleccionada && (
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(
                "claseFormulario",
                JSON.stringify(claseSeleccionada)
              );

              console.log("Formulario generado para:", claseSeleccionada);
              window.location.href = "/formulario";
            }}
            className="mt-4 w-full bg-blue-600  text-white py-2 rounded-md cursor-pointer"
          >
            Generar formulario
          </button>
        )}
      </Modal>
    </div>
  );
}
