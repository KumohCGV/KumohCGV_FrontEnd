import React from 'react';
import styled from "styled-components";
import { Link, Link as RouterLink } from 'react-router-dom';
import { Hidden, Box, Grid, Container, Typography, Button, Avatar, Fade, Grow } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import MovieCard from "components/AllMovie/MovieCard"

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

const AllMovie = () => {
    return (
        <>
            <Hidden mdDown>
                <ThemeProvider theme={theme}>
                    <Container>
                        <Box class="contents">
                            <Box class="movieChartBeScreen_btn_wrap" sx={{ display: "block" }}>
                                정렬창
                            </Box>
                            <Box>
                                검색창
                            </Box>
                            <Box>
                                영화리스트
                                <MovieCard></MovieCard>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider >
            </Hidden>
        </>
    )
}

export default AllMovie