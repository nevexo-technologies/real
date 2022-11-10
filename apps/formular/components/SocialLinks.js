import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/FacebookRounded";
import WebIcon from "@mui/icons-material/Language";
import { Grid, Link } from "@mui/material";

export default function SocialLinks() {
    return (
        <Grid item xs={12} sm={12}>
            <p>Urmarește-ne pe:</p>
            <Link href="https://www.instagram.com/estereal.ro" >
                <InstagramIcon sx={{ mr: 1 }} />
            </Link>
            <Link href="http://fb.com/registruleducationalalternativ">
                <FacebookIcon sx={{ mx: 1 }} />
            </Link>
            <Link href="https://estereal.ro">
                <WebIcon sx={{ mx: 1 }} />
            </Link>
        </Grid>
    )
}