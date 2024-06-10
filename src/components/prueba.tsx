import { useParams } from 'react-router-dom';

const Prueba = () => {
    const { id, hola } = useParams();
    return (
        <>
            <p>Soy el componente Prueba </p>
            <p>Parametro {id}</p>
            <p>Parametro {hola}</p>
        </>
    );
};

export default Prueba;
