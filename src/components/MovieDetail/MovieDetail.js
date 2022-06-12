import React, { useEffect, useState } from 'react';
import Api from 'API/Api';
import { Box, Grid, Container, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicContents from "components/MovieDetail/BasicContents"
import CreateComment from "components/MovieDetail/Comment/createComment/createComment";
import ReadComment from "components/MovieDetail/Comment/readComment/readComment";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, Title, BarElement, LinearScale } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, Title, BarElement, LinearScale);

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
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
    const movieId = window.location.href
    .split('/')[window.location.href.split('/').length - 1].split('.')[0];

    const [detail, setDetail] = useState('');
    const [statis, setStatis] = useState('');
    const [comment, setComment] = useState([]);

    const resDetail = async () => await Api.getMovieDetail(movieId);
    const resStatis = async () => await Api.getMovieStatistic(movieId);
    const resComment = async () => await Api.getReadComment(movieId);

    useEffect(() => {
        const getData = async () => {
            const detailBody = await resDetail();
            const statisBody = await resStatis();
            const commentBody = await resComment();
            console.log(commentBody);
            setDetail(detailBody.data.data);
            setStatis(statisBody.data.data);
            setComment(commentBody.data.data.content);
          }
          getData();
    }, []);

    const customPieChart = {
        plugins: ["남성", "여성"],
        labels: ["남성", "여성"],
        datasets: [
            {
                labels: ["남성", "여성"],
                data: [statis.maleRate, statis.femaleRate],
                borderWidth: 2,
                hoverBorderWidth: 3,
                backgroundColor: [
                    "rgba(98, 181, 229, 1)",
                    "rgba(238, 102, 121, 1)",
                ],
                fill: true
            }
        ]
    };
    
    const custombarChart = {
        plugins: ["10대", "20대", "30대", "40대", "50대"],
        labels: ["10대", "20대", "30대", "40대", "50대"],
        datasets: [
            {
                labels: ["10대", "20대", "30대", "40대", "50대"],
                data: [statis.age10Rate, statis.age20Rate,
                    statis.age30Rate, statis.age40Rate, statis.age50Rate],
                borderWidth: 2,
                hoverBorderWidth: 3,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                fill: true
            }
        ]
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container fixed sx={{ overflowY: "hidden" }} >
                    <Box class="basic_contents">
                        <BasicContents detail={detail} />
                    </Box>

                    <Divider variant="middle" />

                    <Box class="static_contents">
                        <Grid container spacing={1} sx={{ justifyContent: "center", paddingTop: 5 }}>
                            <Grid lg={3} md={3} sm={3} xs={3}>
                                <Box class="sex_chart">
                                    <Doughnut
                                        options={{
                                            plugins: {
                                                legend: {
                                                    display: true,
                                                    position: "right"
                                                },
                                                title: {
                                                    display: true,
                                                    text: '성별 예매 분포',
                                                },
                                            }
                                        }}
                                        data={customPieChart}
                                        label={customPieChart.data}
                                        height={120}
                                    />
                                </Box>
                            </Grid>
                            <Grid lg={5} md={5} sm={5} xs={5}>
                                <Box class="age_chart">
                                    <Bar
                                        options={{
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                                title: {
                                                    display: true,
                                                    text: '연령별 예매 분포',
                                                },
                                            }
                                        }}
                                        data={custombarChart}
                                        label={custombarChart.data}
                                        height={120}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider variant="middle" />

                    <Box class="comment_contents" >
                        <CreateComment movieId={movieId} />
                        <ReadComment comment={comment} movieId={movieId}></ReadComment>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default MovieDetail