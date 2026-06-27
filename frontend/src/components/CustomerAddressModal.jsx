function CustomerAddressModal({details, onClose}) {
    return (
    
    <div className="modal-overlay"
    onClick={onClose}
    >
    
    <div className="modal-content"
    onClick={(e)=>e.stopPropagation()}
    >
    
    <h2>Customer Details</h2>
    
    <p><b>Name:</b>{details[0]}</p>
    
    <p><b>Phone:</b>{details[1]}</p>
    
    <p><b>Address:</b>{details[2]}</p>
    
    <p><b>City:</b>{details[3]}</p>
    
    <p><b>State:</b>{details[4]}</p>
    
    <p><b>Pincode:</b>{details[5]}</p>
    
    </div>
    
    </div>
    
    );
    
    }
    
export default CustomerAddressModal;