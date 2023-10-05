
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/Auth'


function AdminDashboard() {
const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid m-3 p-3">
       <div className="row">
       <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75">
              <h2>Admin Name : {auth?.user?.name}</h2>
              <h2>Admin Email : {auth?.user?.email}</h2>
              <h2>Admin Contact : {auth?.user?.phone}</h2>
          </div>
        </div>
       </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard