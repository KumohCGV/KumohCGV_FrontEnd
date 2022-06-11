import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Button, Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommentCard from 'components/MovieDetail/Comment/readComment/CommentCard';


const ReadComment = (props) => {
    return (
        <>
            <Grid item lg={12} md={12} sm={12} xs={12} >
                <h4>댓글</h4>
                <CommentCard></CommentCard>
            </Grid>
        </>
    )
}

export default ReadComment