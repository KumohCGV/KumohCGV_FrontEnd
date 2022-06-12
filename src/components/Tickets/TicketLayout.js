import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import Header from 'components/Layout/Header/header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Hidden, Box, Grid, Container, Typography, Button, Avatar, Fade, Grow, Divider } from '@mui/material';

const StyledLayout = styled.div`
    padding-top: 80px;
    margin: 0; /* margin default값으로 흰선 발생, 이를 제거 */
    font-family: 'Source Sans Pro';
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#BF2828',
        },
        secondary: {
            main: '#ffffff',
        },
    },
});

const TicketLayout = () => {
    return (
        <ThemeProvider theme={theme}>
            <StyledLayout>
                <Header />
                <Container component="main" maxWidth="md" sx={{ marginTop: '50px' }}>
                    <Outlet />
                </Container>
            </StyledLayout>
        </ThemeProvider>
    );
}
export default TicketLayout