export function percentDifference(a, b) {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)      //на сколько процентов упала или повысилась цена
  }

export function toUpperFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1)
}

export function totalPrice(price, quantity) {
  return price * quantity
}