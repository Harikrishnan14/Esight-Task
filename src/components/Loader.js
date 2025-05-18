import React from 'react'
import { CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            height: 'calc(100vh - 82px)',
            width: '100vw',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}>
            <CircularProgress />
        </div>
    )
}

export default Loader
