import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/Auth'

function Dashboard() {
  const [auth] = useAuth();
  return (
    <Layout title={"DashBoard All Users "}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
             <div className="card w-75">
             <h1>User Name : {auth?.user?.name}</h1>
              <h1>User Address : {auth?.user?.address}</h1>
              <h1>User Contact : {auth?.user?.phone}</h1>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard