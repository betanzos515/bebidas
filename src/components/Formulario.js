import { useContext, useState } from "react"
import { CategoriasContext } from "../contex/Categoria"
import { RecetasContext } from "../contex/RecetasContex";

export const Formulario = () => {

    //asignamos los contextos 
    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsulta } = useContext( RecetasContext );

    const [ busqueda, guardarBusqueda ] = useState({
        nombre:'',
        categoria:''
    })

    const handleChange = (e)=>{
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    return (
        <div>
            <form 
                className='col-12'
                onSubmit={ e =>{
                    e.preventDefault();
                    buscarRecetas(busqueda);
                    guardarConsulta(true);
                }}
            >
                <fieldset className='text-center'>
                    <legend>Busca bebidas por Categoría o Ingrediente</legend>
                </fieldset>
                <div className='row mt-4'>
                    <div className='col-md-4'>
                        <input
                            type='text'
                            name='nombre'
                            className='form-control'
                            placeholder='Buscar por Ingrediente'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-md-4'>
                        <select
                            name='categoria'
                            className='form-control'
                            onChange={handleChange}
                        >
                            <option value=''>--Seleccione una Categoria--</option>
                            {categorias.map(categoria=>(<option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>))}
                        </select>
                    </div>
                    <div className='col-md-4'>
                        <input
                            type='submit'
                            className='btn btn-block btn-primary'
                            value='Buscar Bebidas'
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
