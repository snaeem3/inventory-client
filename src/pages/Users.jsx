import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useTheme,
  Container,
  Stack,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import BackpackIcon from '@mui/icons-material/Backpack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import { fetchUsers } from '../apiClient';
import formatDate from '../utils/formatDate';
import Loading from '../components/Loading';

const Users = (props) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error getting users: ', error);
    }
  };

  useEffect(() => {
    getUsers();
    setLoading(false);
  }, []);

  const theme = useTheme();

  return (
    <Container component="main" className="users-page" maxWidth="md">
      <Typography variant="h1" sx={{ py: 2 }}>
        Users
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <Stack spacing={2} className="users-list">
          {users.map((user) => (
            <Card
              key={user._id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                borderRadius: 4,
                border: 'solid 1px lightgray',
              }}
            >
              {/* <CardHeader
              avatar={<Avatar src={user.profilePicture} />}
              action={<IconButton aria-label="" />}
              title={user.username}
              subheader={
                user.createdAt && `Joined ${formatDate(user.createdAt)}`
              }
              sx={{ flex: 1 }}
            /> */}
              <CardContent sx={{ flex: 1 }}>
                <Link to={`/users/${user._id}`}>
                  <Grid container>
                    <Grid item xs={1}>
                      <Avatar src={user.profilePicture} />
                    </Grid>
                    <Grid item xs={11}>
                      <Typography variant="h4">{user.username}</Typography>
                    </Grid>
                  </Grid>
                </Link>
              </CardContent>
              <CardActions sx={{ bgcolor: 'wheat' }}>
                <Tooltip title="View Inventory">
                  <Link to={`/users/${user._id}/inventory`}>
                    <IconButton>
                      <BackpackIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
                <IconButton disabled>
                  <PersonAddIcon />
                </IconButton>
                <IconButton disabled>
                  <GroupsIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Users;
