import { Formulario } from "./components/Formulario";
import { Header } from "./components/Header";
import { ListaRecetas } from "./components/ListaRecetas";
import { CategoriasProvider } from "./contex/Categoria";
import { ModalProvider } from "./contex/ModalContex";
import { RecetasProvider } from "./contex/RecetasContex";

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>
          <Header/>
          <div className='container mt-5'>
            <div className='col-12'>
              <Formulario/>
            </div>
            <ListaRecetas/>
          </div>
        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
}

export default App;
