const mongoose = require("mongoose");

const isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "number" && isNaN(value)) return false;

    return true;
}

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const isValidFullName = (input) =>
    typeof input === "string" &&
    input.trim().length >= 2 &&
    input.length <= 60 &&
    /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(input); 

const isValidEmail = (input) =>
    typeof input === "string" &&
    input.length <= 254 &&
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(input);

// const isValidPhone = (input)=> /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(input);

const isValidPassword = (input) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%?&])[A-Za-z\d@.#$!%?&]{8,20}$/.test(input);


module.exports = { isValid, isValidFullName, isValidEmail, isValidPassword, isValidObjectId };