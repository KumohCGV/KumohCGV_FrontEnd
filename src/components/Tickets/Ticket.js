import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Hidden, Box, Grid, Container, Typography, Button, Avatar, Fade, Grow, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Api from 'API/Api';

const Ticket = () => {
    const [postBody, setPostBody] = useState({
        film : '',
        screen: ''
    });    
    const testBody = [
        {
            grade: 15, //상영등급
            title: '브로커', //제목
            genre: '드라마', //장르(장르는 하나만 선택 가능하다고 제한)
            runtime: '129', //런타임
            startDate: '2022.06.08', //개봉일
            screen: 3, //상영관/층 | 총좌석 (상영관 종류는 2D만 있음)
            floor: 8, //마감된 상영은 회색으로, 상영 예정은 잔여좌석 표시
            totalSeat: 172,
            timeTable: [
                { screenId: 1, time: '10:20', extraSeats: 163, status: 'open' },
                { screenId: 2, time: '16:00', extraSeats: 133, status: 'open' },
                { screenId: 3, time: '18:40', extraSeats: 140, status: 'closed' }
            ],
        },
        {
            grade: 15, //상영등급
            title: '브로커', //제목
            genre: '드라마', //장르(장르는 하나만 선택 가능하다고 제한)
            runtime: '129', //런타임
            startDate: '2022.06.08', //개봉일
            screen: 4, //상영관/층 | 총좌석 (상영관 종류는 2D만 있음)
            floor: 8, //마감된 상영은 회색으로, 상영 예정은 잔여좌석 표시
            totalSeat: 124,
            timeTable: [
                { screenId: 4, time: '13:30', extraSeats: 84, status: 'open' },
            ],
        },
    ] 

    const [filmBody, setFilmBody] = useState([]);

    const [selectedIndex, setSelectedIndex] = useState(1);
    
    const handleListItemClick = async (event, index) => {
        setSelectedIndex(index);
        setPostBody((prev) => ({
            ...prev,
            film: index
        }));
        const response = await Api.getScreen(index);
        setFilmBody(response.data.data)
    };

    const [selectedScreen, setSelectedScreen] = useState(0);
    const [selectedData, setSelectedData] = useState(false);
    const handleScreen = (event, index) => {
        setSelectedScreen(index);
        setPostBody((prev) => ({
            ...prev,
            screen: index
        }));
        setSelectedData(true);
    }

    let navigate = useNavigate();
    const handleButton = () => {
        navigate('/ticket/detail', { state: postBody.screen });
    }

    return(
        <Grid maxHeight={'600px'}>
            {/* 영화섹션 */}
            <Grid sx={{width:'30%', float:'left', border: "1px solid grey"}}>
                <div style={{height:'40px', lineHeight:'40px', textAlign:'center', color:'white' , backgroundColor:'black'}}>영화</div>
                <div style={{height:'560px', paddingTop:'5px', textAlign:'center', backgroundColor:'#f2f0e5'}}>
                    <List component="nav" aria-label="film folders">
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemText primary="범죄도시2" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemText primary="브로커" />
                        </ListItemButton>
                    </List>
                </div>
            </Grid>
            {/* 시간섹션 */}
            <Grid sx={{width:'50%', float:'left', border: "1px solid grey"}}>
                <div style={{height:'40px', lineHeight:'40px', textAlign:'center', color:'white' , backgroundColor:'black'}}>시간</div>
                <div style={{height:'560px', paddingTop:'5px', backgroundColor:'#f2f0e5'}}>
                    <div className="info-timetable">
                        <List aria-label="screen folders">
                            {
                                filmBody.map(t => (
                                    <ListItemButton
                                        selected={selectedScreen === t.id}
                                        onClick={(event) => handleScreen(event, t.id)}
                                    >
                                        <ListItemText primary={t.startTime.substr(0,5)} />
                                        <div className="info-hall">
                                            <span>{t.theater.name}</span> | <span>{t.theater.floorCount}층</span> | <span>{t.restSeatCount}석/{t.theater.totalSeat}석</span>
                                        </div>
                                    </ListItemButton>
                                ))
                            }
                        </List>
                    </div>
                    <Divider />
                </div>
            </Grid>
            <Grid sx={{width:'20%', float:'left', paddingTop:'270px' }}>
                {
                    selectedData ?
                    <div style={{ height:'40px', lineHeight:'40px', textAlign:'center'}}>
                        <Button
                         variant="contained"
                         sx={{padding:4}}
                         onClick={handleButton}
                        ><ArrowForwardIcon/><p>좌석선택</p></Button>
                    </div>
                    :
                    <div style={{ height:'40px', lineHeight:'40px', textAlign:'center'}}>
                        <Button
                         variant="contained"
                         disabled
                         sx={{padding:4}}
                        ><ArrowForwardIcon/><p>좌석선택</p></Button>
                    </div>
                }
            </Grid>
        </Grid>
    )
}

export default Ticket