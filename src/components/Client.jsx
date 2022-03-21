import { useNavigate } from "react-router-dom";

const Client = ({ client, handleDelete}) => {
  const { nombre, empresa, email, tel, id } = client;

  const navigate = useNavigate();

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 font-bold">Email: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 font-bold">Tel: </span>
          {tel}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs rounded-md"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          Ver
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3 rounded-md"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3 rounded-md"
          onClick={() => handleDelete(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Client;
