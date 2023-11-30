import { productUi } from "../app/product";
import { app, newProductForm, productDrawer, quantityInput, recordForm, recordGroup } from "./selector";
import { products } from "./variable";
import { calculateRecordTotal, createRecord, updateRecord } from '../app/record';
import Swal from "sweetalert2";
import { confirmBox, toast } from "./function";

export const manageProductBtnHandler = () => {
    productDrawer.classList.toggle("translate-x-full");
    productDrawer.classList.add("duration-200");
};

export const newProductFormHandler = (event) => {

    event.preventDefault();
    const formData = new FormData(newProductForm);

    const newProduct = {
        id: Date.now(),
        name: formData.get("new_product_name"),
        price: formData.get("new_product_price")
    }

    productGroup.append(productUi(newProduct))
    productSelect.append(new Option(newProduct.name, newProduct.id));
    products.push(newProduct);
    newProductForm.reset();
};

export const recordFormHandler = (event) => {
    event.preventDefault();
    //id => product name 
    const currentProduct = products.find(product => product.id == productSelect.value);
    const isExist = app.querySelector(`[product-id= '${currentProduct.id}']`);

    if (isExist) {
        updateRecord(currentProduct.id, quantityInput.valueAsNumber)
    } else {
        recordGroup.append(
            createRecord(
                currentProduct.id,
                currentProduct.name,
                currentProduct.price,
                quantityInput.valueAsNumber
            ));


    }

    recordForm.reset();
};

// export const recordFormHandler = (event) => {
//     event.preventDefault();

//     // Ensure quantityInput has a positive value
//     const quantityValue = quantityInput.valueAsNumber;
//     if (quantityValue <= 0 || isNaN(quantityValue)) {
//         // Display an error message or take appropriate action for invalid quantity
//         alert("Please enter a valid positive quantity.");
//         return;
//     }

//     //id => product name 
//     const currentProduct = products.find(product => product.id == productSelect.value);
//     const isExist = app.querySelector(`[product-id= '${currentProduct.id}']`);

//     if (isExist) {
//         updateRecord(currentProduct.id, quantityValue);
//     } else {
//         recordGroup.append(
//             createRecord(
//                 currentProduct.id,
//                 currentProduct.name,
//                 currentProduct.price,
//                 quantityValue
//             ));
//     }

//     recordForm.reset();
// };

export const recordGroupHandler = (event) => {
    if (event.target.classList.contains("record-del")) {
        confirmBox(() => {
            event.target.closest("tr").remove();
            toast("Delete Successful ✅")
        });
    }
    else if (event.target.classList.contains("q-add")) {
        updateRecord(event.target.closest("tr").getAttribute("product-id"), 1)
    }
    else if (event.target.classList.contains("q-sub")) {
        updateRecord(event.target.closest("tr").getAttribute("product-id"), -1)

    }

};

export const printBtnHandler = () => {
    print();
}