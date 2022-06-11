import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Api from 'API/Api';

export default function SignUp() {
    
  const [postBody, setPostBody] = useState({
    loginId: '',
    password: '',
    name: '',
    age: '',
    gender: '',
  });

  const handleIdChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      loginId: event.target.value
    }));
  };
  const handlePasswordChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      password: event.target.value
    }));
  };
  const handleNameChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      name: event.target.value
    }));
  };
  const handleAgeChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      age: event.target.value
    }));
  };
  const handleGenderChange = (event) => {
    setPostBody((prev) => ({
      ...prev,
      gender: event.target.value
    }));
  };


  const handleSignup = async () => {
    const isEmpty = emptyCheck();
    if (isEmpty === false) {
      alert('필수 항목을 채워주세요.');
      return false;
    }

    let response = await Api.postSignup(postBody);
    console.log(response);

    if (response.data.status === "success") {
      alert('회원가입 성공');
      const target = '/';
      window.location.href = target;
    } 
    else if (response.data.status === "fail") {
      alert(response.data.message);
    }
    else {
      alert('회원가입 실패');
    }
  };
  const emptyCheck = () => {
    if (postBody.id === '' || postBody.password === '' || postBody.name === '' ) {
      return false;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="id"
                label="아이디를 설정해주세요"
                id="id"
                autoComplete="new-id"
                defaultValue={postBody.loginId}
                onChange={handleIdChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="비밀번호를 설정해주세요"
                type="password"
                id="password"
                autoComplete="new-password"
                defaultValue={postBody.password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="이름을 입력해주세요"
                name="name"
                autoComplete="name"
                defaultValue={postBody.name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="age"
                label="나이를 입력해주세요"
                name="age"
                defaultValue={postBody.age}
                onChange={handleAgeChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="gender"
                label="성별을 입력해주세요"
                name="gender"
                defaultValue={postBody.gender}
                onChange={handleGenderChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}