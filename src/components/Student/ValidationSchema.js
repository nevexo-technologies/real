import * as yup from 'yup';

export default async function getValidationSchema() {

    let localization = await fetch('/data/localization.json').then(data=>data.json());
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
        e09: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e10: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e11: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e12: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e13: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e14: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e15: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e16: yup.number().integer().min(0).max(1).required("Te rugăm să alegi un răspuns."),
        e18: yup.number().integer().min(1).max(4).required("Te rugăm să alegi un răspuns."),
        /*e12b: yup.number().integer().min(1).max(5).when("e12", {
            is: 1,
            then: (schema) => schema.required("Te rugăm să alegi un răspuns.").typeError("Te rugăm să alegi un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e12c: yup.number().integer().min(1).max(5).when("e12", {
            is: 1,
            then: (schema) => schema.required("Te rugăm să alegi un răspuns.").typeError("Te rugăm să alegi un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e12d: yup.number().integer().min(0).max(2).when("e12", {
            is: 1,
            then: (schema) => schema.required("Te rugăm să alegi un răspuns.").typeError("Te rugăm să alegi un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e13: yup.number().integer().min(0).max(1).required("Te rugăm să alegi un răspuns."),
        e13b: yup.number().integer().min(0).max(2).when("e13", {
            is: 1,
            then: (schema) => schema.required("Te rugăm să alegi un răspuns.").typeError("Te rugăm să alegi un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e13c: yup.number().integer().min(1).max(5).when("e13", {
            is: 1,
            then: (schema) => schema.required("Te rugăm să alegi un răspuns.").typeError("Te rugăm să alegi un răspuns."),
            otherwise: (schema) => schema.nullable()
        }),
        e14: yup.number().integer().min(0).max(4).required("Te rugăm să alegi un răspuns."),
        e15: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e16: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e17: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e18: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e19: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e20: yup.number().integer().min(1).max(5).required("Te rugăm să alegi un răspuns."),
        e21: yup.number().integer().min(0).max(2).required("Te rugăm să alegi un răspuns."),*/
    });
}