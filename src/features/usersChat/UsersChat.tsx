import React, {useEffect, useRef, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import {io} from 'socket.io-client';
import TextField from '@mui/material/TextField/TextField';
import {useInputChange} from '../../assets/utils/hooks';
import IconButton from '@mui/material/IconButton';

type MessageType = {
    _id: string
    message: string
    user: {
        _id: string
        name: string
    }
}

export const UsersChat = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const socket = io('https://neko-back.herokuapp.com/');

    const {value, onInputChange} = useInputChange();

    const onSetMessageClick = () => {
        socket.emit('client-message-sent', value, (response: string) => {
            console.log(response)
        });

        socket.on('new-message-sent', (message: MessageType) => {
            console.log(message)
        });
    }

    useEffect(() => {
        const callback = (messages: MessageType[]) => {
            setMessages(prevMessages => [...messages, ...prevMessages]);
        }

        socket.on('init-messages-published', callback);

        return () => {
            socket.off('init-messages-published', callback)
        }
    }, [socket])

    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [])

    return (
        <div style={{
            width: '800px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            border: '1px solid black',
            padding: '10px',
            margin: '0 auto',
            marginTop: '20px'
        }}>
            <div style={{
                height: '600px',
                backgroundColor: 'whitesmoke',
                padding: '10px',
                marginBottom: '2rem',
                overflowX: 'auto'
            }}>
                {messages.map((message, i) =>
                    <div key={i} style={{
                        padding: '5px',
                        border: '1px solid black',
                        borderRadius: '5px',
                        width: '-webkit-fit-content',
                        margin: '5px'
                    }}>
                        <b>{message.user.name}</b> - {message.message}
                    </div>)}
                <div ref={messagesAnchorRef}/>
            </div>
            <TextField
                fullWidth
                size="small"
                id="standard-basic"
                label="Standard"
                variant="outlined"
                value={value}
                onChange={onInputChange}
                InputProps={{endAdornment: <IconButton onClick={onSetMessageClick}><SendIcon/></IconButton>}}
            />
        </div>
    );
}