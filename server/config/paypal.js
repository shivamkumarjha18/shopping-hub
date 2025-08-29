const paypal=require('paypal-rest-sdk');

paypal.configure({
mode:'sandbox', //sandbox or live
client_id:'AdCKA71kONaEPB5Q9yLksPGvc0Ya5Bh0gc5QHroSFLUEy0QoRhi2uCM6n7MMbQS44qkhaDQkVbDmrGnt',
client_secret:'ECRmmoxAdvtdrFe6BwW97vsWnDCotFZWuDICa1npF4ReKHyuw7u_Tyxi_2PyiUzvdTZmkWO2QVGcOA-i'
})


module.exports=paypal;