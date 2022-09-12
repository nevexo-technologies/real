import * as yup from 'yup';

export default async function getValidationSchema(baseUrl = '') {

    let localization = await fetch(`${baseUrl}/data/localization.json`).then(data => data.json());
    let locationOptions = Object.keys(localization);
    var hsOptions = [];
    locationOptions.forEach(value => {
        hsOptions.push(...localization[value])
    });

    return yup.object({
        email: yup.string().email().required("Vă rugăm să introduceți un email."),
        age: yup.number().integer().min(12, "Vârsta minimă este de 12 de ani.").max(26, "Vârsta maxima este de 26 de ani.").required("Te rugăm să vă introduceți vârsta."),
        location: yup.string().oneOf(locationOptions, "Locația selectată nu există în baza de date.").required("Vă rugăm să vă  localitatea."),
        hs: yup.string().oneOf(hsOptions, "Liceul selectat nu există în baza de date.").required("Vă rugăm să vă alegeți unitatea de învățământ.").typeError("Vă rugăm să vă alegeți unitatea de învățământ."),
        eth: yup.string().required("Vă rugăm să alegeți o valoare."),
        eth_full: yup.string().when("eth", {
            is: "ALTA",
            then: (schema) => schema.required("Vă rugăm să introduceți un răspuns.").typeError("Vă rugăm să introduceți un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        p10: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p11: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p12: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p13: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p14: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p15: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p16: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p17: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p18: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p19: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p20: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p21: yup.array().of(yup.string()),
        p22: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p23: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p24: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p25: yup.number().integer().min(-1).max(5).required("Vă rugăm să introduceți un răspuns."),
        p26: yup.array().of(yup.string()),
        p26b: yup.string().when("p26", {
            is: (list) => list && !list.includes("4"),
            then: (schema) => schema.required("Vă rugăm să introduceți un răspuns.").typeError("Vă rugăm să introduceți un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
    });
}