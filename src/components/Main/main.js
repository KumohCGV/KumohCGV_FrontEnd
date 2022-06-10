import React from 'react';
import { Box, Container, Button} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slider from "components/Main/Slider"
import { getBody } from 'components/TestData';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            // main: '#F75690',
        },
        secondary: {
            main: '#F75690',
        },
        white: {
            main: '#FFFFFF',
        },
    },
});

const Main = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <Box class="contents">
                        <Box class="movieChartBeScreen_btn_wrap" sx={{ display: "block" }}>
                            <h3>
                                <a href="#none" style={{ textDecoration: 'none', color: "black" }}>현재상영작</a>
                            </h3>
                            <a href="/allmovie" style={{ textDecoration: 'none', color: "black", float: "right" }}>
                                <Button color="secondary" variant="contained" sx={{ marginBottom: 2 }}>전체보기</Button>
                            </a>
                        </Box>
                        <Slider arr={getBody.data}></Slider>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default Main