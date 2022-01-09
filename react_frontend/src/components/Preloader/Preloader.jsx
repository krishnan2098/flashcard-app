import {Oval} from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './Preloader.css'

const Preloader = () => {
    return (
        <div className="loader-wrapper">
            <Oval type="Oval" color="#6253cc" height={80} width={80} />
            {/* Testing */}
        </div>
    )
};

export default Preloader;