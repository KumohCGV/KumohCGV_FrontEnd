import React from 'react';
import styled from "styled-components";
import { Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MovieCardContent from "components/AllMovie/MovieCardContent"
import { getBody } from 'components/TestData';

const MovieCard = () => {
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
                        getBody.data.map((row, i) => (<
                            MovieCardContent key={row.id}
                            id={row.id}
                            title={row.title}
                            image={row.image}
                            order={i}
                            rate={row.rate}
                        />
                        ))
                    }
                </Grid>
            </Box >
        </>
    )
}

export default MovieCard