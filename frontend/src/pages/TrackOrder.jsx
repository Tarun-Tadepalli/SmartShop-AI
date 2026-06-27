import { useLocation } from "react-router-dom";

import CustomerLayout from "../components/CustomerLayout";

import "../styles/trackorder.css";

function TrackOrder() {

  const location = useLocation();

  const order =
  location.state;

  if (!order) {

    return (

      <CustomerLayout>

        <h2>
          Order Not Found
        </h2>

      </CustomerLayout>

    );
  }

  const stages = [

    "Pending",

    "Processing",

    "Shipped",

    "Delivered"

  ];

  const currentStage =
  stages.indexOf(
    order.status
  );

  return (

    <CustomerLayout>

      <div
        className="tracking-page"
      >

        <h1>
          Order Tracking
        </h1>

        <h3>
          {order.product_name}
        </h3>

        <div className="tracking-wrapper">

  {
    stages.map(
      (stage,index) => (

      <div
        key={stage}
        className="tracking-item"
      >

        <div
          className={
            index < currentStage
            ?
            "circle completed"
            :
            index === currentStage
            ?
            "circle current"
            :
            "circle"
          }
        >
          ✓
        </div>

        <p>
          {stage}
        </p>

        {
          index !==
          stages.length - 1 &&

          <div
            className={
              index <
              currentStage
              ?
              "line active-line"
              :
              "line"
            }
          />
        }

      </div>

      )
    )
  }

</div>

      </div>

    </CustomerLayout>

  );
}

export default TrackOrder;