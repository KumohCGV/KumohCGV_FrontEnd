import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router";
import { Hidden, Box, Grid, Container, Typography, Button, Avatar, Fade, Grow, Divider } from '@mui/material';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import Api from 'API/Api';


const TicketDetail = () => {
    const { state } = useLocation();
    //const [postBody, setPostBody] = useState([]);
    // const response = async () => await Api.getScreenDetail(state);

    // useEffect(() => {
    //     const getData = async () => {
    //         const resBody = await response();
    //         console.log(resBody.data.response[0].content);
    //         setPostBody(resBody.data.response[0].content);
    //     }
    //     getData();
    // }, []);
    const now = new Date();
    const tomorrow = new Date(now.setDate(now.getDate() + 1));
    dayjs.locale('ko');
    const tomorrowFormat = dayjs(tomorrow).format("YYYY.MM.DD (ddd)");

    const [postBody, setPostBody] = useState({
        discountType: '정률', 
        endTime: '13:19', 
        startTime: '11:00', 
        id: {state}, 
        screeningPrice: '11000', 
        totalSeats: 172,
        extraSeats: 163,
        seatStatus: [
            [
                true
            ]
        ],
    },);

    return (
        <Grid maxHeight={'540px'}>
            <div style={{height:'40px', lineHeight:'40px', textAlign:'center', color:'white' , backgroundColor:'black'}}>좌석</div>
            <div style={{height:'500px', paddingTop:'5px', textAlign:'center', backgroundColor:'#f2f0e5'}}>
                <Grid sx={{height:'20%'}}>
                    <h2>{tomorrowFormat} {postBody.startTime}~{postBody.endTime}</h2>
                    <span>남은 좌석 {postBody.extraSeats}/{postBody.totalSeats}</span>
                </Grid>
                <Divider/>
                <Grid sx={{height:'80%'}}>
                    <div title="SCREEN" style={{margin:'20px 120px', height:'25px', width:'600px', backgroundColor:'green'}}>
                        <span class="text">SCREEN</span>
                    </div>
                    <div style={{margin:'50px 220px', width:'400px', backgroundColor:'yellow'}}>
                        {
                            postBody.seatStatus.map(row=>(
                                <div style={{
                                    display: 'block',
                                    width: '15px',
                                    height: '15px',
                                    lineHeight: '15px',
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: '10px'
                                }}> 
                                    <span>{row}</span>
                                </div>
                            ))
                        }
                    </div>
                </Grid>
            </div>
            <Button fullwidth variant="contained">
                예매하기
            </Button>
        </Grid>
    )
}

export default TicketDetail