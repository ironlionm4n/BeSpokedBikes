import React from "react";

const SalesPerson = ({ salesPerson }) => {
  const startDate = new Date(salesPerson.startDate);
  const formattedDate = `${
    startDate.getMonth() + 1
  }/${startDate.getDate()}/${startDate.getFullYear()}`;
  return (
    <div>
      <h3>
        {salesPerson.firstName} {salesPerson.lastName}
      </h3>
      <p>Phone Number: {salesPerson.phoneNumber}</p>
      <p>Employed Since: {formattedDate}</p>
      <p>Manager: {salesPerson.manager}</p>
    </div>
  );
};

export default SalesPerson;
