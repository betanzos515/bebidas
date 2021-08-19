import { createContext, useEffect, useState } from "react";
import axios from "axios";


//Creamos el contex
export const CategoriasContext = createContext();

/*
Siempre que se crea un context tienes que crear un provider, el provider
es donde se encuentran las funciones y el state
*/

export const CategoriasProvider = (props)=>{
    
    const [ categorias, guardarCategorias ] = useState([])
    useEffect(() => {
        const obtenerCategorias = async ()=>{
            const urlCategorias = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const consultaCategorias = await axios.get(urlCategorias);
            guardarCategorias(consultaCategorias.data.drinks);
        }
        obtenerCategorias();
    }, [])
    //creamos el state del context;

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

// export default CategoriasContext;