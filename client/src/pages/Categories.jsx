
import Layout from "./../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
 
  const categories = useCategory();
  return (
    <div>
      <Layout title={"All Category"}>
        <div className="container">
          <div className="row">
            {categories.map((c) => (
              <div className="col-md-6 gx-3 gy-3 mt-5 mb-3 " key={c._id}>
                <Link className="btn btn-primary" to={`/category/${c.slug}`}>
                 {c.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Categories;
