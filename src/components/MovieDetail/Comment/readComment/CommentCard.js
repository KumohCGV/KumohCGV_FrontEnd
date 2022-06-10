import React from 'react';
import styled from "styled-components";
import { Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommentCardContent from 'components/MovieDetail/Comment/readComment/CommentCardContent';
import { commentList } from 'components/TestData';

const CommentCard = () => {
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
                        commentList.data.map((row, i) => (<
                            CommentCardContent key={row.id}
                            id={row.id}
                            userId={row.userId}
                            nickname={row.nickname}
                            date={row.date}
                            content={row.content}
                            star={row.star}
                            thumbCount={row.thumb.count}
                            isthumb={row.thumb.isthumb}
                        />
                        ))
                    }
                </Grid>
            </Box >
        </>
    )
}

export default CommentCard