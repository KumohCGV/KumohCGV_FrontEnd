import React from 'react';
import { Box, Grid } from '@mui/material';
import CommentCardContent from 'components/MovieDetail/Comment/readComment/CommentCardContent';

const CommentCard = (props) => {
    const comment = props.comment;
    const movieId = props.movieId;

    return (
        <>
            <Box pb={2}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {
                        comment.map((row, i) => (<
                            CommentCardContent key={row.id}
                            id={row.id}
                            memberName={row.memberName}
                            content={row.content}
                            rating={row.rating}
                            isMyComment={row.isMyComment}
                            isLiked={row.isLiked}
                            likeCount={row.likeCount}
                            movieId={movieId}
                        />
                        ))
                    }
                </Grid>
            </Box >
        </>
    )
}

export default CommentCard