import Elevi from '../../database/models/elevi';
import getValidationSchema from '../../components/Student/ValidationSchema';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, message: 'Method not allowed' });
        return;
    }

    const { category } = req.query;
    const availModels = {
        'elevi': Elevi,
    }

    if (!Object.keys(availModels).includes(category)) {
        res.status(404).json({success: false, message: 'Category not found'})
    }

    let schema = await getValidationSchema(process.env.BASE_URL);
    let fields = req.body;

    const endTime = Date.now();
    const finishTimeSeconds = Math.floor((endTime - fields.startTime) / 1000);
    fields["completition_time"] = finishTimeSeconds;

    if (schema.isValidSync(fields, { abortEarly: false }) && finishTimeSeconds / 60 > 1) {
        const responder = await availModels[category].findOne({ where: { email: fields.email } })
        if (responder) {
            res.status(200).json({ success: false, message: 'Respondent already submitted' })
            return;
        }

        const insertion = await availModels[category].create(fields);

        res.status(200).json({ success: true, message: `Response created. ID: ${insertion.id}` });
        return;
    }
    else {
        res.status(200).json({ success: false, message: 'Validation failed' });
        return;
    }
}
