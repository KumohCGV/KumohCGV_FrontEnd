import React, { useEffect, useState } from 'react';
import Api from 'API/Api';
import styled from "styled-components";
import { TextField, Box, Grid, Divider, Container, InputLabel, Button, MenuItem, FormControl, Select } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MovieCard from "components/AllMovie/MovieCard"
import SearchIcon from '@mui/icons-material/Search';

const StyledImg = styled.img`
    width: 70%;
    max-width: 150px;
   min-width: 30px;
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            // main: '#000000',
        },
        secondary: {
            main: '#ef1120',
        },
        white: {
            main: '#FFFFFF',
        },
    },
});

const AllMovie = () => {
    const [order, setOrder] = useState(''); // 정렬순: 예매율순, 평점순
    const [movieTitle, setMovieTitle] = useState('');
    const [movieActor, setMovieActor] = useState('');

    const [getBody, setGetBody] = useState([]);

    const resMovie = async () => await Api.getAllMovie(order);

    useEffect(() => {
        const getData = async () => {
            const movieBody = await resMovie();
            console.log(movieBody);
            setGetBody(movieBody.data.data.content);
          }
          getData();
    }, []);

    const handleChange = (event) => {
        setOrder(event.target.value);
    };

    const sortClick = async (event) => {
        // 예매율순이나 평점순 MenuItem 클릭하면, 일단 api로 get해오기
        const resMovie = async () => await Api.getAllMovie(order);
        const movieBody = await resMovie();
        setGetBody(movieBody.data.data.content);
    };

    const searchClick = async (event) => {
        // 검색 button 클릭 시에, 일단 영화제목이랑 영화배우를 담아 get해오기
        const resMovie = async () => await Api.getAllMovie(movieTitle, movieActor);
        const movieBody = await resMovie();
        setGetBody(movieBody.data.data.content);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <Box class="contents">
                        <h2>무비차트</h2>

                        <Divider variant="middle" />

                        <Box class="movieChartBeScreen_btn_wrap" sx={{ display: "block" }}>
                            <Grid container spacing={1} >
                                <Grid item >
                                    <Box sx={{ paddingTop: "30px", paddingBottom: "30px", minWidth: 200, maxWidth: 300 }}>
                                        <FormControl fullWidth >
                                            <InputLabel id="demo-simple-select-label" >정렬순</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={order}
                                                label="정렬순"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>예매율순</MenuItem>
                                                <MenuItem value={20}>평점순</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item >
                                    <Box sx={{ paddingTop: "30px", paddingBottom: "30px" }}>
                                        <Button
                                            variant="contained"
                                            color="grey"
                                            size='large'
                                            style={{ padding: "15px 0px", marginLeft: "10px" }}
                                            onClick={sortClick}
                                        >
                                            <SearchIcon />
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ paddingBottom: "30px" }}>
                            <Grid container spacing={1} >
                                <Grid item sx={{ width: '220px' }}>
                                    <TextField id="filled-basic" label="영화제목" variant="outlined"
                                        onChange={(event) => setMovieTitle(event.target.value)} />

                                </Grid>
                                <Grid item>
                                    <TextField id="filled-basic" label="영화배우" variant="outlined"
                                        onChange={(event) => setMovieActor(event.target.value)} />
                                </Grid>
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        color="grey"
                                        size='large'
                                        style={{ padding: "15px 0px", marginLeft: "10px" }}
                                        onClick={searchClick}
                                    >
                                        <SearchIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider variant="middle" />

                        <Box sx={{ paddingTop: "30px" }}>
                            <MovieCard getBody={getBody} ></MovieCard>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default AllMovie