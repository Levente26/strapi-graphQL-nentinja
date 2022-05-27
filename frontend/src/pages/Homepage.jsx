// import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
    query GetReviews {
        reviews {
            data {
                attributes {
                    title
                    rating
                    body
                    categories {
                        data {
                          attributes {
                            name
                          }
                          id
                        }
                    }
                }
                id
            }
        }
    }
`

const Homepage = () => {
    // const { loading, error, data } = useFetch('http://localhost:1337/api/reviews');
    const { loading, error, data } = useQuery(REVIEWS);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error :'(</p>
    }

    return (
        <div>
            {
                data && data.reviews.data.map(review => (
                    <div className="review-card" key={review.id}>
                        <div className="rating">{review.attributes.rating}</div>
                        <h2>{review.attributes.title}</h2>

                        {review.attributes.categories.data.map(console => (
                            <small key={console.id}>{console.attributes.name}</small>
                        )) }

                        <p>{review.attributes.body.substring(0, 200)}...</p>
                        <Link to={`/details/${review.id}`}>Read more</Link>
                    </div>
                ))
            }
        </div>
    )
}
export default Homepage;
