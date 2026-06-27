import "../styles/feedback.css";


function AdminFeedbackModal({feedback,onClose}) {
    return (
    <div className="modal-overlay"
    onClick={onClose}
    >
    <div className="modal-content"
    onClick={(e)=>e.stopPropagation()}
    >
    <h2>Customer Feedback</h2>

    <div className="rating-stars">
        {
        Array.from({length:feedback.rating}).map((_,i)=>(
        <span 
        key={i}
        className="star active-star"
        >
            ★
        </span>
        ))
        }
        </div>

    <h4>Review</h4>
    <p>{feedback.review}</p>
    </div>
    </div>

);

}

export default AdminFeedbackModal;