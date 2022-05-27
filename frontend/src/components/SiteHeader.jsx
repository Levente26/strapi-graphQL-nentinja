import { Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
    query GetCategories {
        categories {
            data {
                attributes {
                    name
                }
                id
            }
        }
    }
`

const SiteHeader = () => {

    const { loading, error, data } = useQuery(CATEGORIES);

    console.log(data);

    if (loading) {
        return <p>Loading...</p>;
    };

    if (error) {
        return <p>Error fetching categories</p>;
    };

    return (
        <div className="site-header">
            <Link to='/'><h1>Ninja Reviews</h1></Link>
            <nav className='categories'>
                <span>Filter reviews by category</span>
                {data && data.categories.data.map(category => (
                    <Link key={category.id} to={`/category/${category.id}`}>
                        {category.attributes.name}
                    </Link>
                ))}
            </nav>
        </div>
    )
}
export default SiteHeader;