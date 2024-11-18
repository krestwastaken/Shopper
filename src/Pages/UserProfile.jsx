import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function UserProfile () {
    const { id } = useParams();

    const fetchUserProfile = async () => {
        const { data } = await axios.get(`http://localhost:5000/user-profile/${id}`);
        return data;
    };

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user-profile', id],
        queryFn: fetchUserProfile,
    });

    if (isLoading) return <div>User Profile is loading...</div>
    if (error) return <div>Error encountered while loading profile, please try again.</div>

    return (
        <div>
            <h1>Welcome, {user.username}!</h1>
            {user.role === 'seller' ? (
                <SellerDashboard />
            ) : (
                <BuyerDashboard />
            )}
        </div>
    );
}

function BuyerDashboard () {
    return(
        <div>
            <h2>Buyer Actions</h2>
            <Link to='/'>
                <button className="product-button">Browse Products</button>
            </Link>
        </div>
    )
}

function SellerDashboard () {
    return (
        <div>
            <h2>Seller Actions</h2>
            <Link to='/addProduct'>
                <button className="product-button">Add Product</button>
            </Link>
        </div>
    )
}