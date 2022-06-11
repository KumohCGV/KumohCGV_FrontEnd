import React from 'react';
import { Box, Grid } from '@mui/material';
import MovieCardContent from "components/AllMovie/MovieCardContent"

const MovieCard = (props) => {
    const getBody = props.getBody;

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
                        getBody.map((row, i) => (<
                            MovieCardContent key={row.id}
                            id={row.id}
                            order={i}
                            title={row.title}
                            thumbnail={row.thumbnail}
                            ticketRate={row.ticketRate}
                            rating={row.rating}
                        />
                        ))
                    }
                </Grid>
            </Box >
        </>
    )
}

export default MovieCard