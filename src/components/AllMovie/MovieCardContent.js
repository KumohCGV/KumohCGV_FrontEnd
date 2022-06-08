import React from 'react';
import styled from "styled-components";
import { Link, Link as RouterLink } from 'react-router-dom';
import { Hidden, Box, Grid, Card, CardContent, Grow } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';

// const default_url = base_url + "/image/notfound.png";
const default_url =  "/image/notfound.png";

const StyledImg = styled.img`
    width: 70%;
    max-width: 150px;
   min-width: 30px;
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            // main: '#ffca00',
        },
        secondary: {
            main: '#ffb000',
        },
        white: {
            main: '#FFFFFF',
        },
    },
});

const MovieCardContent = (props) => {

    const { id, title } = props;

    return (
        <Grid key={id} item lg={3} md={3} sm={3} xs={3}>
            <Card>
                <CardContent
                    sx={{
                        fontSize: "22px"
                    }}>
                    <Link //링크여야함. a태그 href시 리랜더링 되기 때문.
                        to={{
                            pathname: `/detail/${id}`,
                            state: { movieId: id }
                        }}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div id={id + '-row-image'}
                            style={{
                                float: 'left',
                                width: '100%',
                                height: '100%',
                            }}>
                            <img
                                // src={base_url + image}
                                src={default_url}
                                style={{
                                    width: "100px",
                                    height: "150px",
                                    objectFit: "cover"
                                }}
                            />

                        </div>
                        <div
                            style={{
                                display: 'block',
                                height: '100%'
                            }}>
                            <div id={id + '-row-title'}>
                                <span style={{ fontSize: "75%", fontWeight: "bold" }}>{title}</span>
                            </div>
                        </div>
                    </Link>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default MovieCardContent