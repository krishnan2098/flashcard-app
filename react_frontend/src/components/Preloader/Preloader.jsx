import Loader from "react-loader-spinner";
import './Preloader.css'

const Preloader = () => {
    return (
        <div className="loader-wrapper">
            <Loader type="Oval" color="#00BFFF" height={80} width={80} />
        </div>
    )
};

export default Preloader;