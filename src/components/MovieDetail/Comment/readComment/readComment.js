import React from 'react';
import { Grid } from '@mui/material';
import CommentCard from 'components/MovieDetail/Comment/readComment/CommentCard';


const ReadComment = (props) => {
    const comment = props.comment;
    const movieId = props.movieId;

    return (
        <>
            <Grid item lg={12} md={12} sm={12} xs={12} >
                <h4>댓글</h4>
                <CommentCard comment={comment} movieId={movieId}></CommentCard>
            </Grid>
        </>
    )
}

export default ReadComment