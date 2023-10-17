import { useState } from "react";
import Resultados from "./Resultados";
import Header from "./Header";
import './App.css';
import {mock1} from "./constants/users.js";
import CONFIG from "./config/config";
import EditForm from "./EditForm";

const USE_SERVER = CONFIG.use_server;

function App() {
  const [query, setQuery] = useState("");
  const [resultado, setResultado] = useState(null);
  const [isediting, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  const callServer = async (param) => {    
      if(USE_SERVER) {
        try {
          let queryparams = "";
          if(param==="all"){
            queryparams = "?limit=" + CONFIG.num_items;
          } else {
            queryparams = "/search?q=" + query;
          }
          const response = await fetch(`${CONFIG.server_url}${queryparams}`);
          const data = await response.json();         
          //console.log(data);
          setResultado(data.users);
        } catch (error) {
          console.log(error);
          setResultado({ error: {description: error.message} });
        }
      } else {
        //console.log(mock1.users)
        setResultado(mock1.users);
      }
  }

  const deleteuser = async (id) => {
    console.log("delete", id);
    try {
      /*const response = await fetch(`${CONFIG.server_url}/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      console.log(data);*/
      const newresultado = resultado.filter(item => item.id !== id);
      setResultado(newresultado);
    } catch (error) {
      console.log(error);
    }
  }

  const edit = (id) => {
    console.log("edit", id);
    const user = resultado.find(item => item.id === id);
    setUser(user);
    setIsEditing(true);
  }

  const save = async (firstName, lastName, email, image) => {    
    setIsEditing(false);
    try {
      console.log("save", firstName, lastName, email, image);
      /*const response = await fetch(`${CONFIG.server_url}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log(data);*/
    } catch (error) {
      console.log(error);
    }
  }

  const cancel = () => {
    console.log("cancel");
    setIsEditing(false);
  }

  const ocultarimagen = (id) => {
    console.log("ocultarimagen", id);
    const newresultado = resultado.map(item => {
      if(item.id === id) {
        //otra opción, un parámetro extra "ocultarimagen" a true y se lo pasaríamos a Resultados y que no la muestre si es true
        //return {...item, ocultarimagen: true}
        return {...item, image: ""}
      } else {
        return item;
      }
    });
    setResultado(newresultado);
  }

  return (
    <div id="main">
        <Header />
 				<h2 id="buscador">Buscador de usuarios</h2>
				<div><input type="text" id="query" placeholder="Texto a buscar" value={query} onChange={e=>setQuery(e.target.value)}></input></div>
				<br/>
        <button id="botonsearch" className="new" onClick={()=>callServer()}>
				  Buscar
				</button> 
        <button id="botonall" className="new" onClick={()=>callServer("all")}>
				  Ver Todos
				</button>    
        {isediting && <EditForm user={user} save={save} cancel={cancel} />}
        {resultado && <Resultados numitems={CONFIG.num_items} resultado={resultado} edit={edit} delete={deleteuser} ocultarimagen={ocultarimagen} />}    		
			</div>
  );
}

export default App;
