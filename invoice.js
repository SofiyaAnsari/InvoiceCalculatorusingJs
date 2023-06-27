"use strict";
//Here we are using a function for formatting the date in the MM/DD/YYYY format
function formatDate(date) {              
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

//Here we are calculating the discount 
const calculateDiscount = (customer, subtotal) => {
  if (customer === "reg") {
    if (subtotal >= 100 && subtotal < 250) {
      return 0.1;
    } else if (subtotal >= 250 && subtotal < 500) {
      return 0.25;
    } else if (subtotal >= 500) {
      return 0.3;
    } else {
      return 0;
    }
  } else if (customer === "loyal") {
    return 0.3;
  } else if (customer === "honored") {
    if (subtotal < 500) {
      return 0.4;
    } else {
      return 0.5;
    }
  }
};

$(document).ready(() => {

  $("#calculate").click(() => {
    const customerType = $("#type").val();
    let subtotal = $("#subtotal").val();
    subtotal = parseFloat(subtotal);
    if (isNaN(subtotal) || subtotal <= 0) {
      alert("Subtotal must be a number greater than zero.");
      $("#clear").click();
      $("#subtotal").focus();
      return;
    }

    const discountPercent = calculateDiscount(customerType, subtotal);
    const discountAmount = subtotal * discountPercent;
    const invoiceTotal = subtotal - discountAmount;

    $("#subtotal").val(subtotal.toFixed(2));
    $("#percent").val((discountPercent * 100).toFixed(2));
    $("#discount").val(discountAmount.toFixed(2));
    $("#total").val(invoiceTotal.toFixed(2));

    //Here we are gettong the value of invoice date and creating a date object and if the invoice date is 
    //null we are assigning the current date as the invoice date

    const InvDate = $("#invoice_date").val();
    let InDate;
    if (InvDate !== "") {
      InDate = new Date(InvDate);
    } else {
      InDate = new Date(); 
    }

    //Here we are validating the format of date
    if (InvDate !== "" && isNaN(InDate.getTime())) {
      alert("Invalid invoice date. Please enter a valid date in MM/DD/YYYY format.");
      $("#clear").click();
      $("#invoice_date").focus();
      return;
    }

    //Calculating the due date after 30 days of invoice date
    const dueDate = new Date(InDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    //Setting the values of Invoice Date and Due Date fields
    $("#invoice_date").val(formatDate(InDate));
    $("#due_date").val(formatDate(dueDate));

    // Set focus on type drop-down when done
    $("#type").focus();
  });

  // Clear button click event
  $("#clear").click(() => {
    $("#type").val("reg");
    $("#subtotal").val("");
    $("#invoice_date").val("");
    $("#percent").val("");
    $("#discount").val("");
    $("#total").val("");
    $("#due_date").val("");

    // Set focus on type drop-down when done
    $("#type").focus();
  });

  // Set focus on type drop-down on initial load
  $("#type").focus();
});
