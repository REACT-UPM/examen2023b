
export default function Resultados(props) {
	return (<div>
    <ul id="resultados">
      {props.resultado.map(item => (
        <li key={item.id}>          
          <p>Nombre: <b>{item.firstName}</b> {item.lastName}</p>
          <p>Email: {item.email}</p>
          <p>{item.image==="" ? null:<img src={item.image} alt="Imagen de {item.firstName}"/>}</p>
          <button id="ocultarimagen" className="new" onClick={()=>props.ocultarimagen(item.id)}>OCULTAR IMAGEN</button><br/>   
          <button id="botonedit" className="new" onClick={()=>props.edit(item.id)}>EDITAR</button>
          <button id="botonborrar" className="new" onClick={()=>props.delete(item.id)}>BORRAR</button>   
        </li>
      ))}
    </ul>
  </div>)
}