import { useState } from "react";

import {saveFeedback}from "../services/feedbackApi";

import "../styles/feedback.css";

function FeedbackModal({order,onClose}) {
    const [rating,setRating] = useState(5);
    const [review,setReview] = useState("");
    const submitFeedback = async () => {
        try {
            await saveFeedback({
                order_id:order.order_id,
                customer_email:localStorage.getItem("userEmail"),
                product_id:order.product_id,
                product_name:order.product_name, rating, review
            });
            alert("Feedback Submitted");
            onClose();
        }
        catch {
            alert("Feedback Failed");
        }
    };
 return (
    <div className="modal-overlay" 
    onClick={onClose}
    >
    
    <div className="modal-content"
    onClick={(e)=> e.stopPropagation()}
    >
    <h2>
        Product Feedback
    </h2>

    <div className="rating-stars">
        {[1,2,3,4,5].map((star) => (
            <span
            key={star}
            className={
            star <= rating? "star active-star": "star"
            }
            onClick={() =>setRating(star)}
            >
            ★
            </span>

        ))}

    </div>
    <textarea
    rows="5"
    placeholder="Write Review"
    value={review}
    onChange={(e)=>setReview(e.target.value)}
    />
    <button
    className="feedback-submit-btn"
    onClick={submitFeedback}
    >
        Submit Feedback
    </button>
    </div>
    </div>
    );
}

export default FeedbackModal;