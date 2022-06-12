import React, { useEffect, useState } from 'react';
import { Box, Container, Button} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slider from "components/Main/Slider"
import Api from 'API/Api';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            // main: '#F75690',
        },
        secondary: {
            main: '#BF2828',
        },
        white: {
            main: '#FFFFFF',
        },
    },
});

const Main = () => {
    const paging_size = 5;
    const [getBody, setGetBody] = useState([]);
    const [isLast, setIsLast] = useState();

    const resSlider = async () => await Api.getNowMovie(0, paging_size, "ticketRate,desc");

    useEffect(() => {
        const getData = async () => {
            const resBody = await resSlider();
            setGetBody(resBody.data.data.content);
            setIsLast(resBody.data.data.last);
            console.log(resBody);
          }
          getData();
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <Box class="contents">
                        <Box class="movieChartBeScreen_btn_wrap" sx={{ display: "block" }}>
                            <h3>
                                <a href="/" style={{ textDecoration: 'none', color: "black" }}>현재상영작</a>
                            </h3>
                            <a href="/allmovie" style={{ textDecoration: 'none', color: "black", float: "right" }}>
                                <Button color="secondary" variant="contained" sx={{ marginBottom: 2 }}>전체보기</Button>
                            </a>
                        </Box>
                        <Slider getBody={getBody} setGetBody={setGetBody} isLast={isLast} setIsLast={setIsLast}></Slider>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default Main