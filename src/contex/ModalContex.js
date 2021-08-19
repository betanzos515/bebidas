import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ModalContext = createContext();
export const ModalProvider = ( props )=> {
    const [ idReceta, setIdReceta ] = useState(null);
    const [ recetaModal, guardarReceta ] = useState({});

    useEffect(() => {
        if (!idReceta) return null ;

        const consultarBebida = async ()=>{
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            const datos = await axios.get(url);
            guardarReceta(datos.data.drinks[0]);
        }

        consultarBebida();
        
    }, [idReceta])

    return (
        <div>
            <ModalContext.Provider
                value={{
                    recetaModal,
                    setIdReceta,
                    guardarReceta
                }}
            >
                {props.children}
            </ModalContext.Provider>
        </div>
    )
}
