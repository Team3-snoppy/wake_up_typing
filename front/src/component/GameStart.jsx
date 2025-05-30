import { Button } from "@mui/material";

const GameStart = ({setGameState}) =>{
    
    return (
        <Button variant="contained" onClick={() => setGameState(1)}>
          game start
        </Button>
    );
}

export default GameStart;