import Elevi from '../../database/models/formStudents';
import Parinti from '../../database/models/formParents';
import Profesori from '../../database/models/formTeachers';

import studentSchema from '../../components/Students/ValidationSchema';
import parentsSchema from '../../components/Parents/ValidationSchema';
import teacherSchema from '../../components/Teachers/ValidationSchema';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, message: 'Method not allowed' });
        return;
    }

    const { category } = req.query;
    const forms = {
        'elevi': {
            model: Elevi,
            schema: studentSchema,
            timeLimit: 60
        },
        'parinti': {
            model: Parinti,
            schema: parentsSchema,
            timeLimit: 20
        },
        'profesori': {
            model: Profesori,
            schema: teacherSchema,
            timeLimit: 45
        }
    }

    if (!Object.keys(forms).includes(category)) {
        res.status(404).json({ success: false, message: 'Category not found' })
    }

    let schema = await forms[category].schema(process.env.BASE_URL);

    let fields = req.body;

    const endTime = Date.now();
    const finishTimeSeconds = Math.floor((endTime - fields.startTime) / 1000);
    fields["completition_time"] = finishTimeSeconds;


    if (!schema.isValidSync(fields, { abortEarly: false })) {
        var validationErrors = [];
        await schema.validate(fields, { abortEarly: false }).catch(err => {
            let errors = err.inner.reduce((acc, error) => {
                return {
                    [error.path]: error.errors,
                    ...acc
                }
            }, {})

            validationErrors.push(errors);
        });

        res.status(200).json({ success: false, message: `Validation failed.`, errors: validationErrors });
        return;
    }

    if (finishTimeSeconds < forms[category].timeLimit) {
        res.status(200).json({ success: false, message: 'Limit time not passed.' });
        return;
    }

    const responder = await forms[category].model.findOne({ where: { email: fields.email } })
    if (responder) {
        res.status(200).json({ success: false, message: 'Respondent already submitted' })
        return;
    }

    const insertion = await forms[category].model.create(fields);

    res.status(200).json({ success: true, message: `Response created. ID: ${insertion.id}` });
    return;
}
