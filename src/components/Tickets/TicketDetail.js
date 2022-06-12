import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router";
import { Checkbox, Box, Grid, Container, Typography, Button, Avatar, Fade, Grow, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SquareIcon from '@mui/icons-material/Square';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import Api from 'API/Api';

const seatNo =['A','B','C','D','E']; 
const seatList = [];

const TicketDetail = () => {
    const { state } = useLocation();
    console.log(state)
    const [postBody, setPostBody] = useState([]);
    const [price, setPrice] = useState(0);
    const [nowPrice, setNowPrice] = useState(0);

    const handleSeat = (row, col, event) => {
        if(seatList.length < 4){
            event.currentTarget.parentNode.style.backgroundColor="#BF2828";
            seatList.push({row, col});
            setNowPrice(price * seatList.length);
            console.log(seatList)
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

    useEffect(() => {
        const getPrice = () => { // 'AMOUNT', 'RATE', 'NONE'
            if(postBody.discountType === 'NONE'){
                setPrice(postBody.screeningPrice)
            }
            else if(postBody.discountType === 'AMOUNT'){
                setPrice(postBody.screeningPrice-postBody.discountValue)
            }
            else if(postBody.discountType === 'RATE'){
                setPrice(postBody.screeningPrice*postBody.discountValue)
            }
        }
        getPrice();
    },[postBody])
    
    const now = new Date();
    const tomorrow = new Date(now.setDate(now.getDate() + 1));
    dayjs.locale('ko');
    const tomorrowFormat = dayjs(tomorrow).format("YYYY.MM.DD (ddd)");
    
    return (
        <Grid maxHeight={'520px'}>
            <div style={{height:'40px', lineHeight:'40px', textAlign:'center', color:'white' , backgroundColor:'black'}}>좌석</div>
            <div style={{height:'450px', paddingTop:'5px', textAlign:'center', backgroundColor:'#f2f0e5'}}>
                <Grid sx={{height:'20%'}}>
                    <div style={{textAlign:'center', }}>
                        {
                            postBody.startTime &&
                            <h2>{tomorrowFormat} {postBody.startTime.substr(0,5)}~{postBody.endTime.substr(0,5)}</h2>
                        }
                    </div>
                    <h3 style={{color:'red', marginLeft:'10px'}}> 가격 : {price}원 x {seatList.length}개 = {nowPrice}원 </h3>
                </Grid>
                <Divider/>
                <Grid sx={{height:'80%'}}>
                    <div title="SCREEN" style={{margin:'20px 120px', textAlign:'center', height:'25px', width:'600px', backgroundColor:'green'}}>
                        <span class="text">SCREEN</span>
                    </div>
                    <div style={{margin:'50px 210px'}}>
                        {
                            postBody.seatStatus && 
                            postBody.seatStatus.map((row, indexRow)=>(
                                <div style={{display:'block'}}>
                                    <span style={{marginRight: 10}}>{seatNo[indexRow]}</span>
                                    {
                                    row.map((element, indexCol)=>(
                                        element===false ?
                                        <div 
                                            style={{display: 'inline',
                                            textAlign: 'center',
                                            backgroundColor: 'grey',
                                            margin:1}}
                                        > 
                                            <IconButton 
                                                size="small"
                                                color='secondary'
                                                sx={{width:'36px', height:'36px'}}
                                                onClick={(event) => handleSeat(indexRow, indexCol,event)}
                                            >
                                                {indexCol + 1}
                                            </IconButton>
                                        </div> 
                                        :
                                        <div 
                                        style={{
                                        display: 'inline',
                                        textAlign: 'center',
                                        backgroundColor: 'lightGrey',
                                        margin:1
                                        }}
                                        > 
                                        <IconButton 
                                            size="small"
                                            color='secondary'
                                            sx={{width:'36px', height:'36px'}}
                                            disabled="true"
                                        >
                                            x
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
            <div style={{ marginTop:'10px', textAlign:'center'}}>
            <Button 
            fullwidth 
            variant="contained"
            sx={{padding:'15px 100px'}}
            onClick={reservation}
            >
                예매하기
            </Button>
            </div>
        </Grid>
    )
}

export default TicketDetail