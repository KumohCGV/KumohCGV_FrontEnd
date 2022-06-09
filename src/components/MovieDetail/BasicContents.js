import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Button, Box, Grid, Container, CardContent, Card } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { base_url } from 'API/Url';

const default_url = base_url + "/image/notfound.png";

const MovieDetail = (props) => {
    const id = props.id;
    const image = props.image;

    return (
        <>
            <Grid key={id} item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: 5, marginBottom: "100px" }}>

                <div id={id + '-row-image'}
                    style={{
                        float: 'left',
                        width: '20%',
                        height: '100%',
                        display: "grid",
                    }}>
                    {(image != null) ?
                        <img
                            src={base_url + image}
                            style={{
                                width: "220px",
                                height: "290px",
                                objectFit: "cover"
                            }}
                        /> :
                        <img
                            src={default_url}
                            style={{
                                width: "220px",
                                height: "290px",
                                objectFit: "cover"
                            }}
                        />
                    }
                </div>
                <div
                    style={{
                        display: 'block',
                        height: '100%'
                    }}>
                    <div id={id + '-row-title'} style={{ paddingTop: "30px" }}>
                        <span style={{ fontSize: "22px", fontWeight: "bold" }}>제목</span>
                    </div>
                    <div id={id + '-row-rate'} style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "15px" }}>예매율</span>
                    </div>
                    <div id={id + '-row-star'} style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "15px" }}>평점</span>
                    </div>
                    <div id={id + '-row-writer'} style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "15px" }}>감독 : 고레에다 히로카즈 / 배우 :
                            송강호 ,  강동원 ,  배두나 ,  이지은 ,  이주영</span>
                    </div>
                    <div id={id + '-row-genre'}>
                        <span style={{ fontSize: "15px" }}>장르 : 드라마 / 기본 :
                            12세 이상, 129분, 한국</span>
                    </div>
                    <div id={id + '-row-genre'}>
                        <span style={{ fontSize: "15px" }}>개봉 :
                            2022.06.08</span>
                    </div>
                    <div id={id + 'button'} style={{ marginTop: "15px" }}>
                        <Button variant="contained" color="secondary" style={{ fontSize: "15px" }}>예매하기</Button>
                    </div>
                </div>

            </Grid>
        </>
    )
}

export default MovieDetail