import { useContext, useState } from "react";
import { ModalContext } from "../contex/ModalContex";

//Importaciones para los modales.
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color:'black'
  },
}));

//muestra y formatea los ingredientes
const mostrarIngredientes = ( recetaModal )=>{
  let ingredientes = [];
  for(let i=1 ; i<16 ; i++){
    if(recetaModal[`strIngredient${i}`]){
      ingredientes.push(
        <li key={i}>{recetaModal[`strIngredient${i}`]} {recetaModal[`strMeasure${i}`]}</li>
      );
    }
  }
  return ingredientes;
}

export const Receta = ({ receta }) => {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  
  const classes = useStyles();
  
  const { setIdReceta, recetaModal, guardarReceta } = useContext(ModalContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    guardarReceta({});

  };


  const handleClick = () => {
    setIdReceta(receta.idDrink);
    handleOpen();
  };
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          className="card-img-top"
          src={receta.strDrinkThumb}
          alt={receta.strDrink}
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={handleClick}
          >
            Ver Receta
          </button>
          <Modal
            open={open}
            onClose={()=>{
                setIdReceta(null);  
                handleClose(); 
            }}
          >
              <div style={modalStyle} className={classes.paper}>
                  <h2>Desde Modal</h2>
                  <h3 className='mt-4'>Instrucciones</h3>
                  <p>
                    {recetaModal.strInstructions}
                  </p>
                  <img className='img-fluid my-4' src={recetaModal.strDrinkThumb} alt={recetaModal.strDrink}/>
                  <h3>Ingredientes y cantidades</h3>
                  <ul>
                    {mostrarIngredientes(recetaModal)}
                  </ul>
              </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
