import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/userMenu";
import { useAuth } from "../../context/authContext";

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <>
            <Layout title={"Dashboard Ecommerce-app"}>

                <div className="container-fluid m-3 p-3">

                    <div className='row'>
                        <div className='col-md-3'>
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card w-75 p-3">
                                <h3>Admin Name: {auth?.user?.name}</h3>
                                <h3>Admin Email: {auth?.user?.email}</h3>
                                <h3>Admin Phone No.: {auth?.user?.phone}</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}
export default Dashboard;