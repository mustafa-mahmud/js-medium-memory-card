function deliveryCost(quantity) {
  if (quantity < 100) {
    sum = quantity * 100;
  }
  if (quantity > 100 && quantity <= 200) {
    sum = 100 * 100;
    sum += (quantity - 100) * 80;
  }
  if (quantity > 200) {
    sum = 100 * 100;
    sum += 100 * 80;
    sum += (quantity - 200) * 50;

    console.log(sum);
  }

  return sum;
}

console.log(deliveryCost(310));
