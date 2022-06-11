import React from 'react';
import { Grid } from '@mui/material';
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