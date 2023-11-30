import { recordGroup, recordTemplate, recordTotal } from "../core/selector";

export const updateRecord = (rowID, quantity) => {
  const currentRow = app.querySelector(`tr[product-id='${rowID}']`)
  const currentRowQ = currentRow.querySelector(".record-q")
  const currentRowPrice = currentRow.querySelector(".record-price")
  const currentRowCost = currentRow.querySelector(".record-cost")



  if (quantity > 0 || currentRowQ.innerText > 1) {

    currentRowQ.innerText = parseInt(currentRowQ.innerText) + quantity
    currentRowCost.innerText = currentRowQ.innerText * currentRowPrice.innerText;

  }




}




export const calculateRecordTotal = () => {
  // let total = 0;
  // const els = app.querySelectorAll(".record-cost");
  // els.forEach(el => total += parseFloat(el.innerText))



  const total = [...document.querySelectorAll(".record-cost")].reduce((pv, cv) => pv + parseFloat(cv.innerText), 0);
  recordTotal.innerText = total;
  return total;
};


export const createRecord = (id, productName, productPrice, quantity) => {
  const record = recordTemplate.content.cloneNode(true);
  const cost = productPrice * quantity;
  record.querySelector("tr").setAttribute("product-id", id);
  record.querySelector(".record-name").innerText = productName;
  record.querySelector(".record-price").innerText = productPrice;
  record.querySelector(".record-q").innerText = quantity;
  record.querySelector(".record-cost").innerText = cost;
  return record;
};


export const recordObserver = () => {

  const options = { attributes: true, childList: true, subtree: true };


  const callback = () => {
    calculateRecordTotal()
  }
  const observer = new MutationObserver(callback);

  observer.observe(recordGroup, options)
}