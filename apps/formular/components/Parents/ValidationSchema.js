import * as yup from 'yup';

export default async function getValidationSchema(baseUrl = '') {

    let localization = await fetch(`${baseUrl}/data/localization.json`).then(data => data.json());
    let locationOptions = Object.keys(localization);
    var hsOptions = [];
    locationOptions.forEach(value => {
        hsOptions.push(...localization[value])
    });

    return yup.object({
        email: yup.string().email().required("Te rugăm să introduci un email."),
        age: yup.number().integer().min(26, "Vârsta minimă este de 26 de ani.").max(90, "Vârsta maxima este de 26 de ani.").required("Te rugăm să îți introduci vârsta."),
        location: yup.string().oneOf(locationOptions, "Locația selectată nu există în baza de date.").required("Te rugăm să îți alegi localitatea."),
        hs: yup.string().oneOf(hsOptions, "Liceul selectat nu există în baza de date.").required("Te rugăm să îți alegi unitatea de învățământ.").typeError("Te rugăm să îți alegi unitatea de învățământ."),
        class: yup.number().integer().min(9).max(12).required("Te rugăm să îți alegi clasa."),
        letter: yup.string().required("Te rugăm să îți introduci litera clasei."),
        eth: yup.string().required("Te rugăm să alegi o valoare."),
        eth_full: yup.string().when("eth", {
            is: "ALTA",
            then: (schema) => schema.required("Vă rugăm să introduceți un răspuns.").typeError("Vă rugăm să introduceți un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        t10: yup.number().integer().min(-1).max(5).required("Vă rugăm să alegeți un răspuns."),
        t11: yup.number().integer().min(-1).max(5).required("Vă rugăm să alegeți un răspuns."),
        t12: yup.number().integer().min(-1).max(5).required("Vă rugăm să alegeți un răspuns."),
        t13: yup.number().integer().min(-1).max(1000).required("Vă rugăm să alegeți un răspuns."),
        t13b: yup.number().integer().min(-1).max(1000).when("t13", {
            is: 1,
            then: (schema) => schema.required("Vă rugăm să alegeți un răspuns.").typeError("Vă rugăm să alegeți un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        t14: yup.number().integer().min(-1).max(1000).required("Vă rugăm să alegeți un răspuns."),
        t15: yup.number().integer().min(-1).max(1000).required("Vă rugăm să alegeți un răspuns."),
        t16: yup.number().integer().min(-1).max(5).required("Vă rugăm să alegeți un răspuns."),
        t17: yup.number().integer().min(-1).max(5).required("Vă rugăm să alegeți un răspuns."),
        t18: yup.number().integer().min(-1).max(5).required("Vă rugăm să alegeți un răspuns."),
        t19: yup.number().integer().min(-1).max(1).required("Vă rugăm să alegeți un răspuns."),
        t19b: yup.string().when("t19", {
            is: 0,
            then: (schema) => schema.required("Vă rugăm să introduceți un răspuns.").typeError("Vă rugăm să introduceți un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        t20: yup.array().of(yup.string()),
        t20b: yup.string().when("t20", {
            is: (list) => list && !list.includes("4"),
            then: (schema) => schema.required("Vă rugăm să introduceți un răspuns.").typeError("Vă rugăm să introduceți un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
    });
}