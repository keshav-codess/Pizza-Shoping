var options = {
    "key": "rzp_test_9T014DgPoIsohI", 
    "amount": "50000",  
    "currency": "INR",  
    "name": "SliceRush", 
    "description": "Pizza Shop Transaction",
    "image": "https://example.com/your_logo",
    "handler": function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
        alert("Signature: " + response.razorpay_signature);
    },
    "prefill": {
        "name": "Customer Name",
        "email": "CustomerEmail@example.com", 
        "contact": "Customer Phone"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

var rzp1 = new Razorpay(options);

rzp1.on('payment.failed', function (response) {
    alert("Payment Failed");
    alert("Code: " + response.error.code);
    alert("Description: " + response.error.description);
    alert("Source: " + response.error.source);
    alert("Step: " + response.error.step);
    alert("Reason: " + response.error.reason);
    alert("Order ID: " + response.error.metadata.order_id);
    alert("Payment ID: " + response.error.metadata.payment_id);
});

document.getElementById('rzp-button1').addEventListener('click', function(e){
    e.preventDefault();  
    rzp1.open();
});
