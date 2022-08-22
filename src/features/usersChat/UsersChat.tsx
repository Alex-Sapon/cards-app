import React, {useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import socketIo from 'socket.io-client';


export const UsersChat = () => {
    // подключение вэбсокетов
    // const socket = socketIo("https://neko-back.herokuapp.com/");

    const [answer ,setAnswer] = useState('');

    useEffect(()=> {
        // подписка на историю сообщений
        // socket.on('init-messages-published', (messages: Array<{
        //     _id: string
        //     message: string
        //     user: {
        //         _id: string
        //         name: string
        //     }
        // }>) => {});
        //
        // // запросить историю сообщений
        // socket.emit("init", {}, (answer: string) => setAnswer(answer));
        //
        // // задать своё имя
        // socket.emit("client-name-sent", "Aleksand Saponchik", (answer: string) => setAnswer(answer));
        //
        // socket.close();
    }, [])


    return (
        <div >
            {answer}
        </div>
    );
}