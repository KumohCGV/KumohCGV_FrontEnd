import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router";
import { Checkbox, Box, Grid, Container, Typography, Button, Avatar, Fade, Grow, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SquareIcon from '@mui/icons-material/Square';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import Api from 'API/Api';

const seatNo =['A','B','C','D','E']; 

const TicketDetail = () => {
    const { state } = useLocation();
    const [postBody, setPostBody] = useState([]);
    
    const seatList = [];
    const handleSeat = (row, col) => {
        if(seatList.length < 4){
            seatList.push({row, col});
            console.log(seatList);
        }
    }

    const ticketData = {
        screeningId: state,
        seatList: seatList
    }

    const reservation = async () => {
        const response = await Api.postTickets(ticketData);
        if (response.data.status === "success") {
            const target = '/mypage';
            window.location.href = target;
          }
          else if(response.data.status === "fail") {
            alert('예매실패');
          }
    }

    useEffect(() => {
        const getData = async () => {
            const resBody = await Api.getScreenDetail(state);
            console.log(resBody.data.data);
            setPostBody(resBody.data.data);
        }
        getData();
    },[]);
    
    const now = new Date();
    const tomorrow = new Date(now.setDate(now.getDate() + 1));
    dayjs.locale('ko');
    const tomorrowFormat = dayjs(tomorrow).format("YYYY.MM.DD (ddd)");
    
    // 'AMOUNT', 'RATE', 'NONE'
    const [testBody, setTestBody] = useState({
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
                    {
                        postBody.startTime &&
                        <h2>{tomorrowFormat} {postBody.startTime.substr(0,5)}~{postBody.endTime.substr(0,5)}</h2>
                    }
                    <span>가격</span>
                </Grid>
                <Divider/>
                <Grid sx={{height:'80%'}}>
                    <div title="SCREEN" style={{margin:'20px 120px', height:'25px', width:'600px', backgroundColor:'green'}}>
                        <span class="text">SCREEN</span>
                    </div>
                    <div style={{margin:'50px 210px',  backgroundColor:'yellow'}}>
                        {
                            postBody.seatStatus && 
                            postBody.seatStatus.map((row, indexRow)=>(
                                <div style={{display:'block'}}>
                                    <span style={{marginRight: 10}}>{seatNo[indexRow]}</span>
                                    {
                                    row.map((element, indexCol)=>(
                                        <div 
                                            style={{
                                            display: 'inline',
                                            lineHeight: '30px',
                                            textAlign: 'center',
                                            fontSize: '15px',
                                            color: '#fff',
                                            backgroundColor: 'grey',
                                            margin:1
                                            }}
                                        > 
                                            {/* <Button
                                                sx={{ padding: 0 }}
                                                onClick={() => handleSeat(indexRow, indexCol)}>
                                                {indexCol + 1}
                                            </Button> */}
                                            <IconButton size="small"
                                                onClick={() => handleSeat(indexRow, indexCol)}
                                            >
                                                {indexCol + 1}
                                            </IconButton>
                                        </div>
                                    ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </Grid>
            </div>
            <Button 
            fullwidth 
            variant="contained"
            onClick={reservation}
            >
                예매하기
            </Button>
        </Grid>
    )
}

export default TicketDetail