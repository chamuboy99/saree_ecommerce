import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate = useNavigate();
    return(
        <>
            <div className="admin-dashboard-main">
                <button onClick={()=>navigate('/sarees')}>View Items</button>
                <button onClick={()=>navigate('/add-sarees')}>Add Item</button>                
            </div>
        </>
    );
}