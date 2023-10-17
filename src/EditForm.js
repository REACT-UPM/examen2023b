import {useState, useEffect} from 'react';

export default function EditForm(props){
    //Formulario de edición de usuarios
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [email, setEmail] = useState(props.user.email);
    const [image, setImage] = useState(props.user.image);

    useEffect(() => {
        setFirstName(props.user.firstName);
        setLastName(props.user.lastName);
        setEmail(props.user.email);
        setImage(props.user.image);
    }, [props.user]);


    return <div>
        {console.log(props.user.firstName)}
        <form id="editform" className='editform'>
            <div className='firstrow'>
                <label htmlFor="firstName">Nombre:</label>
                <input type="text" id="firstName" value={firstName} onChange={e=>setFirstName(e.target.value)}></input>
                <label htmlFor="lastName">Apellidos:</label>
                <input type="text" id="lastName" value={lastName} onChange={e=>setLastName(e.target.value)}></input>
            </div>
            <div className='secondrow'>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
                <label htmlFor="image">Imagen:</label>
                <input type="text" id="image" value={image} onChange={e=>setImage(e.target.value)}></input>
            </div>
            <div className='thirdrow'>
                <button id="botoncancel" className="new" onClick={()=>props.cancel()}>CANCEL</button>
                <button id="botonsave" className="new" onClick={()=>props.save(firstName, lastName, email, image)}>SAVE</button>
            </div>
        </form>
    </div>

}