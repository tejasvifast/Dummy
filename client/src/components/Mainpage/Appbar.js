import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import { TextField } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  //   marginLeft: 0,
  left:'480px',
  marginRight: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Appbar(props) {
  const [value, setValue] = useState(
    {
      word: ''
    }
  )

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      //  alert(`${e.target.value}`)
      props.onDoubleClick(e.target.value)
    }
  }

  return (
    <div className='flex' >
      <Box sx={{ flexGrow: 1 }}  >
        <AppBar position="absolute" >
          <Toolbar style={{ width: '100vh' }}>
            <Typography variant="h6" noWrapcomponent="div" >
              Oxford Dictionary
            </Typography>
            <Search position="center">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search Word…" inputProps={{ 'aria-label': 'search' }} value={value.word} onChange={handleChange} onKeyDownCapture={handleSubmit} />
              {/* <TextField></TextField> */}
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}