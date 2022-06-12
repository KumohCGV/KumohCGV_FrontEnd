import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Hidden, Box, Grid, Container, Typography, Button, Avatar, Fade, Grow, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Api from 'API/Api';

const Ticket = () => {
    const [filmBody, setFilmBody] = useState([]);

    const [selectedIndex, setSelectedIndex] = useState(1);
    
    const handleListItemClick = async (event, index) => {
        setSelectedIndex(index);

        const response = await Api.getScreen(index);
        console.log(response.data.data)
        setFilmBody(response.data.data)
    };

    const [selectedScreen, setSelectedScreen] = useState(0);
    const [selectedData, setSelectedData] = useState(false);
    const handleScreen = (event, index) => {
        setSelectedScreen(index);
        setSelectedData(true);
    }

    let navigate = useNavigate();
    const handleButton = () => {
        navigate('/ticket/detail', { state: selectedScreen });
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