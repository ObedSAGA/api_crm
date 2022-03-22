import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const ViewClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const { nombre, email, empresa, tel, notas } = client;

  useEffect(() => {
    const getCLientAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const resp = await fetch(url);
        const body = await resp.json();
        setClient(body);
      } catch (error) {
        console.log(error);
      }
        setLoading(false);
    };
    getCLientAPI(!loading);
  }, []);

  return loading ? (
    <Spinner />
  ) : Object.keys(client).length === 0 ? (
    <p>No hay resultado</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Cliente: {nombre}</h1>
      <p className="mt-3">Información del cliente</p>

      <p className="text-2xl text-gray-700 mt-10">
        <span className=" font-bold">Cliente: </span>
        {nombre}
      </p>
      <p className="text-2xl text-gray-700 mt-4">
        <span className="font-bold">Empresa: </span>
        {empresa}
      </p>
      <p className="text-2xl text-gray-700 mt-4">
        <span className="font-bold">Email: </span>
        {email}
      </p>

      {tel && (
        <p className="text-2xl text-gray-700 mt-4">
          <span className="font-bold">Teléfono: </span>
          {tel}
        </p>
      )}

      {notas && (
        <p className="text-2xl text-gray-700 mt-4">
          <span className="font-bold">Notas: </span>
          {notas}
        </p>
      )}
    </div>
  );
};

export default ViewClient;
