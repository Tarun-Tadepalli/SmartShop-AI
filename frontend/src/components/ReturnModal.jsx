import { useState } from "react";
import "../styles/return.css";

function ReturnModal({ order, onClose, onSubmit }) {

  const [reason, setReason] = useState("");

  const submitReturn = () => {
    if (!reason) {
      alert(
        "Please Select Reason"
      );
      return;
    }
    onSubmit(reason);

  };

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          Return Product
        </h2>

        <div className="return-option">

  <input
    type="radio"
    id="damaged"
    value="Damaged Product"
    checked={reason === "Damaged Product"}
    onChange={(e) => setReason(e.target.value)}
  />

  <label htmlFor="damaged">
    Damaged Product
  </label>

</div>
<br />
<div className="return-option">

<input
  type="radio"
  id="wrong"
  value="Wrong Product Delivered"
  checked={reason === "Wrong Product Delivered"}
  onChange={(e) => setReason(e.target.value)}
/>

<label htmlFor="wrong">
  Wrong Product Delivered
</label>

</div>

<br />

<div className="return-option">

  <input
    type="radio"
    id="needed"
    value="Product Not Needed"
    checked={reason === "Product Not Needed"}
    onChange={(e) => setReason(e.target.value)}
  />

  <label htmlFor="needed">
    Product Not Needed
  </label>

</div>
<br />

<div className="return-option">

  <input
    type="radio"
    id="quality"
    value="Quality Issue"
    checked={reason === "Quality Issue"}
    onChange={(e) => setReason(e.target.value)}
  />

  <label htmlFor="quality">
    Quality Issue
  </label>

</div>
<br />

<div className="return-option">

  <input
    type="radio"
    id="other"
    value="Other"
    checked={reason === "Other"}
    onChange={(e) => setReason(e.target.value)}
  />

  <label htmlFor="other">
    Other
  </label>

</div>

        <br />

        <br />

        <button
          className="feedback-submit-btn"
          onClick={submitReturn}
        >
          Submit Return Request
        </button>

      </div>

    </div>
  );
}

export default ReturnModal;