import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const Homepage = () => {

    const { loading, error, data } = useFetch('http://localhost:1337/api/reviews');

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error :'(</p>
    }

    data && console.log(data);

    return (
        <div>
            {
                data && data.map(review => (
                    <div className="review-card" key={review.id}>
                        <div className="rating">{review.attributes.rating}</div>
                        <h2>{review.attributes.title}</h2>

                        <small>console list</small>

                        <p>{review.attributes.body.substring(0, 200)}...</p>
                        <Link to={`/details/${review.id}`}>Read more</Link>
                    </div>
                ))
            }
        </div>
    )
}
export default Homepage;
