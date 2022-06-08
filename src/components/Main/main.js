import React from 'react';
import styled from "styled-components";
import { Link, Link as RouterLink } from 'react-router-dom';
import { Hidden, Box, Grid, Container, Typography, Button, Avatar, Fade, Grow } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';

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

const Main = () => {
    return (
        <>
            <Hidden mdDown>
                <ThemeProvider theme={theme}>
                    <Container>
                        <Box class="contents">
                            <Box class="movieChartBeScreen_btn_wrap" sx={{ display: "block" }}>
                                <Box class="tabBtn_wrap">
                                    <h3>
                                        <a href="#none" style={{ textDecoration: 'none', color: "black" }}>현재상영작</a>
                                    </h3>
                                </Box>
                                <a href="/allmovie" style={{ textDecoration: 'none', color: "black", float: "right" }}>
                                    <Button variant="contained">전체보기</Button>
                                </a>
                            </Box>
                            <Box>

                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider >
            </Hidden>
        </>
    )
}

export default Main