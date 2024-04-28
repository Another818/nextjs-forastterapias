import axios from "axios";

async function loadRegistros(){
  const { data } = await axios.get('http://localhost:3000/api/registros');
  return data;
}

async function registrosPage() {
  const registros = await loadRegistros();

  return (
    <div className="px-44">
      <h1 className="text-3xl font-bold text-center my-10">Registros</h1>

      <div className="grid grid-cols-3 gap-10">
        {registros.message.map((registro) => (
          <div
            key={registro.id}
            className="bg-slate-800 text-center p-4 rounded-md text-white"
          >
            <h1 className="font-bold text-lg">{registro.id}</h1>
            <h1 className="font-bold text-lg">{registro.nombre_u}</h1>
            <h2 className="font-bold text-lg">{registro.email}</h2>
            <p className="font-bold text-lg">{registro.description}</p>
            <p className="font-bold text-lg">${registro.price/100}</p>
            <p className="font-bold text-lg">{registro.createdAt}</p>
            <h1 className="font-bold text-2xl">{registro.pagado === 1 ? 'Pagado' : 'No pagado'}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default registrosPage;
