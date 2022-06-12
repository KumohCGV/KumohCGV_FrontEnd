import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from 'components/Layout/Header/header';
import { Container, Button, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import Api from "API/Api";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: '#BF2828',
        },
        secondary: {
            main: '#ffb000',
        },
    },
});

const Theater = () => {
    const [postBody, setPostBody] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const resBody = await Api.getTheater(1);
            console.log(resBody);
            setPostBody(resBody.data.data);
        }
        getData();
    }, []);

    let navigate = useNavigate();
    const [selectedScreen, setSelectedScreen] = useState(0);
    const handleScreen = (index) => {
        setSelectedScreen(index);
        navigate('/ticket/detail', { state: index });
    }

    const now = new Date();
    const tomorrow = new Date(now.setDate(now.getDate() + 1));
    dayjs.locale('ko');
    const tomorrowFormat = dayjs(tomorrow).format("M/DD ddd");

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" >
                <Header/>
                {
                    postBody[0] &&
                    <div style={{marginTop: '120px'}}>
                        <h2>구미CGV 상영시간표</h2>
                        <h3>{tomorrowFormat}</h3>
                        <div className="info-movie" style={{marginBottom: 10}}>
                                <a href={`detail/${postBody[0].film.id}`} >
                                    <strong style={{fontSize:'18px', color:'black' }}>{postBody[0].film.title}</strong>
                                </a>
                                <i>  {postBody[0].film.grade}세 이상</i> <i> / {postBody[0].film.genre}</i> <i>/ {postBody[0].film.runningTime}분</i> <i>/ {postBody[0].film.releaseDate} 개봉</i>
                        </div>
                        <div className="info-timetable" >
                            <List aria-label="screen folders">
                                {
                                    postBody.map(t => (
                                        !(t.restSeatCount === 0) ?
                                        <ListItemButton
                                            divider={true}
                                            selected={selectedScreen === t.id}
                                            onClick={() => handleScreen(t.id)}
                                        >
                                            <ListItemText primary={t.startTime.substr(0, 5)} />
                                            <div className="info-hall">
                                                <span>{t.theater.name}</span> | <span>{t.theater.floorCount}층</span> | <span>{t.restSeatCount}석/{t.theater.totalSeat}석</span>
                                            </div>
                                        </ListItemButton>
                                        :
                                        <ListItemButton
                                            divider={true}
                                            selected={selectedScreen === t.id}
                                            disabled='true'
                                            onClick={(event) => handleScreen(event, t.id)}
                                        >
                                            <ListItemText primary={t.startTime.substr(0, 5)} />
                                            <ListItemText primary="마감" />
                                            <div className="info-hall">
                                                <span>{t.theater.name}</span> | <span>{t.theater.floorCount}층</span> | <span>{t.restSeatCount}석/{t.theater.totalSeat}석</span>
                                            </div>
                                        </ListItemButton>
                                    ))
                                }
                            </List>
                        </div>
                    </div>
                }
            </Container>
        </ThemeProvider>            
    )
}

export default Theater