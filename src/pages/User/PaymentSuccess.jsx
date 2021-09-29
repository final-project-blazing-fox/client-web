import { useEffect, useState } from "react";
import { button } from "react-dom";
import { Redirect } from "react-router";

function PaymentSuccess() {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  if (!timeLeft) {
    return (
      <>
        <Redirect to="/" />
      </>
    );
  }
  return (
    <>
      <p>
        Thanks for your payment, plese do not refresh this page, you will
        redirect automatically
      </p>
      <p>{timeLeft}</p>
    </>
  );
}

export default PaymentSuccess;
