import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    IconButton,
    Box,
    TextField,
    InputAdornment,
    CircularProgress,
    Alert,
    Menu,
    MenuItem,
    Tooltip
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
    Description as DescriptionIcon
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000/api';

    const fetchDocuments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/documents`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDocuments(response.data);
            setFilteredDocuments(response.data);
        } catch (err) {
            setError('Failed to fetch documents');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDocuments();
        }
    }, [user]);

    useEffect(() => {
        const filtered = documents.filter(doc =>
            doc.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDocuments(filtered);
    }, [searchTerm, documents]);

    const createDocument = async () => {
        try {
            const id = uuidv4();
            const token = localStorage.getItem('token');
            await axios.post(
                `${API_URL}/documents`,
                { id, title: 'Untitled Document' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            navigate(`/docs/${id}`);
        } catch (err) {
            setError('Failed to create document');
        }
    };

    const toggleFavorite = async (docId, e) => {
        e.stopPropagation();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${API_URL}/documents/${docId}/favorite`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setDocuments(
                documents.map(doc =>
                    doc._id === docId ? response.data : doc
                )
            );
        } catch (err) {
            setError('Failed to update favorite');
        }
    };

    const deleteDocument = async (docId, e) => {
        e.stopPropagation();
        setAnchorEl(null);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/documents/${docId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDocuments(documents.filter(doc => doc._id !== docId));
        } catch (err) {
            setError('Failed to delete document');
        }
    };

    const handleMenuOpen = (e, doc) => {
        e.stopPropagation();
        setSelectedDoc(doc);
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                    {error}
                </Alert>
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1">
                    My Documents
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={createDocument}
                >
                    New Document
                </Button>
            </Box>
            <TextField
                fullWidth
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
                sx={{ mb: 4 }}
            />
            {filteredDocuments.length === 0 ? (
                <Box textAlign="center" py={8}>
                    <DescriptionIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        {searchTerm ? 'No documents found' : 'No documents yet'}
                    </Typography>
                    {!searchTerm && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Create your first document to get started
                        </Typography>
                    )}
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredDocuments.map((doc) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={doc._id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4
                                    }
                                }}
                            >
                                <CardActionArea
                                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                                    onClick={() => navigate(`/docs/${doc._id}`)}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                            <DescriptionIcon color="primary" />
                                            <Box>
                                                <Tooltip title={doc.isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => toggleFavorite(doc._id, e)}
                                                    >
                                                        {doc.isFavorite ? (
                                                            <StarIcon color="warning" />
                                                        ) : (
                                                            <StarBorderIcon />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => handleMenuOpen(e, doc)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Typography variant="h6" component="h2" noWrap sx={{ mt: 2 }}>
                                            {doc.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Last modified: {formatDate(doc.updatedAt)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={(e) => deleteDocument(selectedDoc._id, e)}>
                    <DeleteIcon sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
        </Container>
    );
};

export default Dashboard;
