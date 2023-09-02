import React, { useState } from "react";
import btn_icon from "../../assets/btn-icon.svg";

const UserInput = () => {
  const [formData, setFormData] = useState({
    DD: "",
    MM: "",
    YYYY: "",
  });

  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const birthYear = parseInt(formData.YYYY);
    const birthMonth = parseInt(formData.MM) - 1; // Adjust for zero-based month
    const birthDay = parseInt(formData.DD);

    const currentDate = new Date();
    const userBirthDate = new Date(birthYear, birthMonth, birthDay);

    if (
      isNaN(userBirthDate.getTime()) ||
      userBirthDate.getFullYear() !== birthYear ||
      userBirthDate.getMonth() !== birthMonth ||
      userBirthDate.getDate() !== birthDay
    ) {
      // Check if the entered birthdate is invalid
      setIsValid(false);
    } else {
      // Calculate age
      let ageYears = currentDate.getFullYear() - birthYear;
      let ageMonths = currentDate.getMonth() - birthMonth;
      let ageDays = currentDate.getDate() - birthDay;

      // Adjust for negative months and days
      if (ageDays < 0) {
        ageMonths--;
        const lastDayOfPreviousMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate();
        ageDays += lastDayOfPreviousMonth;
      }
      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }

      setIsValid(true);

      // Update the state with the calculated age
      setFormData({
        ...formData,
        ageYears,
        ageMonths,
        ageDays,
      });
    }
  };

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue)) {
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    }
  };

  const { ageYears, ageMonths, ageDays } = formData;

  return (
    <>
      <div className="ps-4 lg:ps-14 pe-60 w-full lg:w-[728px] flex flex-col lg:items-start">
        <form className="flex gap-4 lg:gap-8">
          {["DD", "MM", "YYYY"].map((elem) => (
            <div key={elem}>
              <label
                htmlFor={elem}
                className={`${
                  isValid ? "text-black" : "text-red-500"
                } uppercase`}
              >
                {elem}
              </label>
              <input
                type="text"
                className={`
                ${isValid ? "border-[#DCDCDC]" : "border-red-500"}
                max-w-[90px] lg:max-w-[160px] border rounded-lg py-3 ps-6 focus:outline-none focus:border-purple-500 focus:border block`}
                name={elem}
                placeholder={`${elem}`}
                value={formData[elem]}
                onChange={onChangeValue}
              />
              {isValid ? (
                ""
              ) : (
                <p className="text-red-500">This field is required.</p>
              )}
            </div>
          ))}
        </form>
      </div>
      <div className="flex justify-center lg:justify-end items-center lg:w-[728px] mt-8 lg:mt-0 lg:ps-14">
        <hr className="border border-slate-200 lg:w-[632px] hidden lg:block" />
        <button
          className="rounded-full bg-purple-600 flex justify-center items-center p-3 lg:p-5 lg:px-6 hover:bg-black transition-[0.25s]"
          onClick={handleSubmit}
        >
          <img
            src={btn_icon}
            className="w-[24px] h-[24px] lg:w-[44px] lg:h-[44px]"
            alt=""
          />
        </button>
      </div>
      <div className="flex flex-col ps-4 lg:ps-14">
        <h1>
          {isValid ? (
            <span className="text-purple-700 pe-4">{ageYears}</span>
          ) : (
            <span className="text-purple-600 pe-4">--</span>
          )}
          years
        </h1>
        <h1>
          {isValid ? (
            <span className="text-purple-700 pe-4">{ageMonths}</span>
          ) : (
            <span className="text-purple-600 pe-4">--</span>
          )}
          months
        </h1>
        <h1>
          {isValid ? (
            <span className="text-purple-700 pe-4">{ageDays}</span>
          ) : (
            <span className="text-purple-600 pe-4">--</span>
          )}
          days
        </h1>
      </div>
    </>
  );
};

export default UserInput;
