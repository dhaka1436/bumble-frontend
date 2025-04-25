import { TextInput, PasswordInput, Button, Box, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from './LogInForm.module.scss';
import axios from 'axios';
import { addUser } from '../../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';

const LogInForm = ({ setIsLogInForm }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const form = useForm({
        initialValues: {
            email: 'o@gmail.com',
            password: 'ILoveYouAnoush234h2iu@2493028kaSingh',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
        },
    });

    const handleLogIn = form.onSubmit(async (values) => {

        try {
            const logInResponse = await axios.post(`${API_URL}/auth/login`, {
                email: values.email,
                password: values.password,
            }, { withCredentials: true });

            if (logInResponse?.data?.status === "success") {
                dispatch(addUser(logInResponse?.data?.data));
                navigate("/");
            }
            else {
                setError(logInResponse?.data?.data);
            }

        } catch (error) {
            console.log("error", error);
            setError(error?.response?.data?.data);
        }

    });

    return (
        <div className={styles.loginForm}>

            <Box component="form" onSubmit={handleLogIn} maw={400} mx="auto" p="xl" className={styles.detailsContainer}>
                <TextInput required label="Email" placeholder="your@email.com" {...form.getInputProps('email')} mb="md" />
                <PasswordInput required label="Password" placeholder="Enter your password" {...form.getInputProps('password')} mb="xl" />

                <Group justify="space-between" align="center">
                    <Button type="submit" size="md"> Log In</Button>
                    {error && <Text color="red">{error}</Text>}
                    <Text style={{ cursor: 'pointer' }} component="span" onClick={() => setIsLogInForm(false)}> Don't have an account? Sign Up </Text>
                </Group>

            </Box>
        </div>
    );
};

export default LogInForm; 