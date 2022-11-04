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
        age: yup.number().integer().min(12, "Vârsta minimă este de 12 de ani.").max(26, "Vârsta maxima este de 26 de ani.").required("Te rugăm să îți introduci vârsta."),
        location: yup.string().oneOf(locationOptions, "Locația selectată nu există în baza de date.").required("Te rugăm să îți alegi localitatea."),
        hs: yup.string().oneOf(hsOptions, "Liceul selectat nu există în baza de date.").required("Te rugăm să îți alegi unitatea de învățământ.").typeError("Te rugăm să îți alegi unitatea de învățământ."),
        class: yup.number().integer().min(9).max(12).required("Te rugăm să îți alegi clasa."),
        letter: yup.string().required("Te rugăm să îți introduci litera clasei."),
        eth: yup.string().required("Te rugăm să alegi o valoare."),
        eth_full: yup.string().when("eth", {
            is: "ALTA",
            then: (schema) => schema.required("Te rugăm să introduci un răspuns.").typeError("Te rugăm să introduci un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e10: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e11: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e12: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e13: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e14: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e15: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e16: yup.number().integer().min(-1).max(1).required("Te rugăm să alegi un răspuns."),
        e17: yup.string(),
        e18: yup.number().integer().min(-1).max(4).required("Te rugăm să alegi un răspuns."),
        e19: yup.array().of(yup.string()),
        e20: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e21: yup.array().of(yup.string()),
        e22: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e23: yup.number().integer().min(-1).max(2).required("Te rugăm să alegi un răspuns."),
        e24: yup.number().integer().min(-1).max(2).required("Te rugăm să alegi un răspuns."),
        e24b: yup.number().integer().min(-1).max(5).when("e24", {
            is: 2,
            then: (schema) => schema.required("Te rugăm să alegi un răspuns.").typeError("Te rugăm să alegi un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e25: yup.number().integer().min(-1).max(2).required("Te rugăm să alegi un răspuns."),
        e25b: yup.number().integer().min(-1).max(5).when("e25", {
            is: 2,
            then: (schema) => schema.required("Te rugăm să alegi un răspuns.").typeError("Te rugăm să alegi un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e26: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e27: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e28: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e29: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e30: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e31: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e32: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e33: yup.array().of(yup.string()),
        e34: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e35: yup.number().integer().min(-1).max(2).required("Te rugăm să alegi un răspuns."),
        e36: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e37: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e38: yup.array().of(yup.string()),
        e38b: yup.string().when("e38", {
            is: (list) => list && !list.includes("4"),
            then: (schema) => schema.required("Te rugăm să introduci un răspuns.").typeError("Te rugăm să introduci un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e39: yup.number().integer().min(-1).max(2).required("Te rugăm să alegi un răspuns."),
        e39b: yup.string().when("e39", {
            is: (choice) => choice == 0 || choice == 1,
            then: (schema) => schema.required("Te rugăm să introduci un răspuns.").typeError("Te rugăm să introduci un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e40: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
        e41: yup.array().of(yup.string()),
        e41b: yup.string().when("e41", {
            is: (list) => list && !list.includes("4"),
            then: (schema) => schema.required("Te rugăm să introduci un răspuns.").typeError("Te rugăm să introduci un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e43: yup.number().integer().min(-1).max(5).required("Te rugăm să alegi un răspuns."),
    });
}