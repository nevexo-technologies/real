import { Box, Card, CardContent, LinearProgress, linearProgressClasses, LinearProgressProps, styled, Typography } from "@mui/material";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${(props.value / 10).toFixed(2)
                    }`}</Typography>
            </Box>
        </Box>
    );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
    },
}));

export default function MetricCard({ title, score }: { title: string, score: number }) {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>{title}</Typography>
                <LinearProgressWithLabel variant="determinate" value={score * 10} />
            </CardContent>
        </Card>
    )
}