import React, { useEffect, useState } from 'react';
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

    const handleChange = (event) => {
        setOrder(event.target.value);
    };

    const menuItemClick = (event) => {
        // 예매율순이나 평점순 MenuItem 클릭하면, 일단 api로 get해오기
    };

    const buttonClick = (event) => {
        // 검색 button 클릭 시에, 일단 영화제목이랑 영화배우를 담아 get해오기
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <Box class="contents">
                        <h2>무비차트</h2>
                        <Divider variant="middle" />
                        <Box class="movieChartBeScreen_btn_wrap" sx={{ display: "block" }}>
                            <Box sx={{ paddingTop: "30px", paddingBottom: "30px", maxWidth: 300 }}>
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
                        </Box>
                        <Box sx={{ paddingBottom: "30px" }}>
                            <Grid container spacing={1} >
                                <Grid item sx={{ width: '240px' }}>
                                    <TextField id="filled-basic" label="영화제목" variant="outlined"
                                        onChange={(event) => setMovieTitle(event.target.value)} />

                                </Grid>
                                <Grid item>
                                    <TextField id="filled-basic" label="영화배우" variant="outlined"
                                        onChange={(event) => movieActor(event.target.value)} />
                                </Grid>
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        color="grey"
                                        size='large'
                                        style={{ padding: "15px 0px", marginLeft: "10px" }}
                                    >
                                        <SearchIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ paddingTop: "30px" }}>
                            <MovieCard></MovieCard>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default AllMovie