import React, { useState, useEffect } from "react";
import { Container, Typography, Stack, Paper, Divider, IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import { Cookies } from 'react-cookie';
import { STATS_COOKIE, savePlayerStats } from "../functions/StoreGetStats";
import { styled } from '@mui/material/styles'
import Share from "./Share";
import CloseIcon from "@mui/icons-material/Close";
import { verifyDate } from "../functions/StoreState";

export function PlayerStats(props){

    const cookies = new Cookies()
    const [shown, setShown] = useState(false);
    const handleClose = () => setShown(false);

    useEffect(() => {
        if (props.status !== "progress" && props.final.length > 0 && verifyDate()) {
            let lastGuess = props.final[props.final.length - 1];
            let finalGuess
            if (
                lastGuess.R === "correct" &&
                lastGuess.G === "correct" &&
                lastGuess.B === "correct"
            ){
                finalGuess = lastGuess.num;
                savePlayerStats(finalGuess);
                setShown(true);
            }
            else if(props.status === "lose"){
                finalGuess = 7;
                savePlayerStats(finalGuess);
                setShown(true);
            }


        }
      }, [props.status, props.final]);

    //Displays the filled bar dependent on percentage of guesses in that number divided by max guess number
    function FillBar(props){
        const fillPercent = props.maxGuess > 0 ? Math.round((props.guessNum/props.maxGuess) * 100 ) : 0;
        const Item = styled(Paper)(() => ({
            backgroundColor: '#00E600',
            width: fillPercent + "%",
            textAlign: 'none'
        }));
        return (
            <Item style={{display: 'flex'}}>
                <div>{props.guessKey+1}</div>
                {props.guessNum > 0 && <div style={{marginLeft: '50%', marginRight: '50%'}}>{props.guessNum}</div>}
            </Item>
        )
    }

    //Displays the win rate and total games from info in cookie
    function WinStats(props){
        const Item = styled(Paper)(({ theme }) => ({
            //Not sure why I had to do style this way but it is what is shown on mui site
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary
          }));
        
        let percentWon
        if(props.gamesWon > 0){
            percentWon = Math.round((props.gamesWon/props.totalGames) * 100 );
        }
        else{
            percentWon = 0
        }
        return(
            <Stack direction = "row" spacing = {2} justifyContent = "center">
                <Item elevation={0}>
                    <Typography variant="subtitle1">{props.totalGames} <br /> Games played</Typography> 
                </Item>
                <Item elevation={0}>
                <Typography variant="subtitle1">{percentWon}% <br /> Win Rate </Typography>
                </Item>
                <Item elevation={0}>
                <Typography variant="subtitle1">{props.curStreak} <br /> Current Streak </Typography>
                </Item>
                <Item elevation={0}>
                <Typography variant="subtitle1">{props.maxStr} <br /> Max Streak </Typography>
                </Item>
            </Stack>
        )
    }
    
    function DisplayGuessStats() {
        let listGuess = []
        let outputGuess
        let winGames
        let allGames
        let streak
        let maxStreak
        if (cookies.get(STATS_COOKIE)){
            let currentStats = JSON.stringify(cookies.get(STATS_COOKIE));
            let winToUpdate = JSON.parse(currentStats);
            for(let i =1; i <=6; i++){
                listGuess.push(winToUpdate[i]);
            }
            let highGuess = Number(Math.max(...listGuess));
            allGames = winToUpdate["total"];
            winGames = winToUpdate["win"];
            streak = winToUpdate["streak"];
            maxStreak = winToUpdate["max_streak"];
            outputGuess = listGuess.map((item, index) =>
                <FillBar guessNum = {item} maxGuess = {highGuess} guessKey = {index} key = {index}/>
            )
        }
        return (
            <div>
                <WinStats totalGames = {allGames} gamesWon = {winGames} curStreak = {streak} maxStr = {maxStreak}/>
                <Stack spacing={.5} style={{ margin: '5px'}}>{outputGuess}</Stack>
            </div>
        );
    }

    //Style for box in modal. Should it be elsewhere?
    const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
    };
      

    return(
        <div>
            <Modal
                open={shown}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Container disableGutters>
                <div>
                    <DisplayGuessStats />
                </div>
                </Container>
                <Divider style={{backgroundColor: 'black'}}/>
                <Container disableGutters sx={{ p: 2 }}>
                    <Share final = {props.final} status = {props.status} />
                </Container>
                </Box>
            </Modal>
        </div>
    )
}