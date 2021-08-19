import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const RecetasContext = createContext();

export const RecetasProvider = ( props )=>{
    const [ recetas, guardarRecetas ] = useState([]);
    const [ busqueda, buscarRecetas ] = useState({
        ingredientes:'',
        categoria:''
    });
    const [ consultar, guardarConsulta ] = useState(false);
    
    useEffect(() => {

        if(consultar){
            const obtenerRecetas = async ()=>{
                const {ingredientes, categoria} = busqueda;
                const urlBebidas = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientes}&c=${categoria}`;
                const bebidas = await axios.get(urlBebidas);
                guardarRecetas(bebidas.data.drinks);
            }
            obtenerRecetas();
        }
        guardarConsulta(false);
    }, [ busqueda, consultar ])

    return(
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsulta
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}