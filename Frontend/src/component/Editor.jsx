import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Box, Container, Typography, CircularProgress, IconButton, TextField } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { io } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';

const SAVE_INTERVAL_MS = 2000;

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] },
    ['link', 'image'],
    ['clean']
];

const Editor = () => {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = '';
        }

        const quillServer = new Quill('#container', {
            theme: 'snow',
            modules: { toolbar: toolbarOptions }
        });
        quillServer.disable();
        quillServer.setText('Loading the document...');
        setQuill(quillServer);

        return () => {
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [id, user, navigate]);

    useEffect(() => {
        if (!user) return;

        const socketServer = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:9000');
        setSocket(socketServer);

        return () => {
            socketServer.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit('send-changes', delta);
        };

        quill.on('text-change', handler);

        return () => {
            quill.off('text-change', handler);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const handler = (delta) => {
            quill.updateContents(delta);
        };

        socket.on('receive-changes', handler);

        return () => {
            socket.off('receive-changes', handler);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null || !user) return;

        socket.once('load-document', (document) => {
            quill.setContents(document);
            quill.enable();
            setLoading(false);
        });

        socket.emit('get-document', id, user._id);
    }, [socket, quill, id, user]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents());
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval);
        };
    }, [socket, quill]);

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <Box sx={{ bgcolor: 'white', p: 2, boxShadow: 1, mb: 2 }}>
                <Container maxWidth="lg">
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconButton onClick={() => navigate('/dashboard')}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6">Document Editor</Typography>
                    </Box>
                </Container>
            </Box>
            <Container maxWidth="lg">
                {loading && (
                    <Box display="flex" justifyContent="center" py={4}>
                        <CircularProgress />
                    </Box>
                )}
                <Box
                    id="container"
                    sx={{
                        bgcolor: 'white',
                        minHeight: '80vh',
                        boxShadow: 2,
                        '.ql-container': { fontSize: '16px' }
                    }}
                />
            </Container>
        </Box>
    );
};

export default Editor;
