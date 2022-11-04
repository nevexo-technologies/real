import studentSchema from '@components/Students/ValidationSchema';
import parentsSchema from '@components/Parents/ValidationSchema';
import teacherSchema from '@components/Teachers/ValidationSchema';
import { prisma } from "@real/database";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { category } = req.query;
    const forms = {
        'elevi': {
            schema: studentSchema,
            timeLimit: 60
        },
        'parinti': {
            schema: parentsSchema,
            timeLimit: 20
        },
        'profesori': {
            schema: teacherSchema,
            timeLimit: 45
        }
    };

    if (!Object.keys(forms).includes(category)) {
        res.status(404).json({ message: 'Form category not found.' })
    }

    let schema = await forms[category].schema(process.env.BASE_URL);

    let fields = req.body;

    const endTime = Date.now();
    const finishTimeSeconds = Math.floor((endTime - fields.startTime) / 1000);
    fields.completition_time = finishTimeSeconds;

    if (!schema.isValidSync(fields, { abortEarly: false })) {
        var validationErrors = [];
        await schema.validate(fields, { abortEarly: false }).catch(err => {
            let errors = err.inner.reduce((acc, error) => {
                return {
                    [error.path]: error.errors,
                    ...acc
                }
            }, {});

            validationErrors.push(errors);
        });

        res.status(400).json({ message: `Validation failed.`, errors: validationErrors });
        return;
    }

    if (finishTimeSeconds < forms[category].timeLimit) {
        res.status(400).json({ message: 'Form does not comply with anti-spam measures.' });
        return;
    }

    try {
        if (category === 'elevi') {
            const insertion = await prisma.elev.create({
                data: {
                    ...fields
                }
            });
        }

        if (category === 'profesori') {
            const insertion = await prisma.profesor.create({
                data: {
                    ...fields
                }
            });
        }

        if (category === 'parinte') {
            const insertion = await prisma.parinte.create({
                data: {
                    ...fields
                }
            });
        }

        res.status(200).json({ message: `Response created. ID: ${insertion.id}` });
        return;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                res.status(409).json({ message: 'Email already submitted a response.' })
                return;
            }
        }
    }
}
