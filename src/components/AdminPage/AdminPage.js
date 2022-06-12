import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from 'components/Layout/Header/header';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import Api from "API/Api";
import ImplDiscount from "./implDiscount";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffca00',
        },
        secondary: {
            main: '#ffb000',
        },
    },
});

const AdminScreenPage = () => {
    const [postBody, setPostBody] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const resBody = await Api.getAdminScreen();
            console.log(resBody);
            setPostBody(resBody.data.data);
        }
        getData();
    }, []);

    const [selectedScreen, setSelectedScreen] = useState();

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
                        <h1>관리자 페이지</h1>
                            {/* <a href="/movies/detail/?midx=85829" target="_parent" >
                                <strong style={{fontSize:'22px', color:'black' }}>{postBody[0].film.title}</strong>
                            </a>
                            <i>  {postBody[0].film.grade}세 이상</i> <i> / {postBody[0].film.genre}</i> <i>/ {postBody[0].film.runningTime}분</i> <i>/ {postBody[0].film.releaseDate} 개봉</i> */}
                        <div className="info-movie" style={{margin: '30px 0 10px 0'}}>
                            <h3>실시간 상영 조회</h3>
                        </div>
                        <div className="info-timetable">
                            <List aria-label="screen folders">
                                {
                                    postBody.map(t => (
                                        <ImplDiscount screenId={t.id} postBody={t} selectedScreen={selectedScreen} setSelectedScreen={setSelectedScreen} />
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

export default AdminScreenPage