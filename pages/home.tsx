import React, {useEffect} from 'react';
import Navbar from "../components/Navbar";
import {useAuth} from "../context/AuthContext";
import {axiosInstance} from "../config/config";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import LinearProgress from '@mui/material/LinearProgress';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";

type DataType = {
    open: boolean,
    obj: {
        id: number,
        userId: number,
        title: string,
        body: string
    }
}

type PostsGet = {
    id: number, userId: number, title: string, body: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 468,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Home = () => {
    const {user} = useAuth()
    const [createBody, setCreateBody] = React.useState({
        title: '',
        body: ''
    })
    const [editBody, setEditBody] = React.useState({
        title: '',
        body: ''
    })
    const [posts, setPosts] = React.useState<PostsGet[]>([])
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openEdit, setOpenEdit] = React.useState<DataType>({
        open: false,
        obj: {title: '', body: '', id: 0, userId: 0}
    });
    const handleCloseEdit = () => setOpenEdit({open: false, obj: {title: '', body: '', id: 0, userId: 0}});

    useEffect(() => {
        let isMounted = true;
        if (user?.uid !== null) {
            setLoading(true)
            const getData = async () => {
                try {
                    const res = await axiosInstance.get('posts')
                    console.log(res?.data)
                    setPosts(res?.data)
                    setLoading(false)
                } catch (e) {
                    console.log(e)
                    setLoading(false)
                }

            }
            getData()
        }
        return () => {
            isMounted = false;
        }
    }, [user?.uid])

    const setOpenEditFunc = (data: any) => {
        posts.filter((item: { id: number, userId: number, title: string, body: string }) => {
            if (data.id === item.id) {
                setOpenEdit({open: true, obj: {id: item.id, userId: item.userId, title: item.title, body: item.body}})
            }
        })
    }

    const createPosts = async () => {
        if (user?.uid !== null) {
            try {
                const res = await axiosInstance.post('posts', {
                    title: createBody.title,
                    body: createBody.body
                })
                console.log(res.data)
                setOpen(false)
            } catch (e) {
                console.log(e)
                setOpen(false)
            }
        }
    }

    const PostsEditHandler = async () => {
        if (user?.uid !== null) {
            try {
                const res = await axiosInstance.patch(`posts/${openEdit.obj.id}`, {
                    id: openEdit.obj.id,
                    userId: openEdit.obj.userId,
                    title: editBody.title.length > 0 ? editBody.title : openEdit.obj.title,
                    body: editBody.body.length > 0 ? editBody.body : openEdit.obj.body
                })
                console.log(res.data)

            } catch (e) {
                console.log(e)
            }
        }
    }

    const PostsDeleteHandler = async (id: number) => {
        if (user?.uid !== null) {
            try {
                const res = await axiosInstance.delete(`posts/${id}`)
                console.log(res)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div>
            <Navbar/>
            <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'center'}}>
                <Button size="small" variant={'outlined'} color="success"
                        onClick={handleOpen}>+</Button>
            </Box>
            {
                loading &&
                <Box sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box>
            }
            <Grid container spacing={2} sx={{marginTop: '5px'}}>
                {
                    posts?.map((item: any, index: any) => (
                        <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'between'
                            }}>
                                <CardContent>
                                    <Typography sx={{fontSize: 14,fontWeight:'bold',marginBottom:'20px'}} color="text.secondary" gutterBottom>
                                        {
                                            item.title
                                        }
                                    </Typography>
                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                        {
                                            item.body
                                        }
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button sx={{width: '50%'}} size="small" variant={'outlined'} color="success"
                                            onClick={() => setOpenEditFunc(item)}
                                    >Edit</Button>
                                    <Button sx={{width: '50%'}} size="small" variant={'outlined'} color="error"
                                            onClick={() => PostsDeleteHandler(item.id)}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField sx={{width:'100%'}} id="outlined-basic" onChange={(e: any) =>
                                setCreateBody({
                                    ...createBody,
                                    title: e.target.value,
                                })
                            } label="Title" variant="outlined"/>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField sx={{width:'100%'}} id="outlined-basic" onChange={(e: any) =>
                                setCreateBody({
                                    ...createBody,
                                    body: e.target.value,
                                })
                            } label="Body" variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px'}}>
                        <Button sx={{width: '50%'}} size="small" variant={'outlined'} color="error"
                                onClick={() => setOpen(false)}
                        >Cancel</Button>
                        <Button sx={{width: '50%'}} size="small" onClick={createPosts} variant={'outlined'}
                                color="primary"
                        >Save</Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openEdit.open}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField sx={{width:'100%'}} id="outlined-basic" defaultValue={openEdit.obj.title} onChange={(e: any) =>
                                setEditBody({
                                    ...editBody,
                                    title: e.target.value,
                                })
                            } label="Title" variant="outlined"/>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField sx={{width:'100%'}} id="outlined-basic" defaultValue={openEdit.obj.body} onChange={(e: any) =>
                                setEditBody({
                                    ...editBody,
                                    body: e.target.value,
                                })
                            } label="Body" variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px'}}>
                        <Button sx={{width: '50%'}} size="small" variant={'outlined'} color="error"
                                onClick={() => setOpenEdit({open: false, obj: {title: '', body: '', id: 0, userId: 0}})}
                        >Cancel</Button>
                        <Button sx={{width: '50%'}} size="small" onClick={PostsEditHandler} variant={'outlined'}
                                color="primary"
                        >Save</Button>
                    </Box>
                </Box>
            </Modal>

        </div>
    );
};

export default Home;