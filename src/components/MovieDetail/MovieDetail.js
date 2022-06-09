import React from 'react';
import styled from "styled-components";
import { Link, Link as RouterLink } from 'react-router-dom';
import { Box, Grid, Container, Divider, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicContents from "components/MovieDetail/BasicContents"
import { getBody } from 'components/TestData';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            // main: '#ffca00',
        },
        secondary: {
            main: '#F75690',
        },
        white: {
            main: '#FFFFFF',
        },
    },
});

const MovieDetail = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container >
                    <Box class="basic_contents">
                        <BasicContents getBody={getBody} />
                    </Box>
                    <Divider variant="middle" />

                    <Box class="static_contents">
                        통계정보
                    </Box>

                    <Divider variant="middle" />
                    <Box class="comment_contents">
                        댓글 CRUD
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default MovieDetail