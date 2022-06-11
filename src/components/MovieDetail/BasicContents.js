import React from 'react';
import { Button, Grid } from '@mui/material';
import { base_url } from 'API/Url';

const default_url = base_url + "/image/notfound.png";

const MovieDetail = (props) => {
    const detail = props.detail;

    return (
        <>
            <Grid key={detail.id} item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: 5, marginBottom: "100px" }}>

                <div id={detail.id + '-row-image'}
                    style={{
                        float: 'left',
                        width: '20%',
                        height: '100%',
                        display: "grid",
                        paddingRight: 5,
                    }}>
                        <img
                            src={detail.thumbnail}
                            style={{
                                width: "220px",
                                height: "290px",
                                objectFit: "cover"
                            }}
                        />
                </div>
                <div
                    style={{
                        display: 'block',
                        height: '100%'
                    }}>
                    <div id={detail.id + '-row-title'} style={{ paddingTop: "30px" }}>
                        <span style={{ fontSize: "22px", fontWeight: "bold" }}>{detail.title}</span>
                    </div>
                    <div id={detail.id + '-row-rate'} style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "15px" }}>예매율 {detail.ticketRate}</span>
                    </div>
                    <div id={detail.id + '-row-star'} style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "15px" }}>평점 {detail.rating}</span>
                    </div>
                    <div id={detail.id + '-row-writer'} style={{ marginTop: "10px" }}>
                        <span style={{ fontSize: "15px" }}>감독 : {detail.director} / 
                        배우 : {detail.actor}</span>
                    </div>
                    <div id={detail.id + '-row-genre'}>
                        <span style={{ fontSize: "15px" }}>장르 : 드라마 / 
                        러닝타임 : {detail.movieDuration}분</span>
                    </div>
                    <div id={detail.id + '-row-genre'}>
                        <span style={{ fontSize: "15px" }}>개봉 : {detail.releaseDate}</span>
                    </div>
                    <div id={detail.id + '-row-rate'} style={{ marginTop: "20px" }}>
                        <span style={{ fontSize: "15px" }}>내용 : {detail.description}</span>
                    </div>
                    <div id={detail.id + 'button'} style={{ marginTop: "15px" }}>
                        <Button variant="contained" color="secondary" style={{ fontSize: "15px" }}>예매하기</Button>
                    </div>
                </div>

            </Grid>
        </>
    )
}

export default MovieDetail