import { useEffect, useState } from 'react';
import '../styles/orderstatusmodal.css';
import axios from 'axios';

export default function OrderStatusModal({ showModal, editingOrder, onClose, onUpdated }) {
    const [status, setStatus] = useState("");
    const [saving, setSaving] = useState(false);
    
    const statuses = ["Pending", "Confirmed", "Packing", "Out for Delivery", "Delivered", "Cancelled"];
    
    useEffect(() => {
        if (editingOrder) setStatus(editingOrder.status);
    }, [editingOrder])

    if (!showModal || !editingOrder) return null;

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const token = localStorage.getItem('token');
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/${editingOrder._id}/status`,{status},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            onUpdated(res.data.data);
            onClose();
        } catch (err) {
            console.error(err.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSave}>
                    <button onClick={onClose}>X</button>
                    <select name="status" value={status} onChange={handleStatusChange}>
                        {statuses.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <button type='submit' disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
                </form>
            </div>
        </div>
    );
}