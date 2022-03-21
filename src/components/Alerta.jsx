

const Alerta = ({children}) => {
  return (
    <div>
      <span class="text-red-500 text-xs italic">
          {children}
      </span>
    </div>
  );
};

export default Alerta;
