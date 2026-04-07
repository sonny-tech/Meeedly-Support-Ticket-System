import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";

function Error404() {
    return (
        <div>
            <Navigation/>
            <h1>Error 404 page</h1>
            <p>Errors will be routed here.</p>
            <Footer/>
        </div>
    );
}

export default Error404;