import numeral from "numeral";

numeral.register("locale", "us", {
    delimiters: {
        thousands: ",",
        decimal: ".",
    },
    abbreviations: {
        thousand: "k",
        million: "M",
        billion: "B",
        trillion: "T",
    },
    ordinal: function (number) {
        return number === 1 ? "er" : "ème";
    },
    currency: {
        symbol: "$",
    },
});
// switch between locales
numeral.locale("us");

export const format = (value: string | number, format: string) => numeral(value).format(format);