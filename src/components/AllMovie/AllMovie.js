import React, { useEffect, useState } from 'react';
import Api from 'API/Api';
import { TextField, Box, Grid, Divider, Container, InputLabel, Button, MenuItem, FormControl, Select, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MovieCard from "components/AllMovie/MovieCard"
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            // main: '#000000',
        },
        secondary: {
            main: '#BF2828',
        },
        white: {
            main: '#FFFFFF',
        },
    },
});

const AllMovie = () => {
    const [order, setOrder] = useState('ticketRate,desc'); // 정렬순: 예매율순(ticketRate,des), 평점순(rate,des)
    const [value, setValue] = useState('영화제목'); // 라디오 버튼: 영화제목, 영화배우
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

    // const handleChangeValue = (event) => {
    //     setValue(event.target.value);
    // };

    const sortClick = async (event) => {
        // 예매율순이나 평점순 MenuItem 클릭하면, 일단 api로 get해오기
        const resMovie = async () => await Api.getAllMovie(order, movieTitle, movieActor);
        const movieBody = await resMovie();
        setGetBody(movieBody.data.data.content);
        console.log(movieBody);
    };

    const titleClick = async (event) => {
        // 검색 button 클릭 시에, 일단 영화제목이랑 영화배우를 담아 get해오기
        const resMovie = async () => await Api.getMovieTitle(order, movieTitle, movieActor);
        const movieBody = await resMovie();
        setGetBody(movieBody.data.data.content);
    };

    // const actorClick = async (event) => {
    //     // 검색 button 클릭 시에, 일단 영화제목이랑 영화배우를 담아 get해오기
    //     const resMovie = async () => await Api.getMovieActor(order, movieActor);
    //     const movieBody = await resMovie();
    //     setGetBody(movieBody.data.data.content);
    //     console.log("배우:", movieBody);
    // };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <Box class="contents">
                        <h2>무비차트</h2>

                        <Divider variant="middle" />

                        {/* 여기는 정렬관련 코드 */}

                        <Box class="movieChartBeScreen_btn_wrap" sx={{ display: "block" }}>
                            <Grid container spacing={1} >
                                <Grid item >
                                    <Box sx={{ paddingTop: "30px", marginBottom: "30px", minWidth: 210 }}>
                                        <FormControl fullWidth >
                                            <InputLabel id="demo-simple-select-label" >정렬순</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={order}
                                                label="정렬순"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value='ticketRate,desc'>예매율순</MenuItem>
                                                <MenuItem value='rating,desc'>평점순</MenuItem>
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
                                            style={{ padding: "15px 0px", marginLeft: "3px" }}
                                            onClick={sortClick}
                                        >
                                            <SearchIcon />
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* 여기는 검색관련 코드 */}

                        <Box sx={{ paddingBottom: "30px" }}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">검색어를 입력하세요!</FormLabel>

                                <Grid container spacing={1} sx={{ marginTop: "10px", marginBottom: "5px" }} >
                                    <Grid item sx={{ width: '220px' }}>
                                        <TextField id="filled-basic-title" label="영화제목" variant="outlined"
                                            onChange={(event) => setMovieTitle(event.target.value)} />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="filled-basic-actor" label="영화배우" variant="outlined"
                                            onChange={(event) => setMovieActor(event.target.value)} />
                                    </Grid>
                                    <Grid item >
                                        <Button
                                            variant="contained"
                                            color="grey"
                                            size='large'
                                            style={{ padding: "15px 0px", marginLeft: "3px", marginRight: "10px" }}
                                            onClick={titleClick}
                                        >
                                            <SearchIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>

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