const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));
let taxRate=5;
let discountPercentage=10;
let loyalityRate=2;

app.get('/cart-total', (req, res) => {
  let cartTotal=parseFloat(req.query.cartTotal);
  let newItemPrice=parseFloat(req.query.newItemPrice);
  let totalCartPrice=cartTotal+newItemPrice;
  res.send(totalCartPrice.toString());
});
function discountOnMembership(cartTotal,isMember)
{
  if(isMember)
  {
    return  finalPrice=cartTotal*(1-0.1);

  }
  else 
  {
    return cartTotal;
  }
}
app.get('/membership-discount',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  let isMember=req.query.isMember;
  let finalPrice=discountOnMembership(cartTotal,isMember);
  res.send(finalPrice.toString());

});
function taxOnCartTotal(cartTotal)
{
  return cartTotal*0.05;
}
app.get('/calculate-tax',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  let finalPrice=taxOnCartTotal(cartTotal);
  res.send(finalPrice.toString());
});
function deliveryTimeOnShipping(shippingMethod,distance)
{
  if(shippingMethod.toLowerCase()==="Standard".toLowerCase())
  {
    return distance/50;
  }
  else{
    return distance/100;
  }
}
app.get('/estimate-delivery',(req,res)=>{
  let shippingMethod=req.query.shippingMethod;
  let distance=parseFloat(req.query.distance);
  let result=deliveryTimeOnShipping(shippingMethod,distance);
  res.json(result);
});

function shippingCostOnWeight(weight,distance)
{
  return weight*distance*0.1;
}
app.get('/shipping-cost',(req,res)=>{
  let weight=parseFloat(req.query.weight);
  let distance=parseFloat(req.query.distance);
  let result=shippingCostOnWeight(weight,distance);
  res.send(result.toString());
});
function loyaltyPoints(purchaseAmount)
{
  return purchaseAmount*2;
}
app.get('/loyalty-points',(req,res)=>{
  let purchaseAmount=parseFloat(req.query.purchaseAmount);
  let result=loyaltyPoints(purchaseAmount);
  res.send(result.toString());
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
