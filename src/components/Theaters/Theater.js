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
const StyledLayout = styled.div`
    padding-top: 80px;
    margin: 0; /* margin default값으로 흰선 발생, 이를 제거 */
    font-family: 'Source Sans Pro';
`;

const MainLayoutWrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
    overflow: hidden;
    paddingTop: 64;
`;

const MainLayoutContainer = styled.div`
    display: flex;
    flex: 1 1 auto;
    overflow: hidden;
`;

const MainLayoutContent = styled.div`
    flex: 1 1 auto;
    height: 100%;
    overflow: auto;
    backgrond-color: white;
    margin-left: 100px;
    margin-right: 100px;
`;

const Lists = styled.ul`
  list-style: none;
  margin: auto;
  padding: 0;
`;

const Item = styled.li`
  padding: 12px 12px; /* 마우스 클릭영역 확보 */

  a {
    display: flex;
    position: relative;
    font-size: 22px;
    text-decoration: none;
    color: black;
  }
`;

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
    const [selectedScreen, setSelectedScreen] = useState(0);
    const [selectedData, setSelectedData] = useState(false);
    const handleScreen = (event, index) => {
        setSelectedScreen(index);
        setSelectedData(true);
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
                        <h1>상영시간표</h1>
                        <h2>{tomorrowFormat}</h2>
                        <div className="info-movie" style={{marginBottom: 10}}>
                                <a href="/movies/detail/?midx=85829" target="_parent" >
                                    <strong style={{fontSize:'22px', color:'black' }}>{postBody[0].film.title}</strong>
                                </a>
                                <i>  {postBody[0].film.grade}세 이상</i> <i> / {postBody[0].film.genre}</i> <i>/ {postBody[0].film.runningTime}분</i> <i>/ {postBody[0].film.releaseDate} 개봉</i>
                        </div>
                        <div className="info-timetable">
                            <List aria-label="screen folders">
                                {
                                    postBody.map(t => (
                                        !(t.restSeatCount === 0) ?
                                        <ListItemButton
                                            selected={selectedScreen === t.id}
                                            onClick={(event) => handleScreen(event, t.id)}
                                        >
                                            <ListItemText primary={t.startTime.substr(0, 5)} />
                                            <div className="info-hall">
                                                <span>{t.theater.name}</span> | <span>{t.theater.floorCount}층</span> | <span>{t.restSeatCount}석/{t.theater.totalSeat}석</span>
                                            </div>
                                        </ListItemButton>
                                        :
                                        <ListItemButton
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