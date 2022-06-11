import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { base_url } from 'API/Url';

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

const MovieCardContent = (props) => {

    const { id, order, title, thumbnail, ticketRate, rating } = props;

    return (
        <Grid key={id} item lg={3} md={3} sm={3} xs={3}>
            <Card>
                <CardContent
                    sx={{
                        fontSize: "22px",
                        textAlign: "center"
                    }}>
                    <Link //링크여야함. a태그 href시 리랜더링 되기 때문.
                        to={{
                            pathname: `/detail/${id}`,
                            state: { movieId: id }
                        }}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div id={id + '-row-order'} style={{ backgroundColor: "#BF2828" }}>
                            <span style={{ fontSize: "75%", fontWeight: "bold", color: "white" }}>NO. {(order + 1)}</span>
                        </div>

                        <div id={id + '-row-image'}
                            style={{
                                float: 'left',
                                width: '100%',
                                height: '100%',
                            }}>
                            <img
                                src={base_url + thumbnail}
                                style={{
                                    width: "100px",
                                    height: "150px",
                                    objectFit: "cover"
                                }}
                            />

                        </div>
                        <div
                            style={{
                                display: 'block',
                                height: '100%'
                            }}>
                            <div id={id + '-row-title'} style={{ minHeight: "215px" }}>
                                <span style={{ fontSize: "70%", fontWeight: "bold" }}>{title}</span>
                            </div>
                            <div id={id + '-row-rate'}>
                                <span style={{ fontSize: "60%" }}>예매율 {(ticketRate*100)}%</span>
                            </div>
                            <div id={id + '-row-star'}>
                                <span style={{ fontSize: "60%" }}>평점 {rating}</span>
                            </div>
                        </div>
                    </Link>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default MovieCardContent