import React from 'react';
import styled from "styled-components";
import { Link, Link as RouterLink } from 'react-router-dom';
import { Hidden, Box, Grid, Container, Typography, Button, Avatar, Fade, Grow } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import MovieCardContent from "components/AllMovie/MovieCardContent"

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

const getBody = {
    data: [
        {
            "id": 1,
            "title": "쥬라기월드"
        },
        {
            "id": 2,
            "title": "범죄도시2"
        },

    ]

}

const MovieCard = () => {
    return (
        <>
            <Box pb={2}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {
                        getBody.data.map(row => (<
                            MovieCardContent key={row.id}
                            id={row.id}
                            title={row.title}
                        />
                        ))
                    }
                </Grid>
            </Box >
        </>
    )
}

export default MovieCard